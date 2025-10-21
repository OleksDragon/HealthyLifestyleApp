import { useEffect, useState } from "react";
import "../../styles/marketplace.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import deleteIcon from "../../icons/deleteIconRed.png";
import { useNavigate } from "react-router-dom";

function ShoppingCartPage() {
    const { t } = useTranslation();
    const [cart, setCart] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [removePos, setRemovePos] = useState("");
    const navigate = useNavigate();

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
        } catch (error) {
            console.log(error);
        }
    }

    const handlePosDelete = async () => {
         try {
            await axios.put(
                `${process.env.REACT_APP_API_URL}/api/ShoppingCart/remove`,
                {
                    ProductId: removePos,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("helth-token")}`
                    }
                }
            );

            fetchCart();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCart();
    }, [])

    return (
        <div className="shopping-cart-container">
            <div className="shopping-cart-title">Кошик</div>
            {showModal && (
                <>
                    <div className="backdrop" onClick={() => setShowModal(false)} />

                    <div className="modal">
                        <h3>Ви впевнені, що хочете видалити товар з корзини</h3>
                        <div className="buttons">
                        <button onClick={() => setShowModal(false)}>{t("no")}</button>
                        <button
                            onClick={() => {
                                handlePosDelete();
                                setShowModal(false);
                            }}
                        >
                            {t("yes")}
                        </button>
                        </div>
                    </div>
                </>
            )}
            {(cart && cart.CartItems) && <div className="cart-container">
                <div className="cart-header">
                    <h3>Продукт</h3>
                    <h3>Кількість</h3>
                    <h3>Ціна</h3>
                </div>
                <div />
                <div className="scroll-data marketplace-cart-list">
                    {cart.CartItems.map(ci => (
                        <div className="products-in-cart">
                            <div>
                                <img src={ci.Product.ImageUrl} alt="product image" />
                            </div>
                            <div>{ci.Quantity}</div>
                            <div>{ci.Product.Price} $</div>
                            <div>
                                <img 
                                    style={{height: "20px", width: "auto", cursor: "pointer"}} 
                                    src={deleteIcon} 
                                    alt="delete cart option"
                                    onClick={() => {setRemovePos(ci.Product.Id); setShowModal(true);}}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="shopping-cart-total">
                    <div>Моє замовлення</div>
                    <div className="marketplace-total-container">
                        <div className="left-info-market">Сума</div>
                        <div className="right-info-market">{cart.CartItems.reduce((sum, p) => sum + p.Quantity * p.Product.Price, 0)} $</div>
                    </div>
                </div>
                <div className="btns-marketplace">
                    <button className="marketplace-btn-pay">Деталі</button>
                    <button className="marketplace-btn-pay" onClick={() => navigate("/marketplace/payment")}>До сплати</button>
                </div>
            </div>}
        </div>
    )
}

export default ShoppingCartPage;