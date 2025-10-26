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
    const [productsSum, setProductsSum] = useState(0);
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

            setProductsSum(response.data.CartItems.reduce((sum, p) => sum + p.Quantity * p.Product.Price, 0))
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
            <div className="shopping-cart-title">{t("basket_marketplace")}</div>
            {showModal && (
                <>
                    <div className="backdrop" onClick={() => setShowModal(false)} />

                    <div className="modal">
                        <h3>{t("sure_to_delete_product_from_cart")}</h3>
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
            {(cart && cart.CartItems && cart.CartItems.length > 0) ? <div className="cart-container">
                <div className="cart-header">
                    <h3>{t("product")}</h3>
                    <h3>{t("amount_marketplace")}</h3>
                    <h3>{t("filter_price")}</h3>
                </div>
                <div />
                <div className="scroll-data marketplace-cart-list hidden-scroll">
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
                <div className="btns-marketplace">
                    <button className="marketplace-btn-pay">{t("order_details")}</button>
                    <button className="marketplace-btn-pay" onClick={() => navigate("/marketplace/payment")}>{t("to_payment")}</button>
                </div>
            </div> 
            : 
            <div className="no-products-in-cart-message">
                У корзину не додано жодного товару
                <br />
                <button onClick={() => navigate("/marketplace")}>До магазину</button>
            </div>
            }
        </div>
    )
}

export default ShoppingCartPage;