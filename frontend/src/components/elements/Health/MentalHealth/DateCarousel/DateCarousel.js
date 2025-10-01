import React, { useState, useEffect } from "react";
import ed_lim_arrow_l from "../../../../../assets/health-icons/ed_lim_arrow_l.svg";
import ed_lim_arrow_r from "../../../../../assets/health-icons/ed_lim_arrow_r.svg";
import "./DateCarousel.css";

const DateCarousel = ({ selectedDate, onDateSelect }) => {
  const today = new Date();
  const currentDay = today.getDate();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const visibleDaysCount = 10;

  const [startIndex, setStartIndex] = useState(0);

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

  const visibleDays = Array.from({ length: visibleDaysCount }, (_, i) => {
    const day = startIndex + i + 1;
    return day <= daysInMonth ? day : null;
  }).filter(day => day !== null);

  return (
    <div className="dc-carousel">
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