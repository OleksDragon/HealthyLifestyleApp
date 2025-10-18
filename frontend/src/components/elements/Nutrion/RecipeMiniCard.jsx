import React from "react";
import "../../styles/nutrition/recipes-page.css"; 

const RecipeMiniCard = ({ recipe, selected, onClick }) => {
    const safeRecipe = recipe || {};
    const { Name, Kkal, Protein, ImageUrl, Time } = safeRecipe; 

    const handleHeartClick = (e) => {
        e.stopPropagation(); 
    };

    const cardStyles = {
        position: 'relative', 
        height: '300px',
        minWidth: '220px', 
        borderRadius: '16px',
        overflow: 'hidden', 
        padding: 0, 
        color: 'white',
        cursor: "pointer",
        userSelect: "none",
        display: 'block',
        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    };

    const imageWrapperStyles = {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1, 
        overflow: 'hidden',
    };

    const imageStyles = {
        objectFit: "cover",
        width: "98%",
        height: "98%",
        borderRadius: '0', 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -40%)',
    };

    const infoBlockStyles = {
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%',
        height: '45%', 
        padding: '15px 20px',
        zIndex: 5,
        textAlign: 'left',
        boxSizing: 'border-box',
        background: 'linear-gradient(to top, rgba(0, 50, 150, 0.4) 0%, rgba(0, 50, 150, 0.1) 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end', 
    };

    return (
        <div 
            className={`meal-ration-card glass-card ${selected ? "selected" : ""}`}
            onClick={() => onClick(safeRecipe)}
            role="button"
            tabIndex={0}
            style={cardStyles}
        >
            <div 
                className="meal-tag" 
                style={{ 
                    position: 'absolute', 
                    top: '16px', 
                    left: '16px', 
                    zIndex: 10,
                    backgroundColor: '#007bff', 
                    borderRadius: '20px', 
                    padding: '6px 20px', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                }}
            >
                {Time || "Прийом"}
            </div>

            <div 
                className="heart-icon" 
                onClick={handleHeartClick} 
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    zIndex: 10,
                    fontSize: '20px',
                    color: 'white',
                    cursor: 'pointer',
                }}
            >
                ♡
            </div>

            <div style={imageWrapperStyles}>
                <img
                    src={ImageUrl}
                    alt={Name}
                    style={{ 
                        ...imageStyles,
                        display: ImageUrl ? 'block' : 'none' 
                    }}
                    onError={(e) => {
                        const placeholder = e.target.nextSibling;
                        e.target.style.display = 'none'; 
                        if (placeholder) {
                            placeholder.style.display = 'flex';
                        }
                    }}
                />
                
                <div 
                    className="meal-image-placeholder" 
                    style={{
                        width: '90%', 
                        height: '90%', 
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '8px', 
                        display: ImageUrl ? 'none' : 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        color: 'rgba(255,255,255,0.6)'
                    }}
                >
                    <span>Немає зображення</span>
                </div>
            </div>
            
            <div className="meal-info" style={infoBlockStyles}>
                <h4 className="meal-name" style={{ 
                    fontSize: '18px', 
                    lineHeight: '1.2', 
                    color: 'white', 
                    margin: '0 0 5px 0' 
                }}>
                    {Name || "Без назви"}
                </h4>
                <p className="meal-macros" style={{ 
                    fontSize: '15px', 
                    opacity: 0.9, 
                    color: 'white', 
                    margin: 0 
                }}>
                    {Kkal ?? 0} ккал, {Protein ?? 0} г білка
                </p>
            </div>

            {selected && <div style={{ position: 'absolute', bottom: 5, right: 15, fontSize: 12, color: "#007bff", zIndex: 10 }}>Обрано</div>}
        </div>
    );
};

export default RecipeMiniCard;