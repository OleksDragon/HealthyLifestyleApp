import React from "react";
import '../styles/widget.css';

function DiagramLinear({ values, goal, start, step }) {
    const width = 200;
    const height = 70;
    const paddingLeft = 12;
    const up = 6;

    const scaleValues = [];
    for (let v = start; v <= goal; v += step) {
        scaleValues.push(v);
    }

    const yScale = (val) => {
        if (val >= goal) val = goal;
        if (val <= start) val = start;
        return (
            height - ((val - start) / (goal - start)) * (height - 20)
        );
    };

    const xStep = (width - paddingLeft - 20) / (values.length - 1);

    const linePath = values
        .map(
        (v, i) =>
            `${i === 0 ? "M" : "L"} ${paddingLeft + i * xStep + 6},${yScale(v) - up}`
        )
        .join(" ");

    return (
        <svg width={width} height={height} className="linear-diagram">
            {scaleValues.map((v, i) => {
                const isLast = i === scaleValues.length - 1;
                const numeric = isLast ? goal : v;
                const y = yScale(numeric) - up;
                return (
                    <g key={i}>
                        <line
                            x1={paddingLeft}
                            y1={y}
                            x2={width}
                            y2={y}
                            stroke="#ddd"
                        />
                        <text
                            x={paddingLeft - 5}
                            y={y + 4}
                            fontSize="10"
                            textAnchor="end"
                        >
                        {v}
                        </text>
                    </g>
                );
            })}
            <path d={linePath} fill="none" stroke="#D6FF00" strokeWidth="2" />
        </svg>
    );
}

export default DiagramLinear;
