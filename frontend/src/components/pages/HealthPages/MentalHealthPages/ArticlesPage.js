import React from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../../../elements/Health/MentalHealth/ArticleCard/ArticleCard";
import { useTranslation } from 'react-i18next';

import '../../../styles/articles.css';

const ArticlesPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    const articlesData = [
    {
        id: "article_1",
        title: t("mp_article_1")
        },
        {
            id: "article_2",
            title: t("mp_article_2")
        },
        {
            id: "article_3",
            title: t("mp_article_3")
        },
        {
            id: "article_4",
            title: t("mp_article_4")
        },
        {
            id: "article_5",
            title: t("mp_article_5")
        },
        {
            id: "article_6",
            title: t("mp_article_6")
        },
        {
            id: "article_7",
            title: t("mp_article_7")
        }
    ];

    const handleArticleClick = (articleId) => {
        navigate(`/health/mental/articles/${articleId}`);
    };

    return (
        <div className="mental-health-article-container">
            <div className="mental-health-article-content">
                <div className="ap-title">
                    <h2>{t("mp_articles_title")}</h2>
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