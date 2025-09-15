import React from "react";
import './ArticleCard.css'

import arrow_article from '../../../../../assets/health-icons/article_arrow.svg'

const ArticleCard = ({ title, onClick }) => {
    return (
        <div className="article-card" onClick={onClick}>
            <div className="article-content">
                <h3 className="article-title">{title}</h3>
                <div className="article-arrow">
                    <img src={arrow_article} alt="arrow down" className="article-arrow-icon" />
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;