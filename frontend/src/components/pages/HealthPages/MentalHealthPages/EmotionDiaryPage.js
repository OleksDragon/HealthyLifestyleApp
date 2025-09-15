import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";

import '../../../styles/emotionDiary.css'

const EmotionDiaryPage = () => {
    // const navigate = useNavigate();
    // const location = useLocation();
    
    // const handleEmotionDiary = () => {
    //     navigate(`${location.pathname}/emotion-diary`)
    // };

    // const handleTests = () => {
    //     console.log("Перехід до тестів");
    // };

    // const handleBreathing = () => {
    //     console.log("Перехід до дихальних практик");
    // };

    // const handleArticles = () => {
    //     navigate(`${location.pathname}/articles`)
    // };

    // const handleContactToSpecialist = () => {
    //     console.log("Перехід на сторінку спеціалістів");
    // }

    return (
        <div className="mental-health-diary-container">
            {/* <div className="mental-health-diary-content">
                <div className="ap-title">
                    <h2>Щоденник емоцій</h2>
                </div>
                <div className="mental-health-articles">
                    <hr className="article-header-line-blure"/>
                    <div className="articles-list">
                        {articlesData.map((article) => (
                            <ArticleCard
                                key={article.id}
                                title={article.title}
                                onClick={() => handleArticleClick(article.id)}
                            />
                        ))}
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default EmotionDiaryPage;