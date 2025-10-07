import { useEffect, useState } from "react";
import "../styles/marketplace.css";
import basketIcon from "../icons/Basket.png";
import heartEmptyIcon from "../icons/HeartEmpty.png";
import testIcon from "../img/mascot.png";
import axios from "axios";

function MarketplacePage() {
    const [category, setCategory] = useState("SportsNutrition");
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");

    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/Products`,
            );

            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProducts()
    })

    return (
        <div className="marketplace-container">
            <div className="products-categories">
                <div 
                    className={`${category === "SportsNutrition" ? "active-category" : ""}`}
                    onClick={() => setCategory("SportsNutrition")}
                >
                    Спортивне харчування
                </div>
                <div
                    className={`${category === "Apparel" ? "active-category" : ""}`}
                    onClick={() => setCategory("Apparel")}
                >
                    Спортивний одяг
                </div>
                <div
                    className={`${category === "Gadgets" ? "active-category" : ""}`}
                    onClick={() => setCategory("Gadgets")}
                >
                    Гаджети
                </div>
                <div
                    className={`${category === "Other" ? "active-category" : ""}`}
                    onClick={() => setCategory("Other")}
                >
                    Інше
                </div>
                <div>
                    <img src={basketIcon} />
                </div>
            </div>
            <div className="products-filters">
                <h3>Фільтр</h3>
                <div>
                    <div 
                        className={`${category === "SportsNutrition" ? "active-category" : ""}`}
                        onClick={() => setCategory("SportsNutrition")}
                    >
                        Ціна
                    </div>
                    <div
                        className={`${category === "Apparel" ? "active-category" : ""}`}
                        onClick={() => setCategory("Apparel")}
                    >
                        Бренд
                    </div>
                    <div
                        className={`${category === "Gadgets" ? "active-category" : ""}`}
                        onClick={() => setCategory("Gadgets")}
                    >
                        Рейтинг
                    </div>
                    <div
                        className={`${category === "Other" ? "active-category" : ""}`}
                        onClick={() => setCategory("Other")}
                    >
                        Наявність
                    </div>
                </div>
            </div>
            <div className="marketplace scroll-data">
                {products.map(p => {
                    return (
                        <div className="product-card" onClick={() => setSelectedProduct(p.Id)}>
                            <img src={heartEmptyIcon} className="favorite-product"/>
                            <img src={testIcon} className="product-foto" />
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