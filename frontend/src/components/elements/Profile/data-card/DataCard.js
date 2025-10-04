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
    <div className="p-dc-list">
      {data.map((item, index) => {
        const iconSrc = getIcon(item.icon);
        return (
          <div 
            key={item.id || index} 
            className="p-dc-list-item"
          >
            <span className="p-dc-date">{item.date}</span>
            <span className="p-dc-text">{item.text}</span>
            {iconSrc && (
              <span className="p-dc-icon">
                <img src={iconSrc} alt={item.icon} className="p-dc-icon-image" />
              </span>
            )}
            <button className="p-dc-dots" onClick={(e) => {
                e.stopPropagation();
                onItemClick(type, item);
              }}>
            <img src={dots_menu} alt="menu dots" className="p-dc-dots-icon" />
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
      <div className="p-dc-details-view">
        <div className="p-dc-details-header">
          <button className="p-dc-back-button" onClick={() => onBackClick(type)}>
            <img src={arrow_long} alt="arrow long" className="p-dc-arrow-long" />
          </button>
        </div>
        <div className="p-dc-details-content">
          <div className="p-dc-detail-date">{selectedItem.details?.fullDate}</div>
          <div className="p-dc-detail-message-title">{selectedItem.details?.message_title}</div>
          <div className="p-dc-detail-message">{selectedItem.details?.message}</div>
          <div className="p-dc-detail-stats">
            <div className="p-dc-stat">
              <span className="p-dc-stat-label">Тривалість</span>
              <span className="p-dc-stat-value">{selectedItem.details?.duration}</span>
            </div>
            <div className="p-dc-stat">
              <span className="p-dc-stat-label">Спалено</span>
              <span className="p-dc-stat-value">{selectedItem.details?.calories}</span>
            </div>
          </div>
          <div className="p-dc-detail-motivation">{selectedItem.details?.motivation}</div>
        </div>
      </div>
    );
  };
  
  // Функція для рендерингу деталей покупок
  const renderPurchaseDetails = () => {
    if (!selectedItem || !selectedItem.details) return null;
    
    return (
      <div className="p-dc-details-view">
        <div className="p-dc-details-header">
          <button className="p-dc-back-button" onClick={() => onBackClick(type)}>
            <img src={arrow_long} alt="arrow long" className="p-dc-arrow-long" />
          </button>
        </div>
        <div className="p-dc-details-content">
          <div className="p-dc-purchase-info">
            <div className="p-dc-purchase-date">{selectedItem.details?.fullDate}</div>
            <div className="p-dc-purchase-title">{selectedItem.details?.title}</div>
            <div className="p-dc-purchase-product">{selectedItem.details?.product}</div>
            <div className="p-dc-purchase-price">Ціна: {selectedItem.details?.price}</div>
            <div className="p-dc-purchase-status">Статус: {selectedItem.details?.status}</div>
            <div className="p-dc-purchase-tracking">{selectedItem.details?.tracking}</div>
            {selectedItem.details?.deliveryDate && (
              <div className="p-dc-purchase-delivery">Доставка: {selectedItem.details?.deliveryDate}</div>
            )}
            {selectedItem.details?.estimatedDelivery && (
              <div className="p-dc-purchase-delivery">Очікувана доставка: {selectedItem.details?.estimatedDelivery}</div>
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
    <div className={`p-dc-data-card p-dc-card ${type} ${isCardOpen ? 'p-dc-card-open' : 'p-dc-card-closed'}`}>
      <h3 className="p-dc-title">{title}</h3>
      {activeView === 'list' ? renderList() : renderDetails()}
    </div>
  );
};

export default DataCard;