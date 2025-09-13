namespace HealthyLifestyle.Application.Interfaces.Location
{
    public interface ILocationService
    {
        Task<List<string>> GetStreetsAsync(string cityName, string countryCode, string lang = "en");
    }
}
