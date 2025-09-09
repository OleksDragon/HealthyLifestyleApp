import bmiIcon from "../../icons/IMT.png";
import pointIcon from "../../icons/Point.png";
import { useTranslation } from "react-i18next";
import "../../styles/widget.css";
import { useEffect, useState } from "react";
import BMIDiagram from "./BMIDiagram";
import axios from "axios";

function BMIWidget({ className }) {
    const { t } = useTranslation();
    const [bmi, setBmi] = useState(0);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    process.env.REACT_APP_API_URL + "/api/User/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "helth-token"
                            )}`,
                        },
                    }
                );

                const height = response.data.Height;
                const weight = response.data.Weight;

                if (height !== 0 && weight !== 0) {
                    setBmi(Math.round(weight / Math.pow(height / 100, 2) * 10) / 10);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className={`${className} glass-card`}>
            <div className="widget-header">
                <div className="widget-title">
                    <img
                        style={{ width: "18px", height: "18px" }}
                        src={bmiIcon}
                        alt="bmi"
                    />
                    <h3>{t("bmi")}</h3>
                </div>
                <div className="points">
                    <img src={pointIcon} alt="point" />
                    <img src={pointIcon} alt="point" />
                    <img src={pointIcon} alt="point" />
                </div>
            </div>
            {bmi !== 0 ? (
                <div>
                    <div className="widget-info">
                        <h3>
                            <span>{bmi}</span> / 23
                        </h3>
                        <div></div>
                        <h4>{t("current_week")}</h4>
                    </div>

                    <BMIDiagram bmi={bmi} />
                </div>
            ) : (
                <div className="requires">{t("bmi_requires")}</div>
            )}
        </div>
    );
}

export default BMIWidget;
