import React from 'react';
import './Card.css';

const Card = ({ id, closedImage, openImage, isWide, isOpen, onClick }) => {

  return (
    <div 
      className={`cs-card ${isWide ? 'cs-card-wide' : 'cs-card-narrow'} ${isOpen ? 'cs-card-open' : ''}`}
      onClick={() => onClick(id)}
    >
      <img src={closedImage} alt="Закрытая карточка" className="cs-card-closed" />
      <img src={openImage} alt="Открытая карточка" className="cs-card-open" />
          
    </div>
  );
};

export default Card;