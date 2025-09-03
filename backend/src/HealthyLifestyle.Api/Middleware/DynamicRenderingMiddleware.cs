using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Linq;
using System.Net.Http;
using System;
using HealthyLifestyle.Api.Middleware;
using Microsoft.AspNetCore.Http.Extensions;

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

                // Check if the request is from a known bot
                if (_botUserAgents.Any(bot => userAgent.Contains(bot)))
                {
                    _logger.LogInformation("Request from bot detected. User-Agent: {UserAgent}", userAgent);

                    // Reconstruct the URL for Rendertron using the internal frontend service name
                    var urlToRender = $"{_options.InternalFrontendUrl}{context.Request.Path}{context.Request.QueryString}";

                    var cacheKey = $"rendertron_cache:{urlToRender}";

                    // Try to get from cache
                    var cachedHtml = await _cache.GetStringAsync(cacheKey);
                    if (!string.IsNullOrEmpty(cachedHtml))
                    {
                        _logger.LogInformation("Serving from cache. URL: {Url}", urlToRender);
                        context.Response.ContentType = "text/html";
                        await context.Response.WriteAsync(cachedHtml);
                        return;
                    }

                    _logger.LogInformation("Not in cache, rendering with Rendertron. URL: {Url}", urlToRender);

                    // If not in cache, render using Rendertron
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
                            // Cache the rendered HTML
                            var cacheEntryOptions = new DistributedCacheEntryOptions
                            {
                                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10) // Cache for 10 minutes
                            };
                            await _cache.SetStringAsync(cacheKey, renderedHtml, cacheEntryOptions);

                            context.Response.ContentType = "text/html";
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

            // If not a bot, or if an error occurred, continue down the pipeline
            await _next(context);
        }
    }
}