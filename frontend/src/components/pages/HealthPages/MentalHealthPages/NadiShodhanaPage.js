import React from "react";
import { useNavigate } from "react-router-dom";
import animationData from "../../../../assets/animation/mascot_breathing.json";
import InfoBlockWithAnimation from "../../../elements/Health/MentalHealth/InfoBlockWithAnimation/InfoBlockWithAnimation";
import '../../../styles/nadiShodhana.css';

const NadiShodhanaPage = () => {
    const navigate = useNavigate();
    
    const infoBlockContent = {
        title: "Наді Шодхана",
        subtitle: "Дихання, що балансує енергію",
        descriptions: [
            "Техніка чергування ніздрей для гармонізації розуму та тіла.",
            "Виконуй 3-5 хвилин для досягнення ефекту."
        ],
        animationData: animationData,
        containerHeight: "185px",
        animationWidth: "300px",
        animationHeight: "300px"
    };

    const handleBackClick = () => {
        navigate('/health/mental/breathing');
    };

    return (
        <div className="ns-breathing-container">
            <div className="ns-back-button" onClick={handleBackClick}>
                <svg width="13" height="25" viewBox="0 0 13 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 23.0703L3 12.5703L11 2.07031" stroke="white" strokeWidth="4" />
                </svg>
                <span>Повернутись назад</span>
            </div>
            <div className="ns-breathing-content">
                <div className="ns-breathing-info-block">
                    <InfoBlockWithAnimation {...infoBlockContent} />
                </div>

                <div className="ns-technique-container">
                    <div className="ns-technique-block">
                        <h3 className="ns-technique-title">Техніка:</h3>
                        <ol className="ns-technique-steps">
                            <li>Сядь зручно, вирівняй спину.</li>
                            <li>Рукою закрий праву ніздрю, вдихни через ліву.</li>
                            <li>Потім закрий ліву — видихни через праву.</li>
                            <li>Вдихни правою — видихни лівою.</li>
                            <li>Продовжуй кілька хвилин у спокійному темпі.</li>
                        </ol>
                    </div>
                    
                    <div className="ns-result-block">
                        <h3 className="ns-result-title">Результат:</h3>
                        <div className="ns-result-description">
                            <p><b>Вже через кілька хвилин з'являється відчуття спокою. Знижується рівень напруги. 
                            Розум прояснюється, наче після короткого відпочинку.</b></p>
                            
                            <p>Регулярна практика допомагає краще засинати, концентруватися та зберігати 
                            внутрішню рівновагу навіть у стресових ситуаціях.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NadiShodhanaPage;