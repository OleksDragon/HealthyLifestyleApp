import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import '../../styles/nutrition/weight-widget.css'; 

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const WeightChartWidget = ({ className = "", userId, refreshTrigger }) => {
    const { t } = useTranslation();
    const [weightData, setWeightData] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    
    const [chartMode, setChartMode] = useState('month'); 
    
    const targetWeight = 96; 
    const startWeight = 100.5;

    const fetchWeightData = useCallback(async () => {
        if (!userId) {
            setWeightData([]);
            return;
        }
        setIsLoading(true);
        const token = localStorage.getItem("helth-token");
        if (!token) {
            console.error("Токен не знайдено");
            setIsLoading(false);
            setWeightData([]);
            return;
        }

        try {
            const response = await axios.get(`${API_URL}/api/weight/last-7-days`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const logs = response.data || [];
            
            let filteredLogs = [];
            const currentDate = new Date();

            if (chartMode === '7_days') {
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(currentDate.getDate() - 7); 
                
                filteredLogs = logs.filter(item => {
                    const logDate = new Date(item.DateLogged);
                    return logDate >= sevenDaysAgo && logDate <= currentDate;
                });
                
            } else { 
                const currentMonth = currentDate.getMonth();
                const currentYear = currentDate.getFullYear();
                
                filteredLogs = logs.filter(item => {
                    const logDate = new Date(item.DateLogged);
                    return logDate.getMonth() === currentMonth && logDate.getFullYear() === currentYear;
                });
            }
            
            console.log(`Відфільтровані дані за ${chartMode}:`, filteredLogs);
           
            const formattedData = filteredLogs
                .sort((a, b) => new Date(a.DateLogged) - new Date(b.DateLogged))
                .map(item => {
                    const weightValue = typeof item.Weight === 'string' 
                        ? parseFloat(item.Weight.replace(',', '.')) 
                        : item.Weight;
                    
                    return {
                        date: new Date(item.DateLogged),
                        weight: weightValue,
                        displayDate: new Date(item.DateLogged).getDate().toString()
                    };
                });

            setWeightData(formattedData);

        } catch (error) {
            console.error(`Помилка завантаження історії ваги для ${chartMode}:`, error);
            setWeightData([]);
        } finally {
            setIsLoading(false);
        }
    }, [userId, chartMode]);

    useEffect(() => {
        fetchWeightData();
    }, [userId, refreshTrigger, chartMode, fetchWeightData]); 
    
    const currentPeriodName = useMemo(() => {
        if (chartMode === '7_days') {
            return t("we_last_7_days") || 'Останні 7 днів';
        }
        
        const months = [
            t("nt_january") || 'Січень',
            t("nt_february") || 'Лютий', 
            t("nt_march") || 'Березень',
            t("nt_april") || 'Квітень',
            t("nt_may") || 'Травень',
            t("nt_june") || 'Червень',
            t("nt_july") || 'Липень',
            t("nt_august") || 'Серпень',
            t("nt_september") || 'Вересень',
            t("nt_october") || 'Жовтень',
            t("nt_november") || 'Листопад',
            t("nt_december") || 'Грудень'
        ];
        return months[new Date().getMonth()];
    }, [t, chartMode]);

    const ChartModeSwitch = () => (
        <div className="chart-mode-switch">
            <button
                className={`mode-button ${chartMode === 'month' ? 'active' : ''}`}
                onClick={() => setChartMode('month')}
            >
                {t("we_mode_month") || 'Місяць'}
            </button>
            <button
                className={`mode-button ${chartMode === '7_days' ? 'active' : ''}`}
                onClick={() => setChartMode('7_days')}
            >
                {t("we_mode_7days") || '7 Днів'}
            </button>
        </div>
    );
    
    const chartParams = useMemo(() => {
        const defaultParams = { 
            minWeight: targetWeight - 5, 
            maxWeight: startWeight, 
            pathData: "", 
            chartHeight: 100, 
            chartWidth: 300 
        };

        const validWeights = weightData
            .map(item => item.weight)
            .filter(w => typeof w === 'number' && !isNaN(w));

        if (validWeights.length < 2) {
            return defaultParams;
        }

        const minWeight = Math.min(...validWeights, targetWeight, startWeight) - 0.5;
        const maxWeight = Math.max(...validWeights, targetWeight, startWeight) + 0.5;
        
        let weightRange = maxWeight - minWeight;
        
        if (weightRange <= 0) {
            weightRange = 1; 
        }

        const chartHeight = 100; 
        const chartWidth = 300;

        const getYCoordinate = (weight) => {
            const normalized = (weight - minWeight) / weightRange;
            return chartHeight * (1 - normalized);
        };

        const generatePathData = () => {
            const stepX = weightData.length > 1 ? chartWidth / (weightData.length - 1) : chartWidth;
            
            let d = '';
            
            const validPoints = weightData.filter(item => 
                typeof item.weight === 'number' && !isNaN(item.weight)
            );

            validPoints.forEach((item, index) => {
                const x = index * stepX;
                const y = getYCoordinate(item.weight);
                
                if (index === 0) {
                    d = `M ${x} ${y}`;
                } else {
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
            chartWidth: chartWidth,
            validPointsCount: weightData.filter(item => typeof item.weight === 'number' && !isNaN(item.weight)).length
        };
    }, [weightData, startWeight, targetWeight]);
    
    const { minWeight, maxWeight, pathData, chartHeight, chartWidth, validPointsCount } = chartParams;

    const yAxisDisplay = useMemo(() => {
        const numTicks = 5;
        const ticks = [];
        const step = (maxWeight - minWeight) / (numTicks - 1);
        for (let i = 0; i < numTicks; i++) {
            ticks.push((minWeight + i * step).toFixed(1)); 
        }
        return ticks.reverse(); 
    }, [minWeight, maxWeight]);

    const currentProgress = useMemo(() => {
        if (weightData.length === 0) return 0;
        
        const lastWeight = weightData[weightData.length - 1]?.weight;
        if (typeof lastWeight !== 'number' || isNaN(lastWeight)) return 0;
        
        const progress = ((startWeight - lastWeight) / (startWeight - targetWeight)) * 100;
        return Math.min(Math.max(progress, 0), 100);
    }, [weightData, startWeight, targetWeight]);

    if (isLoading) {
        return (
            <div className={`weight-analytics-widget ${className} glass-card`}>
                <p>{t("nt_loading") || 'Завантаження графіку ваги...'}</p>
            </div>
        );
    }
    
    if (weightData.length === 0) {
        return (
            <div className={`weight-analytics-widget ${className} glass-card`}>
                <div className='widget-header'>
                    <div className='widget-title'><h3 className="card-title-white">{t("weight_analytics") || 'Аналітика'}</h3></div>
                </div>
                <div className="title-separator"></div> 
                <div className="chart-control-area"> 
                    <p className="current-month">{currentPeriodName}</p>
                    <ChartModeSwitch /> 
                </div>
                <p className="no-data-chart">{t("we_no_data_chart") || 'Немає даних для відображення графіку.'}</p>
            </div>
        );
    }

    return (
        <div className={`weight-analytics-widget ${className} glass-card`}>
            <div className='widget-header'>
                <div className='widget-title'>
                    <h3 className="card-title-white">{t("weight_analytics") || 'Аналітика'}</h3>
                </div>
            </div>
            
            <div className="title-separator"></div> 
            
            <div className="chart-control-area"> 
                <p className="current-month">{currentPeriodName}</p>
                <ChartModeSwitch /> 
            </div>
            
            <div className="weight-target-line">
                <span className="start-weight">{startWeight} кг</span>
                <span className="target-weight"> → {targetWeight} кг</span>
            </div>
            
            <div className="progress-bar-container">
                <div 
                    className="progress-fill" 
                    style={{ width: `${currentProgress}%` }}
                ></div>
            </div>
            
            <div className="chart-wrapper">
                <div className="chart-y-axis-list" style={{ height: `${chartHeight}px` }}>
                    {yAxisDisplay.map((weightStr, index) => {
                        const weight = parseFloat(weightStr);
                        const positionBottom = ((weight - minWeight) / (maxWeight - minWeight)) * 100;
                        return (
                            <span 
                                key={`y-label-${index}`}
                                className="chart-y-axis-item"
                                style={{
                                    position: 'absolute',
                                    bottom: `${positionBottom}%`,
                                    transform: 'translateY(50%)' 
                                }}
                            >
                                {weightStr}
                            </span>
                        );
                    })}
                </div>
                
                <div className="chart-main">
                    {yAxisDisplay.map((weightStr, index) => {
                        const weight = parseFloat(weightStr);
                        const positionBottom = ((weight - minWeight) / (maxWeight - minWeight)) * 100;
                        return (
                            <div 
                                key={`grid-${index}`}
                                className="chart-grid-line"
                                style={{ bottom: `${positionBottom}%` }}
                            ></div>
                        );
                    })}

                    {validPointsCount < 2 ? (
                        <p className="no-data-chart">{t("we_no_chart_data") || 'Потрібно принаймні 2 записи.'}</p>
                    ) : (
                        <svg 
                            className="chart-line-svg" 
                            viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
                            preserveAspectRatio="none"
                        >
                            <path 
                                d={pathData} 
                                className="chart-path"
                                fill="none"
                                strokeWidth="2"
                            />
                        </svg>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WeightChartWidget;