import { useEffect, useRef, useState } from "react";
import "../../styles/marketplace.css";
import basketIcon from "../../icons/Basket.png";
import heartEmptyIcon from "../../icons/HeartEmpty.png";
import heartFullIcon from "../../icons/HeartFull.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RangeSlider from "../../elements/Marketplace/Slider";
import { useTranslation } from "react-i18next";

function MarketplacePage() {
    const { t } = useTranslation();
    const [category, setCategory] = useState(null);
    const [priceFrom, setPriceFrom] = useState(0); // USD
    const [priceTo, setPriceTo] = useState(null); // USD
    const [brand, setBrand] = useState(null);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();
    const [openP, setOpenP] = useState(false);
    const [openB, setOpenB] = useState(false);

    const priceRef = useRef(null);
    const brandRef = useRef(null);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/Products`,
            );

            setProducts(response.data);
            setBrands([...new Set(response.data.map(p => p.Brand))]);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchFavorites = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/Products/favorites`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("helth-token")}`
                    }
                }
            );

            setFavorites(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickHeart = async (id) => {
        try {
            if (favorites.some(f => f === id)) {
                await axios.delete(
                    `${process.env.REACT_APP_API_URL}/api/Products/favorites/${id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("helth-token")}`
                        }
                    }
                );
                
                let filtered = favorites.filter(f => f !== id);
                setFavorites(filtered);
            } else {
                await axios.post(
                    `${process.env.REACT_APP_API_URL}/api/Products/favorites/${id}`,
                    {},
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("helth-token")}`
                        }
                    }
                );
                
                setFavorites(fav => [...fav, id])
            }
        } catch (error) {
            console.log(error);
        }
    }

    const applyFilters = () => {
        return products.filter(p => 
            (category === null || category === p.Category) &&
            (p.Price >= priceFrom && (priceTo === null || p.Price <= priceTo)) &&
            (brand === null || brand === p.Brand)
        );
    }

    const clearFilters = () => {
        setBrand(null);
        setPriceFrom(0);
        setPriceTo(null);
        setCategory(null);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (priceRef.current && !priceRef.current.contains(event.target)) {
                setOpenP(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (brandRef.current && !brandRef.current.contains(event.target)) {
                setOpenB(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        fetchProducts()
        fetchFavorites()
    }, [])

    return (
        <div className="marketplace-container">
            <div className="products-categories">
                <div 
                    className={`${category === "SportsNutrition" ? "active-category" : ""}`}
                    onClick={() => setCategory("SportsNutrition")}
                >
                    {t("sport_eating")}
                </div>
                <div
                    className={`${category === "Apparel" ? "active-category" : ""}`}
                    onClick={() => setCategory("Apparel")}
                >
                    {t("sport_cloth")}
                </div>
                <div
                    className={`${category === "Gadgets" ? "active-category" : ""}`}
                    onClick={() => setCategory("Gadgets")}
                >
                    {t("sport_gadgets")}
                </div>
                <div
                    className={`${category === "Other" ? "active-category" : ""}`}
                    onClick={() => setCategory("Other")}
                >
                    {t("sport_other")}
                </div>
                <div onClick={() => navigate("/marketplace/shopping_cart")}>
                    <img src={basketIcon} />
                </div>
            </div>
            <div className="products-filters">
                <h3>{t("marketplace_filter")}</h3>
                <div>
                    <div 
                        className={`filter-product-marketplace ${openP ? "" : "scale-filter"}`}
                        onClick={() => setOpenP(true)}
                    >
                        { priceTo ? `${t("from")} ${priceFrom} ${t("to")} ${priceTo}` : t("filter_price")}
                        {openP && (
                            <div ref={priceRef} className="price-selector">
                                <RangeSlider min={0} max={100} valueFrom={priceFrom} valueTo={priceTo} 
                                onChange={(f, to) => {setPriceFrom(f); setPriceTo(to); setOpenP(false);}} />
                            </div>
                        )}
                    </div>
                    <div 
                        className={`filter-product-marketplace ${openB ? "" : "scale-filter"}`}
                        onClick={() => setOpenB(true)}
                        style={{borderRadius: openB ? "30px 30px 0 0" : "30px"}}
                    >
                        {brand ? brand : t("brand")}
                        {openB && (
                            <div 
                                ref={brandRef} 
                                className="brand-selector"
                            >
                                {brands.map(b => (
                                    <div 
                                        className="brand-name"
                                        onClick={(e) => {e.stopPropagation(); setBrand(b); setOpenB(false)}}
                                    >{b}</div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="clear-marketplace-filter" onClick={() => clearFilters()}>
                        X
                    </div>
                </div>
            </div>
            <div className="marketplace scroll-data">
                {applyFilters().map((p, idx) => {
                    return (
                        <div 
                            key={idx} 
                            className="product-card" 
                            onClick={() => navigate("/marketplace/product", { state: {prod: p} })}
                        >
                            <img 
                                src={favorites.some(f => f === p.Id) ? heartFullIcon : heartEmptyIcon} 
                                className="favorite-product" 
                                alt="Heart"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClickHeart(p.Id);
                                }}/>
                            <img src={p.ImageUrl} className="product-foto" alt="Product image" />
                            <div className="product-info-footer">
                                <h3>{p.Name}</h3>
                                <h4>{p.Price}$</h4>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MarketplacePage;