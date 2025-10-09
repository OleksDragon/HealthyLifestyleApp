import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

function ProductPage() {
    const { state } = useLocation();
    const scrollRef = useRef(null);

    const prod = state?.prod;
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/Products`,
            );

            setProducts(response.data.filter(p => p.Category === prod.Category));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        const scrollContainer = scrollRef.current;

        const onWheel = (e) => {
            if (!e.shiftKey) {
                e.preventDefault();
                scrollContainer.scrollLeft += e.deltaY;
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
                    <button>В кошик</button>
                    <div>
                        <h3>Опис</h3>
                        <div>{prod.Description}</div>
                    </div>
                </div>
            </div>
            <div className="similar-products">
                <h3>Схожі продукти</h3>
                <div ref={scrollRef} className="horizontal-scroll-products">

                </div>
            </div>
        </div>
    )
}

export default ProductPage;