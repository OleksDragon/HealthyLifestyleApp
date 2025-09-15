import React from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../../../elements/Health/MentalHealth/ArticleCard/ArticleCard";

import '../../../styles/articles.css';

import { article_test_data } from '../../../services/articles_test_data';

const ArticlesPage = () => {
    const navigate = useNavigate();
    // const location = useLocation();
    
    const articlesData = article_test_data;

    const handleArticleClick = (articleId) => {
        navigate(`/health/mental/articles/${articleId}`);
    };

    return (
        <div className="mental-health-article-container">
            <div className="mental-health-article-content">
                <div className="ap-title">
                    <h2>Корисні статті</h2>
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
            </div>
        </div>
    );
};

export default ArticlesPage;