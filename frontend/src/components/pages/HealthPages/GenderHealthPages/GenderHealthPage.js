import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import CustomDatePicker from "../../../elements/Health/FemaleHealth/CustomDatePicker/CustomDatePicker";
import FemaleCustomSelect from "../../../elements/Health/FemaleHealth/CustomSelector/FemaleCustomSelect";

import '../../../styles/gender.css'

const GenderHealthPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    return(
        <div className="gender-health-selector">
            <div className="gender-option" onClick={() => navigate(`${location.pathname}/female`)}>
                <div>
                    {/* <img  /> */}
                    <div className="img-but-div"></div>
                    <h3>{t("female")}</h3>
                </div>
            </div>
            <div className="gender-option" onClick={() => navigate(`${location.pathname}/male`)}>
                <div>
                    <div className="img-but-div"></div>
                    <h3>{t("male")}</h3>
                </div>
            </div>
        </div>  
    );
}

export default GenderHealthPage;