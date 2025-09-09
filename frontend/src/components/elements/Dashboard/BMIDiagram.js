import React from "react";

function BMIDiagram({ bmi = 27.5, min = 16, max = 40, size = 170 }) {
    const categories = [
        { from: min, to: 18.9, color: "#0098B6" },
        { from: 19, to: 23.4, color: "#30DD26" },
        { from: 23.5, to: 27.9, color: "#C0FF12" },
        { from: 28, to: 32.4, color: "#F8EC20" },
        { from: 32.5, to: 36.9, color: "#FAA72C" },
        { from: 37, to: max, color: "#E41E25" },
    ];

    const cx = size / 2;
    const cy = size / 2;
    const cy2 = size / 2 - 8;
    const radius = size / 2 - 20;
    const stroke = 13;
    const gap = 4;

    const clamp = (v) => Math.max(min, Math.min(max, v));

    const valueToAngle = (v) => {
        const t = (clamp(v) - min) / (max - min);
        return 180 - t * 180;
    };

    const polarToCartesian = (cx, cy, r, angleDeg) => {
        const rad = (angleDeg * Math.PI) / 180;
        return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
    };

    const arcPath = (r, thickness, startAngle, endAngle) => {
        const start = polarToCartesian(cx, cy, r, endAngle);
        const end = polarToCartesian(cx, cy, r, startAngle);
        const innerStart = polarToCartesian(cx, cy, r - thickness, endAngle);
        const innerEnd = polarToCartesian(cx, cy, r - thickness, startAngle);

        const largeArcFlag = endAngle - startAngle <= -180 ? 1 : 0;

        return `M ${start.x} ${start.y}
            A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}
            L ${innerEnd.x} ${innerEnd.y}
            A ${r - thickness} ${r - thickness} 0 ${largeArcFlag} 1 ${
            innerStart.x
        } ${innerStart.y}
            Z`;
    };

    const arrowAngle = valueToAngle(bmi);
    const arrowEnd = polarToCartesian(cx, cy, radius - 10, arrowAngle);
    

    return (
        <svg
            width={size}
            height={size / 2}
            style={{ marginTop: "-10px" }}
            viewBox={`0 0 ${size} ${size / 2}`}
        >
            {categories.map((c, i) => {
                const startAngle = valueToAngle(c.from) - gap / 2;
                const endAngle = valueToAngle(c.to) + gap / 2;
                return (
                    <path
                        key={i}
                        d={arcPath(radius, stroke, startAngle, endAngle)}
                        fill={c.color}
                    />
                );
            })}

            <circle cx={cx} cy={cy2} r={8} fill="#111" />

            <path
                d={(() => {
                    const dx = arrowEnd.x - cx;
                    const dy = arrowEnd.y - cy2;
                    const angle = Math.atan2(dy, dx);

                    const spread = 0.4;
                    const R = Math.sqrt(dx * dx + dy * dy);

                    const x1 = cx + 8 * Math.cos(angle - spread);
                    const y1 = cy2 + 8 * Math.sin(angle - spread);
                    const x2 = cx + 8 * Math.cos(angle + spread);
                    const y2 = cy2 + 8 * Math.sin(angle + spread);

                    return `
            M ${x1} ${y1}
            L ${arrowEnd.x} ${arrowEnd.y}
            L ${x2} ${y2}
            Z
          `;
                })()}
            />
        </svg>
    );
}

export default BMIDiagram;
