import "../styles/notFound.css"
import _404 from "../img/404.png";
import _404_mascot from "../img/404Mascot.png";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import mascot_404 from "../../assets/animation/mascot_404.json";
import { useTranslation } from "react-i18next";

function NotFoundPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    return (
        <div className="not-found-container">
            <Lottie className="ups-mascot"
                animationData={mascot_404} 
                loop={true}
            />
            <button onClick={() => navigate("/dashboard")}>{t("go_to_main_page")}</button>
        </div>
    )
}

export default NotFoundPage;