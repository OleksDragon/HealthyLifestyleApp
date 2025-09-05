using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Linq;
using System.Net.Http;
using System;

namespace HealthyLifestyle.Api.Middleware
{
    public class DynamicRenderingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IDistributedCache _cache;
        private readonly ILogger<DynamicRenderingMiddleware> _logger;
        private readonly DynamicRenderingOptions _options;
        private readonly IHttpClientFactory _httpClientFactory;

        private static readonly string[] _botUserAgents = new[]
        {
            "googlebot", "googlebot-news", "googlebot-image", "googlebot-video", "googlebot-mobile",
            "adsbot-google", "mediapartners-google", "bingbot", "msnbot", "yandex",
            "baiduspider", "facebot", "twitterbot", "linkedinbot", "slurp",
            "duckduckbot", "seamonkey", "semrushbot", "ahrefsbot", "petalbot",
            "dotbot", "exabot", "mj12bot", "gigabot", "nutch",
            "python-requests", "libwww-perl", "applebot"
        };

        public DynamicRenderingMiddleware(RequestDelegate next,
            IDistributedCache cache,
            IOptions<DynamicRenderingOptions> options,
            ILogger<DynamicRenderingMiddleware> logger,
            IHttpClientFactory httpClientFactory)
        {
            _next = next;
            _cache = cache;
            _options = options.Value;
            _logger = logger;
            _httpClientFactory = httpClientFactory;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                var userAgent = context.Request.Headers["User-Agent"].ToString().ToLower();
                _logger.LogInformation("Received request with User-Agent: {UserAgent}", userAgent);

                // Список шляхів, які не потрібно рендерити
                var excludedPaths = new[] { "/login", "/register", "/auth/google", "/auth/google/callback", "/restore" };
                var requestPath = context.Request.Path.ToString().ToLower();

                if (excludedPaths.Any(path => requestPath.StartsWith(path)))
                {
                    _logger.LogInformation("Skipping Rendertron for excluded path: {Path}", requestPath);
                    await _next(context);
                    return;
                }

                if (_botUserAgents.Any(bot => userAgent.Contains(bot)))
                {
                    _logger.LogInformation("Request from bot detected. User-Agent: {UserAgent}", userAgent);

                    var urlToRender = $"{_options.InternalFrontendUrl}{context.Request.Path}{context.Request.QueryString}";
                    var cacheKey = $"rendertron_cache:{urlToRender.GetHashCode():X}";

                    var cachedHtml = await _cache.GetStringAsync(cacheKey);
                    if (!string.IsNullOrEmpty(cachedHtml))
                    {
                        _logger.LogInformation("Serving from cache. URL: {Url}", urlToRender);
                        context.Response.ContentType = "text/html; charset=utf-8";
                        await context.Response.WriteAsync(cachedHtml);
                        return;
                    }

                    _logger.LogInformation("Not in cache, rendering with Rendertron. URL: {Url}", urlToRender);

                    if (string.IsNullOrEmpty(_options.RendertronUrl))
                    {
                        _logger.LogError("RendertronUrl is not configured. Falling back to normal rendering.");
                        await _next(context);
                        return;
                    }

                    var fullRendertronUrl = $"{_options.RendertronUrl}/render/{Uri.EscapeDataString(urlToRender)}";

                    using (var client = _httpClientFactory.CreateClient())
                    {
                        client.Timeout = TimeSpan.FromSeconds(_options.TimeoutInSeconds);
                        var response = await client.GetAsync(fullRendertronUrl);

                        if (response.IsSuccessStatusCode)
                        {
                            var renderedHtml = await response.Content.ReadAsStringAsync();
                            
                            var cacheEntryOptions = new DistributedCacheEntryOptions
                            {
                                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10),
                                SlidingExpiration = TimeSpan.FromMinutes(5)
                            };
                            await _cache.SetStringAsync(cacheKey, renderedHtml, cacheEntryOptions);

                            context.Response.ContentType = "text/html; charset=utf-8";
                            await context.Response.WriteAsync(renderedHtml);
                            return;
                        }
                        else
                        {
                            _logger.LogError("Rendertron failed to render page. Status code: {StatusCode}", response.StatusCode);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred in DynamicRenderingMiddleware. Falling back to normal rendering.");
            }

            await _next(context);
        }
    }
}