import React from "react";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/nutrition/date-picker-component.css";

const CustomDateInput = React.forwardRef(({ value, onClick, t }, ref) => (
    <span
        className="date-display-label"
        onClick={onClick}
        ref={ref}
        role="button"
        tabIndex={0}
    >
        {`${t("nt_date_label") || "Дата"}: ${value}`}
    </span>
));

const DatePickerComponent = ({ 
    selectedDate, 
    onDateChange, 
    onPrevDay, 
    onNextDay,
    dateFormat = "dd.MM.yyyy"
}) => {
    const { t } = useTranslation();

    return (
        <div className="date-picker-section">
            <span
                className="date-arrow"
                onClick={onPrevDay}
                title={t("prev_day") || "Попередній день"}
                role="button"
                tabIndex={0}
            >
                &lt;
            </span>
            
            <DatePicker
                id="date-input"
                selected={selectedDate}
                onChange={onDateChange}
                dateFormat={dateFormat}
                customInput={<CustomDateInput t={t} />}
                wrapperClassName="date-wrapper"
            />
            
            <span
                className="date-arrow"
                onClick={onNextDay}
                title={t("next_day") || "Наступний день"}
                role="button"
                tabIndex={0}
            >
                &gt;
            </span>
        </div>
    );
};

export default DatePickerComponent;