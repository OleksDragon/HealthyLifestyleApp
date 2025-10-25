import React from "react";
import "../../styles/nutrition/recipes-page.css"; 

const RecipeMiniCard = ({ recipe, selected, onClick }) => {
    const safeRecipe = recipe || {};
    const { Name, Kkal, Protein, ImageUrl, Time } = safeRecipe; 

    const handleHeartClick = (e) => {
        e.stopPropagation(); 
    };

    const handleCardClick = () => {
        if (onClick) {
            onClick(safeRecipe);
        }
    };

    return (
        <div 
            className={`recipe-card ${selected ? "selected" : ""}`}
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            style={{ 
                position: 'relative',
                cursor: "pointer",
                userSelect: "none"
            }}
        >
            <div className="recipe-time-tag">
                {Time || "Прийом"}
            </div>

            <div 
                className="heart-icon"
                onClick={handleHeartClick}
            >
                ♡
            </div>

            <div className="recipe-image-wrapper">
                {ImageUrl ? (
                    <img
                        src={ImageUrl}
                        alt={Name}
                        className="recipe-image"
                        onError={(e) => {
                            const placeholder = e.target.nextSibling;
                            e.target.style.display = 'none'; 
                            if (placeholder) {
                                placeholder.style.display = 'flex';
                            }
                        }}
                    />
                ) : null}
                
                <div 
                    className="recipe-image-placeholder" 
                    style={{
                        display: ImageUrl ? 'none' : 'flex'
                    }}
                >
                    <span style={{color: 'rgba(255, 255, 255, 0.6)', zIndex: 6}}>
                        Немає зображення
                    </span>
                </div>
            </div>
            
            <div className="recipe-info">
                <h4 className="recipe-name">{Name || "Без назви"}</h4>
                <p className="recipe-macros">
                    {Kkal ?? 0} ккал, {Protein ?? 0} г білка
                </p>
            </div>

            {selected && (
                <div style={{ 
                    position: 'absolute', 
                    bottom: 10, 
                    right: 15, 
                    fontSize: 12, 
                    color: "#007bff", 
                    zIndex: 25,
                    fontWeight: 'bold'
                }}>
                    Обрано
                </div>
            )}
        </div>
    );
};

export default RecipeMiniCard;