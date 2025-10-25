import { useEffect, useState } from "react";
import "./slider.css";

function RangeSlider({min, max, valueFrom, valueTo, onChange}) {
    const [valueF, setValueF] = useState(valueFrom);
    const [valueT, setValueT] = useState(valueTo || 0);

    const handleValueFChange = (e) => {
        const val = Number(e.target.value);
        setValueF(Math.min(val, valueT));
    };

    const handleValueTChange = (e) => {
        const val = Number(e.target.value);
        setValueT(Math.max(val, valueF));
    };

    return (
        <div className="range-container">
            <label className="range-label">
                Значення: <span>{valueF}</span>
            </label>

            <input
                type="range"
                min={min}
                max={max}
                value={valueF}
                onChange={(e) => handleValueFChange(e)}
                className="range-slider"
                style={{
                    backgroundSize: `${((valueF - min) / (max - min)) * 100}% 100%`,
                }}
            />

            <label className="range-label">
                Значення: <span>{valueT}</span>
            </label>

            <input
                type="range"
                min={min}
                max={max}
                value={valueT}
                onChange={(e) => handleValueTChange(e)}
                className="range-slider"
                style={{
                    backgroundSize: `${((valueT - min) / (max - min)) * 100}% 100%`,
                }}
            />

            <button onClick={(e) => {e.stopPropagation(); onChange(valueF, valueT)}}>Зберегти</button>
        </div>
    );
}

export default RangeSlider;