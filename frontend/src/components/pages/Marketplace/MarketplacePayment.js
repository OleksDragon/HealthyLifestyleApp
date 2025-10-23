import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CustomSelect from "../../elements/Profile/custom-profile-data-select/CustomSelect";
import { getCurrentLanguage, fetchCities, fetchStreets } from '../../services/LocationService';

function MarketplacePayment() {
    const navigate = useNavigate();

    const { i18n, t } = useTranslation();
    const [cart, setCart] = useState(null);
    const [productsSum, setProductsSum] = useState(0);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [postIndex, setPostIndex] = useState("");

    const [cityOptions, setCityOptions] = useState([]);
    const [streetOptions, setStreetOptions] = useState([]);
    const [loadingCities, setLoadingCities] = useState(false);
    const [loadingStreets, setLoadingStreets] = useState(false);

    const streetsCache = useRef(new Map());
    const citiesCache = useRef(new Map());

    const STATIC_COUNTRIES = useMemo(() => [
        t("p_ukrain_country"),
        t("p_great_britain_country"),
        t("p_germany_country"),
        t("p_france_country"),
        t("p_spain_country"),
        t("p_usa_country")    
    ], [t]);

    const COUNTRY_CODES = useMemo(() => ({
        [t("p_ukrain_country")]: 'UA',
        [t("p_great_britain_country")]: 'GB',
        [t("p_germany_country")]: 'DE',
        [t("p_france_country")]: 'FR',
        [t("p_spain_country")]: 'ES',
        [t("p_usa_country")]: 'US'
    }), [t]);

    const loadCities = useCallback(async (countryName) => {
        if (!countryName) {
            setCityOptions([]);
            setCity('');
            return;
        }
        
        const countryCode = COUNTRY_CODES[countryName];
        if (!countryCode) {
            console.warn("Не знайдено код країни для:", countryName);
            setCityOptions([]);
            return;
        }
        
        const cacheKey = `${countryCode}-${getCurrentLanguage()}`;
        
        if (citiesCache.current.has(cacheKey)) {
            const cachedCities = citiesCache.current.get(cacheKey);
            setCityOptions(cachedCities);
            return;
        }
        
        setLoadingCities(true);
        try {
            const cities = await fetchCities(countryCode);
            citiesCache.current.set(cacheKey, cities);
            setCityOptions(cities);
        } catch (error) {
            console.error('Помилка завантаження міст:', error);
            setCityOptions([]);
        } finally {
            setLoadingCities(false);
        }
    }, [COUNTRY_CODES]);

    const hasValue = (value) => {
        return value !== null && value !== undefined && value !== '';
    };

    const loadStreets = useCallback(async (cityName, countryName) => {
        if (!cityName || !countryName) {
            setStreetOptions([]);
            setStreet('');
            return;
        }
        
        const countryCode = COUNTRY_CODES[countryName];
        if (!countryCode) {
            console.warn("Не знайдено код країни для:", countryName);
            setStreetOptions([]);
            return;
        }
        
        const cacheKey = `${cityName}-${countryCode}-${getCurrentLanguage()}`;
        
        if (streetsCache.current.has(cacheKey)) {
            const cachedStreets = streetsCache.current.get(cacheKey);
            setStreetOptions(cachedStreets);
            return;
        }
        
        setLoadingStreets(true);
        try {
            const streets = await fetchStreets(cityName, countryCode);
            const safeStreets = Array.isArray(streets) ? streets : [];
            streetsCache.current.set(cacheKey, safeStreets);
            setStreetOptions(safeStreets);
        } catch (error) {
            console.error('Помилка завантаження вулиць:', error);
            setStreetOptions([]);
        } finally {
            setLoadingStreets(false);
        }
    }, [COUNTRY_CODES]);

    const getInputClassName = (value, baseClassName) => {
        return hasValue(value) ? `${baseClassName} has-value` : baseClassName;
    };

    const fetchCart = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/ShoppingCart`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("helth-token")}`
                    }
                }
            );

            setProductsSum(response.data.CartItems.reduce((sum, p) => sum + p.Quantity * p.Product.Price, 0))
            setCart(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSelectChange = useCallback((field, value) => {
        if (field === 'country') {
            setCountry(value)
        }
        else if (field === 'city') {
            setCity(value)
        }
        else if (field === 'street') {
            setStreet(value)
        }
    }, []);

    const handleCountryChange = async (value) => {
        handleSelectChange('country', value);
        setCityOptions([]);
        handleSelectChange('city', '');
    };

    const handleCityChange = async (value) => {
        handleSelectChange('city', value);
        setStreetOptions([]);
        handleSelectChange('street', '');
    };

    const handlePaymentContinue = async () => {
        try {
            let response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/Orders`,
                {
                    ShippingAddress: `${country} | ${city} | ${street} | ${postIndex}`,
                    Items: cart.CartItems.map(ci => (
                        {
                            ProductId: ci.Product.Id, 
                            Quantity: ci.Quantity
                        }))
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("helth-token")}`
                    }
                }
            );

            const currentUrl = window.location.href;

            response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/payments/create-dynamic-payment`,
                {
                    name: "Оплата товарів",
                    amount: productsSum,
                    currency: "usd",
                    cancelUrl: currentUrl,
                    metadata: {
                        section: "marketplace",
                        orderId: response.data.Id,
                    },
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("helth-token")}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!response.data?.url) {
                throw new Error("Stripe session URL не отримано");
            }

            window.location.href = response.data.url;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCart();
    }, [])

    useEffect(() => {
        if (country) {
            loadCities(country);
        } else {
            setCityOptions([]);
            setCity('');
        }
        if (country && city) {
            loadStreets(city, country);
        } else {
            setStreetOptions([]);
            setStreet('');
        }
    }, [i18n.language, country, city, loadCities, loadStreets]);
    
    useEffect(() => {
        if (!country) return;
    
        loadCities(country);
    }, [country, loadCities]);

    return (
        <div className="shopping-cart-container">
            <div className="shopping-cart-title">{t("payment")}</div>
            <div>{t("delivery")}</div>
            {(cart && cart.CartItems) && <div className="cart-container" style={{columnGap: "70px", paddingTop: "30px"}}>
                <div>
                    <div className="personal-info-payment-marketplace">
                        <CustomSelect
                            id="country"
                            placeholder={t("p_country_placeholder")}
                            options={STATIC_COUNTRIES}
                            value={country}
                            onChange={handleCountryChange}
                            className={getInputClassName(country, 'extra-fields-input short country delivery-address')}
                            maxVisibleChars={34}
                        />
                        <CustomSelect
                            id="city"
                            placeholder={loadingCities ? t("p_loading_cities") : t("p_city_placeholder")}
                            options={cityOptions.map(city => city.label)}
                            value={city}
                            onChange={handleCityChange}
                            className={getInputClassName(city, 'extra-fields-input short city delivery-address')}
                            maxVisibleChars={34}
                            disabled={loadingCities || !country}
                        />
                        <CustomSelect
                            id="street"
                            placeholder={loadingStreets ? t("p_loading_streets") : t("p_street_placeholder")}
                            options={(streetOptions || []).map(street => street?.label || '')}
                            value={street}
                            onChange={(value) => handleSelectChange('street', value)}
                            className={getInputClassName(street, 'extra-fields-input short street delivery-address')}
                            maxVisibleChars={34}
                            disabled={loadingStreets || !city}
                        />
                        <input
                            value={postIndex}
                            onChange={e => setPostIndex(e.target.value)}
                            className="post-index-marketplace" 
                            placeholder={t("post_index")}
                        />
                        <button 
                            disabled={!hasValue(country) || !hasValue(city) || !hasValue(street) || postIndex.length !== 5}
                            onClick={() => handlePaymentContinue()}
                        >{t("continue")}</button>
                    </div>
                </div>
                <div className="shopping-cart-total">
                    <div>{t("my_order")}</div>
                    <div className="marketplace-total-container">
                        <div className="left-info-market">{t("order_sum")}</div>
                        <div className="right-info-market">{productsSum} $</div>
                        <div className="marketplace-total-total">
                            <div className="left-info-market">
                                {t("marketplace_total")}:
                            </div>
                            <div className="right-info-market">
                                {productsSum} $
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default MarketplacePayment;