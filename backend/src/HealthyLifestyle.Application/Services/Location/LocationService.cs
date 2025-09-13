using HealthyLifestyle.Application.Interfaces.Location;
using System.Globalization;
using System.Text;
using System.Text.Json;

namespace HealthyLifestyle.Application.Services.Location
{
    public class LocationService : ILocationService
    {
        private readonly HttpClient _httpClient;

        public LocationService(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
            _httpClient.DefaultRequestHeaders.Add("User-Agent", "HealthyLifestyleApp/1.0");
        }

        public async Task<List<string>> GetStreetsAsync(string cityName, string countryCode, string lang = "en")
        {
            // 1. Запит до Nominatim
            var nominatimUrl =
                $"https://nominatim.openstreetmap.org/search?city={Uri.EscapeDataString(cityName)}&countrycodes={countryCode.ToLower()}&format=json&addressdetails=1&accept-language={lang}";

            var nominatimResponse = await _httpClient.GetStringAsync(nominatimUrl);
            var nominatimData = JsonSerializer.Deserialize<List<NominatimResult>>(nominatimResponse);

            if (nominatimData == null || nominatimData.Count == 0)
                return new List<string>();

            var first = nominatimData[0];
            long areaId = first.osm_type switch
            {
                "relation" => 3600000000 + first.osm_id,
                "way" => 2400000000 + first.osm_id,
                _ => 3600000000 + first.osm_id
            };

            // 2. Запит до Overpass API
            var overpassQuery = $@"
            [out:json][timeout:120];
            area({areaId})->.city;
            (
              way(area.city)[""highway""][""name""];
              relation(area.city)[""highway""][""name""];
            );
            out tags;
        ";

            var content = new StringContent(
                $"data={Uri.EscapeDataString(overpassQuery)}",
                Encoding.UTF8,
                "application/x-www-form-urlencoded"
            );

            var overpassResponse = await _httpClient.PostAsync("https://overpass-api.de/api/interpreter", content);

            if (!overpassResponse.IsSuccessStatusCode)
                return new List<string>();

            var overpassJson = await overpassResponse.Content.ReadAsStringAsync();
            var overpassData = JsonDocument.Parse(overpassJson);

            var streets = overpassData.RootElement
                .GetProperty("elements")
                .EnumerateArray()
                .Select(el => el.GetProperty("tags").TryGetProperty("name", out var name) ? name.GetString() : null)
                .Where(n => !string.IsNullOrWhiteSpace(n))
                .Distinct()
                .OrderBy(n => n, StringComparer.Create(new CultureInfo(lang), true))
                .ToList();

            return streets;
        }

        private class NominatimResult
        {
            public long osm_id { get; set; }
            public required string osm_type { get; set; }
        }
    }
}
