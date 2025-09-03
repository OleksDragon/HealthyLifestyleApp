using System;

namespace HealthyLifestyle.Api.Middleware
{
    // Класс для настроек DynamicRendering
    public class DynamicRenderingOptions
    {
        public string RendertronUrl { get; set; }
        public string InternalFrontendUrl { get; set; }
        public int TimeoutInSeconds { get; set; } = 60;
        public string CacheExpiration { get; set; }
    }
}
