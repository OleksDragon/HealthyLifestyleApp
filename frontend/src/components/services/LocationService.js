// Константа для роботи з GeoNames
const GEONAMES_USERNAME = 'healthy';

// Отримання поточної мови
export const getCurrentLanguage = () => {
  const lang = localStorage.getItem('i18nextLng') || 'uk';
  return lang.split('-')[0];
};

// Функції для отримання міст з API
export const fetchCities = async (countryCode) => {
  try {
    const currentLanguage = getCurrentLanguage();
    const response = await fetch(
      `http://api.geonames.org/searchJSON?country=${countryCode}&featureClass=P&maxRows=200&username=${GEONAMES_USERNAME}&lang=${currentLanguage}`
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    if (data.status && data.status.value === 10) {
      console.log('GeoNames account not enabled');
      return [];
    }

    return (data.geonames?.map(city => {
      const localizedName = city.alternateNames?.find(
        alt => alt.lang === currentLanguage
      )?.name;

      return {
        value: city.geonameId,
        label: localizedName || city.name
      };
    }) || [])
    .filter(Boolean)
    .sort((a, b) => a.label.localeCompare(b.label, currentLanguage));

  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
};

export const fetchStreets = async (cityName, countryCode) => {
  try {
    const currentLanguage = getCurrentLanguage();
    const response = await fetch(
      process.env.REACT_APP_API_URL + `/api/location/streets?cityName=${encodeURIComponent(cityName)}&countryCode=${countryCode}&lang=${currentLanguage}`
    );

    if (!response.ok) {
      console.warn("Backend response not OK");
      return [];
    }

    const streets = await response.json();
    return streets.map(street => ({
      value: street,
      label: street,
    }));
  } catch (error) {
    console.error("Error fetching streets:", error);
    return [];
  }
};
