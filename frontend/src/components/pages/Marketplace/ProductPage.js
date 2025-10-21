import axios from "axios";
import { useEffect, useRef, useState } from "react";
import heartEmptyIcon from "../../icons/HeartEmpty.png";
import heartFullIcon from "../../icons/HeartFull.png";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/marketplace.css";

function ProductPage() {
    const { state } = useLocation();
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    const prod = state?.prod;
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/Products`,
            );

            setProducts(response.data.filter(p => p.Category === prod.Category && p.Id != prod.Id));
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

            setCart(response.data);
            console.log(response.data)
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

    const handleAddToCart = async (id) => {
        try {
            await axios.put(
                `${process.env.REACT_APP_API_URL}/api/ShoppingCart/add`,
                {
                    ProductId: id,
                    Quantity: quantity,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("helth-token")}`
                    }
                }
            );

            navigate("/marketplace/shopping_cart");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchFavorites();
        fetchCart();
    }, [])

    useEffect(() => {
        const scrollContainer = scrollRef.current;

        const onWheel = (e) => {
            if (!e.shiftKey) {
                e.preventDefault();
                scrollContainer.scrollLeft += e.deltaY * 3;
            }
        };

        scrollContainer.addEventListener("wheel", onWheel, { passive: false });

        return () => {
            scrollContainer.removeEventListener("wheel", onWheel);
        };
    }, []);

    return (
        <div className="scroll-data product-buy-container">
            <div className="product-container">
                <div>
                    <img className="product-image" src={prod.ImageUrl} />
                </div>
                <div className="product-info">
                    <h3>{prod.Name}</h3>
                    <h4>{prod.Price} $</h4>
                    {cart && cart.CartItems && cart.CartItems.some(ci => ci.Product.Id === prod.Id) ? 
                        <div style={{color: "var(--lim)"}} className="quantity-selector-container">{cart.CartItems.filter(ci => ci.Product.Id === prod.Id)[0].Quantity} шт.</div>
                    :
                        <div className="quantity-selector-container">
                            <div 
                                className="option-selector-marketplace"
                                onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                            >-</div>
                            <input
                                className="quantity-selector-marketplace"
                                type="number"
                                value={quantity}
                                disabled
                            />
                            <div 
                                className="option-selector-marketplace" 
                                onClick={() => setQuantity(Math.min(quantity + 1, 99))}
                            >+</div>
                        </div>
                    }
                    <button 
                        onClick={() => handleAddToCart(prod.Id)}
                    >
                        {cart && cart.CartItems && cart.CartItems.some(ci => ci.Product.Id === prod.Id) ? "Вже у кошику" : "В кошик"}
                    </button>
                    <div className="product-desc">
                        <h3>Опис</h3>
                        <div>{prod.Description}</div>
                    </div>
                </div>
            </div>
            <div className="similar-products">
                <h3>Схожі продукти</h3>
                <div ref={scrollRef} className="horizontal-scroll-products">
                    {products.map((p, idx) => {
                        return (
                            <div 
                                key={idx}
                                className="product-card product-card-horizontal"
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
        </div>
    )
}

export default ProductPage;