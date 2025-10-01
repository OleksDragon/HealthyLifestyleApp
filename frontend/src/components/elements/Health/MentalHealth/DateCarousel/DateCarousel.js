import React, { useState, useEffect, useRef } from "react";
import ed_lim_arrow_l from "../../../../../assets/health-icons/ed_lim_arrow_l.svg";
import ed_lim_arrow_r from "../../../../../assets/health-icons/ed_lim_arrow_r.svg";
import "./DateCarousel.css";

const DateCarousel = ({ selectedDate, onDateSelect }) => {
  const today = new Date();
  const currentDay = today.getDate();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const visibleDaysCount = 10;

  const [startIndex, setStartIndex] = useState(0);
  const carouselRef = useRef(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const calculateStartIndex = () => {
      if (currentDay <= visibleDaysCount) {
        return 0;
      }
      return Math.min(currentDay - visibleDaysCount, daysInMonth - visibleDaysCount);
    };

    setStartIndex(calculateStartIndex());
  }, [currentDay, daysInMonth, visibleDaysCount]);

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex < daysInMonth - visibleDaysCount) setStartIndex(startIndex + 1);
  };

  // Обробка початку дотику
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  // Обробка руху пальцем
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // Обробка завершення дотику
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50; // Мінімальна дистанція для swipe
    
    if (distance > minSwipeDistance) {
      // Swipe вліво - наступні дні
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swipe вправо - попередні дні
      handlePrev();
    }
    
    // Скидання значень
    setTouchStart(0);
    setTouchEnd(0);
  };

  const visibleDays = Array.from({ length: visibleDaysCount }, (_, i) => {
    const day = startIndex + i + 1;
    return day <= daysInMonth ? day : null;
  }).filter(day => day !== null);

  return (
    <div 
      ref={carouselRef}
      className="dc-carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button onClick={handlePrev} className="dc-arrow-btn" disabled={startIndex === 0}>
        <img src={ed_lim_arrow_l} alt="Попередній" className="dc-arrow" />
      </button>
      {visibleDays.map((day) => (
        <div
          key={day}
          className={`dc-day-circle ${day === selectedDate ? "dc-active" : ""} ${
            day > currentDay ? "dc-disabled" : ""
          }`}
          onClick={() => day <= currentDay && onDateSelect(day)}
        >
          {day}
        </div>
      ))}
      <button 
        onClick={handleNext} 
        className="dc-arrow-btn" 
        disabled={startIndex >= daysInMonth - visibleDaysCount}
      >
        <img src={ed_lim_arrow_r} alt="Наступний" className="dc-arrow" />
      </button>
    </div>
  );
};

export default DateCarousel;