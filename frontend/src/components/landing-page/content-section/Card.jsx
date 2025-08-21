import React from 'react';
import './Card.css';

const Card = ({ id, closedImage, openImage, isWide, isOpen, onClick }) => {

  return (
    <div 
      className={`card ${isWide ? 'card-wide' : 'card-narrow'} ${isOpen ? 'card-open' : ''}`}
      onClick={() => onClick(id)}
    >
      <img src={closedImage} alt="Закрытая карточка" className="card-closed" />
      <img src={openImage} alt="Открытая карточка" className="card-open" />
          
    </div>
  );
};

export default Card;