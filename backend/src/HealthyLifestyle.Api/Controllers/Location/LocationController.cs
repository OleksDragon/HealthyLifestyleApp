using HealthyLifestyle.Application.Interfaces.Location;
using Microsoft.AspNetCore.Mvc;

namespace HealthyLifestyle.Api.Controllers.Location
{
    [ApiController]
    [Route("api/location")]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService _locationService;

        public LocationController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        [HttpGet("streets")]
        public async Task<IActionResult> GetStreets(string cityName, string countryCode, string lang = "en")
        {
            var streets = await _locationService.GetStreetsAsync(cityName, countryCode, lang);
            return Ok(streets);
        }
    }
}
