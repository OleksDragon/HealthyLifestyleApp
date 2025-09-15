import React from 'react';
import './DataCard.css';

import dots_menu from '../../../../assets/profile-icons/dots_menu.svg'
import arrow_long from '../../../../assets/profile-icons/arrow_long.svg'
import smile from '../../../../assets/profile-icons/smile.svg'
import progress from '../../../../assets/profile-icons/in_progress.svg'
import truck from '../../../../assets/profile-icons/truck.svg'
import drop from '../../../../assets/profile-icons/drop.svg'

const DataCard = ({ 
  title, 
  data = [], 
  activeView, 
  selectedItem, 
  onItemClick, 
  onBackClick,
  type 
}) => {
  // Визначаємо, чи картка відкрита (детальний перегляд)
  const isCardOpen = activeView === 'details';

  // Функція для отримання іконки за назвою
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'smile': return smile;
      case 'progress': return progress;
      case 'truck': return truck;
      case 'drop': return drop;
      default: return null;
    }
  };

  // Функція для рендерингу списку елементів
  const renderList = () => (
    <div className="list">
      {data.map((item, index) => {
        const iconSrc = getIcon(item.icon);
        return (
          <div 
            key={item.id || index} 
            className="list-item"
          >
            <span className="date">{item.date}</span>
            <span className="text">{item.text}</span>
            {iconSrc && (
              <span className="icon">
                <img src={iconSrc} alt={item.icon} className="icon-image" />
              </span>
            )}
            <button className="dots" onClick={(e) => {
                e.stopPropagation();
                onItemClick(type, item);
              }}>
            <img src={dots_menu} alt="menu dots" className="dots-icon" />
          </button>
          </div>
        );
      })}
    </div>
  );

  // Функція для рендерингу деталей успіху
  const renderAchievementDetails = () => {
    if (!selectedItem || !selectedItem.details) return null;
    
    return (
      <div className="details-view">
        <div className="details-header">
          <button className="back-button" onClick={() => onBackClick(type)}>
            <img src={arrow_long} alt="arrow long" className="arrow-long" />
          </button>
        </div>
        <div className="details-content">
          <div className="detail-date">{selectedItem.details?.fullDate}</div>
          <div className="detail-message-title">{selectedItem.details?.message_title}</div>
          <div className="detail-message">{selectedItem.details?.message}</div>
          <div className="detail-stats">
            <div className="stat">
              <span className="stat-label">Тривалість</span>
              <span className="stat-value">{selectedItem.details?.duration}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Спалено</span>
              <span className="stat-value">{selectedItem.details?.calories}</span>
            </div>
          </div>
          <div className="detail-motivation">{selectedItem.details?.motivation}</div>
        </div>
      </div>
    );
  };
  
  // Функція для рендерингу деталей покупок
  const renderPurchaseDetails = () => {
    if (!selectedItem || !selectedItem.details) return null;
    
    return (
      <div className="details-view">
        <div className="details-header">
          <button className="back-button" onClick={() => onBackClick(type)}>
            <img src={arrow_long} alt="arrow long" className="arrow-long" />
          </button>
        </div>
        <div className="details-content">
          <div className="purchase-info">
            <div className="purchase-date">{selectedItem.details?.fullDate}</div>
            <div className="purchase-title">{selectedItem.details?.title}</div>
            <div className="purchase-product">{selectedItem.details?.product}</div>
            <div className="purchase-price">Ціна: {selectedItem.details?.price}</div>
            <div className="purchase-status">Статус: {selectedItem.details?.status}</div>
            <div className="purchase-tracking">{selectedItem.details?.tracking}</div>
            {selectedItem.details?.deliveryDate && (
              <div className="purchase-delivery">Доставка: {selectedItem.details?.deliveryDate}</div>
            )}
            {selectedItem.details?.estimatedDelivery && (
              <div className="purchase-delivery">Очікувана доставка: {selectedItem.details?.estimatedDelivery}</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderDetails = () => {
    if (type === 'achievements') {
      return renderAchievementDetails();
    } else if (type === 'purchases') {
      return renderPurchaseDetails();
    }
    return null;
  };

  return (
    <div className={`data-card card ${type} ${isCardOpen ? 'card-open' : 'card-closed'}`}>
      <h3>{title}</h3>
      {activeView === 'list' ? renderList() : renderDetails()}
    </div>
  );
};

export default DataCard;