import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import animationData from "../../../../assets/animation/mascot_breathing.json";
import BreathingPracticeCard from "../../../elements/Health/MentalHealth/BreathingPracticeCard/BreathingPracticeCard";
import InfoBlockWithAnimation from "../../../elements/Health/MentalHealth/InfoBlockWithAnimation/InfoBlockWithAnimation";
import '../../../styles/breathingPractices.css';

const BreathingPracticesPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleDiaphragmaticBreathing = () => {
        navigate(`${location.pathname}/diaphragmatic`);
    };

    const handleSquareBreathing = () => {
        navigate(`${location.pathname}/square`);
    };

    const handleNadiShodhana = () => {
        navigate(`${location.pathname}/nadishodhana`)
    };

    const infoBlockContent = {
        title: "Дихальні практики",
        subtitle: "Видихни стрес — вдихни спокій 🌿",
        descriptions: [
            "Прості вправи на дихання допомагають зняти напругу, відновити енергію та повернути ясність думок. Почати можна будь-де: вдома, на роботі чи навіть у транспорті.",
            "Спробуй — і відчуй, як тіло розслабляється, а настрій стає легшим"
        ],
        animationData: animationData
    };

    return (
        <div className="bp-breathing-practices-container">
            <div className="bp-breathing-practices-content">
                <InfoBlockWithAnimation {...infoBlockContent} />
                
                <div className="bp-breathing-practices-cards">
                    <BreathingPracticeCard
                        title="Діафрагмальне дихання"
                        descriptions={[
                            "Зменшить стрес і тривогу.",
                            "Розслабляє, знімає напругу."
                        ]}
                        onButtonClick={handleDiaphragmaticBreathing}
                    />
                    <BreathingPracticeCard
                        title="Дихання Квадрат"
                        descriptions={[
                            "Знімає тривогу й допомагає зосередитись."
                        ]}
                        onButtonClick={handleSquareBreathing}
                    />
                    <BreathingPracticeCard
                        title="Наді шодхана"
                        descriptions={[
                            "Дихання по черзі через ніздрі.",
                            "Допомагає зняти стрес.",
                            "Повертає внутрішню рівновагу."
                        ]}
                        onButtonClick={handleNadiShodhana}
                    />
                </div>
            </div>
        </div>
    );
};

export default BreathingPracticesPage;