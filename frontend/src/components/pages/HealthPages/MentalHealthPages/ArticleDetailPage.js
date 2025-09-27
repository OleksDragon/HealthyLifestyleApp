import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import back_to_article from "../../../../assets/health-icons/back_to_article.svg";
import '../../../styles/articleDetails.css'

const ArticleDetailPage = () => {
    const { articleId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const article_test_data = [
    {
        id: "article_1",
        title: t("mp_article_1"),
        content: t("mp_article_content_1")
        },
        {
            id: "article_2",
            title: t("mp_article_2"),
            content: t("mp_article_content_2")
        },
        {
            id: "article_3",
            title: t("mp_article_3"),
            content: t("mp_article_content_3")
        },
        {
            id: "article_4",
            title: t("mp_article_4"),
            content: t("mp_article_content_4")
        },
        {
            id: "article_5",
            title: t("mp_article_5"),
            content: t("mp_article_content_5")
        },
        {
            id: "article_6",
            title: t("mp_article_6"),
            content: t("mp_article_content_6")
        },
        {
            id: "article_7",
            title: t("mp_article_7"),
            content: t("mp_article_content_7")
        }
    ];
    
    const article = article_test_data.find(item => item.id === articleId);

    if (!article) {
        return (
            <div className="ad-container">
                <h1 className="ad-title">{t("mp_article_not_found")}</h1>
                <p className="ad-text">{t("mp_article_not_found_desc_1")} {articleId} {t("mp_article_not_found_desc_2")}</p>
            </div>
        );
    }

    const formatContent = (content) => {
    const lines = content.split('\n');
    let techniqueCount = 0;
    const items = [];

    lines.forEach((paragraph, index) => {
        const trimmed = paragraph.trim();
        
        if (trimmed === '') return;
        
        if (trimmed.startsWith('# ')) {
            techniqueCount = 0;
            items.push({
                type: 'title',
                content: trimmed.substring(2),
                key: index
            });
        } else if (trimmed.startsWith('## ')) {
            techniqueCount++;
            items.push({
                type: 'technique',
                number: techniqueCount,
                title: trimmed.substring(3),
                key: index
            });
        } else if (trimmed.startsWith('### ')) {
            items.push({
                type: 'subsection',
                content: trimmed.substring(4),
                key: index
            });
        } else if (items.length > 0 && items[items.length - 1].type === 'technique') {
            // Додаємо текст до останньої техніки
            items[items.length - 1].text = trimmed;
        } else {
            items.push({
                type: 'text',
                content: trimmed,
                key: index
            });
        }
    });

    // Розділяємо техніки на два стовбці
    const techniques = items.filter(item => item.type === 'technique');
    const otherItems = items.filter(item => item.type !== 'technique');
    
    const half = Math.ceil(techniques.length / 2);
    const leftColumn = techniques.slice(0, half);
    const rightColumn = techniques.slice(half);

    return (
        <>
            {otherItems.map((item) => {
                if (item.type === 'title') {
                    return <h1 key={item.key} className="ad-main-title">{item.content}</h1>;
                } else if (item.type === 'subsection') {
                    return <h3 key={item.key} className="ad-subsection">{item.content}</h3>;
                } else if (item.type === 'section') {
                    return <h2 key={item.key} className="ad-section-title">{item.content}</h2>;
                } else {
                    return <p key={item.key} className="ad-text">{item.content}</p>;
                }
            })}
            
            {techniques.length > 0 && (
                <div className="ad-techniques-grid">
                    <div className="ad-column">
                        {leftColumn.map((item) => (
                            <div key={item.key} className="ad-technique-item">
                                <div className="ad-number">{item.number}</div>
                                <div className="ad-technique-content">
                                    <h3 className="ad-technique-title">{item.title}</h3>
                                    <p className="ad-technique-text">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="ad-column">
                        {rightColumn.map((item) => (
                            <div key={item.key} className="ad-technique-item">
                                <div className="ad-number">{item.number}</div>
                                <div className="ad-technique-content">
                                    <h3 className="ad-technique-title">{item.title}</h3>
                                    <p className="ad-technique-text">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

    return (
        <div className="ad-container">
            <button className="ad-back-button" onClick={() => navigate(-1)}>
                <img src={back_to_article} alt="Profile" className="ad-back-btn-icon" />
                <span className="ad-back-btn-label">{t("mp_return_back")}</span>
            </button>
            <div className="ad-content">
                {formatContent(article.content)}
            </div>
        </div>
    );
};

export default ArticleDetailPage;