import React from 'react';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import '../../styles/nutrition/add-card.css'; 

// SVG-компонент іконки 
const CrossIcon = ({ size = "100%", color = "currentColor", ...props }) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path 
            d="M12 4V20M4 12H20" 
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

/**
 * Універсальний компонент картки "Додати" (Add)
 * @param {string} to - URL для Link. Якщо передано, використовується <Link>.
 * @param {function} onClick - Функція, що викликається при кліку. Використовується, якщо 'to' не передано.
 * @param {string|React.Element} textKey - Ключ i18n або сам текст/компонент.
 * @param {string} className - Додаткові класи, якщо потрібно.
 * @param {boolean} isMealCard - Якщо true, використовує класи для Раціону, інакше - для Рецептів.
 */
const AddCard = ({ to, onClick, textKey, className = '', isMealCard = false }) => {
    const { t } = useTranslation();

    const Component = to ? Link : 'div';

    const baseClass = isMealCard ? 'meal-ration-card' : 'recipe-card';
    const finalClass = `${baseClass} add-card ${className}`;

    const props = {};
    if (to) {
        props.to = to;
    } else {
        props.onClick = onClick;
        props.role = "button";
        props.tabIndex = 0;
    }

    const textContent = typeof textKey === 'string' ? t(textKey) : textKey;

    return (
        <Component 
            className={finalClass} 
            {...props}
        >
            <CrossIcon className="add-icon" size="100%" color="white" /> 
            
            <div className="add-gradient-effect" />

            <h4 className="add-text"> 
                {textContent || 'Додати елемент'}
            </h4>
        </Component>
    );
};

export default AddCard;