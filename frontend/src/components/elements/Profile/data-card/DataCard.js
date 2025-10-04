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

  // Форматування дати для детального перегляду
  const formatDetailDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      
      return `${day}.${month}.${year} ${hours}:${minutes}`;
    } catch (error) {
      console.error("Помилка форматування дати:", error);
      return '';
    }
  };

  // Форматування тривалості
  const formatDuration = (minutes) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours} год ${mins} хв`;
    }
    return `${mins} хв`;
  };

  // Форматування ціни
  const formatPrice = (amount) => {
    if (!amount) return '';
    return `${amount} ₴`;
  };

  // Функція для рендерингу списку елементів
  const renderList = () => (
    <div className="p-dc-list">
      {data.map((item, index) => {
        const iconSrc = getIcon(item.Icon || item.icon);
        const displayDate = item.FormattedDate || item.date;
        const displayText = item.Title || item.text;

        return (
          <div 
            key={item.Id || item.id || index} 
            className="p-dc-list-item"
          >
            <span className="p-dc-date">{displayDate}</span>
            <span className="p-dc-text">{displayText}</span>
            {iconSrc && (
              <span className="p-dc-icon">
                <img src={iconSrc} alt={item.Icon || item.icon} className="p-dc-icon-image" />
              </span>
            )}
            <button 
              className="p-dc-dots" 
              onClick={(e) => {
                e.stopPropagation();
                onItemClick(type, item);
              }}
            >
              <img src={dots_menu} alt="menu dots" className="p-dc-dots-icon" />
            </button>
          </div>
        );
      })}
    </div>
  );

  // Функція для рендерингу деталей досягнення
  const renderAchievementDetails = () => {
    if (!selectedItem) return null;
    
    const fullDate = formatDetailDate(selectedItem.AchievedDate || selectedItem.date);
    const duration = formatDuration(selectedItem.Duration || selectedItem.duration);
    const calories = selectedItem.Calories || selectedItem.calories;
    const value = selectedItem.Value || selectedItem.value;
    
    return (
      <div className="p-dc-details-view">
        <div className="p-dc-details-header">
          <button className="p-dc-back-button" onClick={() => onBackClick(type)}>
            <img src={arrow_long} alt="arrow long" className="p-dc-arrow-long" />
          </button>
        </div>
        <div className="p-dc-details-content">
          <div className="p-dc-detail-date">{fullDate}</div>
          <div className="p-dc-detail-message-title">{selectedItem.Title || selectedItem.text}</div>
          <div className="p-dc-detail-message">
            {selectedItem.Description || selectedItem.description || "Без опису"}
          </div>
          
          {(duration || calories || value) && (
            <div className="p-dc-detail-stats">
              {duration && (
                <div className="p-dc-stat">
                  <span className="p-dc-stat-label">Тривалість</span>
                  <span className="p-dc-stat-value">{duration}</span>
                </div>
              )}
              {calories && (
                <div className="p-dc-stat">
                  <span className="p-dc-stat-label">Спалено</span>
                  <span className="p-dc-stat-value">{calories} ккал</span>
                </div>
              )}
              {value && (
                <div className="p-dc-stat">
                  <span className="p-dc-stat-label">Результат</span>
                  <span className="p-dc-stat-value">{value}</span>
                </div>
              )}
            </div>
          )}
          
          {selectedItem.Description && (
            <div className="p-dc-detail-motivation">
              {selectedItem.Description}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // Функція для рендерингу деталей покупок
  const renderPurchaseDetails = () => {
    if (!selectedItem) return null;
    
    const fullDate = formatDetailDate(selectedItem.PurchaseDate || selectedItem.date);
    const price = formatPrice(selectedItem.Amount || selectedItem.amount);
    const deliveryDate = selectedItem.DeliveryDate ? formatDetailDate(selectedItem.DeliveryDate) : null;
    const periodStart = selectedItem.PeriodStart ? formatDetailDate(selectedItem.PeriodStart) : null;
    const periodEnd = selectedItem.PeriodEnd ? formatDetailDate(selectedItem.PeriodEnd) : null;

    // Визначення статусу
    const getStatusText = (status) => {
      const statusMap = {
        'Delivered': 'Доставлено',
        'Active': 'Активна',
        'Completed': 'Завершено',
        'Shipped': 'Відправлено'
      };
      return statusMap[status] || status;
    };

    return (
      <div className="p-dc-details-view">
        <div className="p-dc-details-header">
          <button className="p-dc-back-button" onClick={() => onBackClick(type)}>
            <img src={arrow_long} alt="arrow long" className="p-dc-arrow-long" />
          </button>
        </div>
        <div className="p-dc-details-content">
          <div className="p-dc-purchase-info">
            <div className="p-dc-purchase-date">{fullDate}</div>
            <div className="p-dc-purchase-title">{selectedItem.Title || selectedItem.text}</div>
            <div className="p-dc-purchase-product">
              {selectedItem.ProductName || selectedItem.productName}
            </div>
            <div className="p-dc-purchase-price">Ціна: {price}</div>
            
            {selectedItem.OrderNumber && (
              <div className="p-dc-purchase-order">Замовлення: {selectedItem.OrderNumber}</div>
            )}
            
            <div className="p-dc-purchase-status">
              Статус: {getStatusText(selectedItem.Status || selectedItem.status)}
            </div>
            
            {selectedItem.TrackingNumber && (
              <div className="p-dc-purchase-tracking">
                Трек номер: {selectedItem.TrackingNumber}
              </div>
            )}
            
            {deliveryDate && (
              <div className="p-dc-purchase-delivery">Доставка: {deliveryDate}</div>
            )}
            
            {periodStart && periodEnd && (
              <div className="p-dc-purchase-period">
                Період: {periodStart} - {periodEnd}
              </div>
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