import "../../styles/marketplace.css";

function ShoppingCartPage() {
    return (
        <div className="shopping-cart-container">
            <div className="shopping-cart-title">Кошик</div>
            <div className="cart-header">
                <h3>Продукт</h3>
                <h3>Кількість</h3>
                <h3>Ціна</h3>
            </div>
            <div />
            <div className="products-in-cart scroll-data">
                
            </div>
            <div className="shopping-cart-total">
                
            </div>
        </div>
    )
}

export default ShoppingCartPage;