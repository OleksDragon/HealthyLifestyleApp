import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/nutrition/weight-widget.css'; 

const WeightChartWidget = ({ className = "" }) => {
    const { t } = useTranslation();

    const weightData = [
        { date: "Пн", weight: 80.0 }, 
        { date: "Вт", weight: 77.5 },
        { date: "Ср", weight: 78.2 },
        { date: "Чт", weight: 76.0 },
        { date: "Пт", weight: 77.0 },
        { date: "Сб", weight: 76.5 },
        { date: "Нд", weight: 75.0 }
    ];

    const targetWeight = 75; 
    const startWeight = 80;

    const chartParams = useMemo(() => {
        const weights = weightData.map(item => item.weight);
        
        const minWeight = Math.min(...weights, targetWeight, startWeight);
        const maxWeight = Math.max(...weights, targetWeight, startWeight);
        const weightRange = maxWeight - minWeight;
        
        const chartHeight = 100; 
        const chartWidth = 300;

        const getYCoordinate = (weight) => {
            if (weightRange === 0) return chartHeight / 2;
            const normalized = (weight - minWeight) / weightRange;
            return chartHeight * (1 - normalized);
        };

        const generatePathData = () => {
            if (weightData.length < 2) return ""; 
            const stepX = chartWidth / (weightData.length - 1); 
            let d = `M 0 ${getYCoordinate(weightData[0].weight)}`;

            weightData.forEach((item, index) => {
                if (index > 0) {
                    const x = index * stepX;
                    const y = getYCoordinate(item.weight);
                    d += ` L ${x} ${y}`;
                }
            });
            return d;
        };

        return {
            minWeight: minWeight,
            maxWeight: maxWeight,
            pathData: generatePathData(),
            chartHeight: chartHeight,
            chartWidth: chartWidth
        };
    }, [weightData, startWeight, targetWeight]);
    
    const { minWeight, maxWeight, pathData, chartHeight, chartWidth } = chartParams;

    const yAxisDisplay = [80, 79, 78, 77, 76, 75]; 

    return (
        <div className={`weight-analytics-widget ${className} glass-card`}>
            <div className='widget-header'>
                 <div className='widget-title'>
                    <h3 className="card-title-white">{t("weight_analytics") || 'Аналітика'}</h3>
                </div>
            </div>
            
            <div className="title-separator"></div> 
            
            <div className="weight-analytics-widget">
                <div className="weight-target-line">
                    <span className="start-weight">{startWeight}</span>
                    <span className="target-weight"> → {targetWeight} КГ</span>
                </div>
            </div>            
            
            <div className="progress-bar-container">
                <div 
                    className="progress-fill" 
                    style={{ width: `${90}%` }}
                ></div>
            </div>
            
            <p className="current-month">{t("nt_current_month") || 'Поточний місяць'}</p>
            
            <div className="chart-wrapper">
                <div className="chart-y-axis-list" style={{ height: `${chartHeight}px` }}>
                    {yAxisDisplay.map((weight) => {
                        const positionBottom = ((weight - minWeight) / (maxWeight - minWeight)) * 100;
                        return (
                            <span 
                                key={weight} 
                                className="chart-y-axis-item"
                                style={{
                                    position: 'absolute',
                                    bottom: `${positionBottom}%`,
                                    transform: 'translateY(50%)' 
                                }}
                            >
                                {weight}
                            </span>
                        );
                    })}
                </div>
                
                <div className="chart-main">
                    {yAxisDisplay.map((weight) => {
                        const positionBottom = ((weight - minWeight) / (maxWeight - minWeight)) * 100;
                        return (
                            <div 
                                key={`grid-${weight}`} 
                                className="chart-grid-line"
                                style={{ bottom: `${positionBottom}%` }}
                            ></div>
                        );
                    })}

                    <svg className="chart-line-svg" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                        <path d={pathData} className="chart-path" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default WeightChartWidget;