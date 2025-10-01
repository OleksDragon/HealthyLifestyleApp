import React, { useState, useEffect, useCallback  } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import '../../../styles/maleHormonesDiagram.css';

const MaleHormonesDiagramPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [hormonesData, setHormonesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getRangeStatus = useCallback((hormone, value) => {
        const ranges = {
            [t("mp_form_testosterone")]: { normal: [300, 1000], high: 1000, low: 300 },
            [t("mp_form_free_testosterone_2")]: { normal: [5, 21], high: 21, low: 5 },
            [t("mp_form_lh_2")]: { normal: [1.8, 8.6], high: 8.6, low: 1.8 },
            [t("mp_form_fsh")]: { normal: [1.5, 12.4], high: 12.4, low: 1.5 },
            [t("mp_form_prolactin")]: { normal: [4, 15], high: 15, low: 4 },
            [t("mp_form_estradiol")]: { normal: [10, 40], high: 40, low: 10 }
        };

        const range = ranges[hormone];
        if (!range) return 'normal';
        
        if (value === 0) return 'low';
        if (value > range.high) return 'high';
        if (value < range.low) return 'low';
        return 'normal';
    }, [t]);

    useEffect(() => {
        const fetchHormonesData = async () => {
            try {
                const token = localStorage.getItem('helth-token');
                const userId = localStorage.getItem('user-id');
                
                if (!token || !userId) {
                    console.error('Токен або ID користувача відсутні');
                    navigate('/login');
                    return;
                }

                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/male-health-tracker/${userId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                const foundRecord = response.data;
                
                if (foundRecord) {
                    const transformedData = [
                        { 
                            hormone: t("mp_form_testosterone"), 
                            value: foundRecord.TestosteroneLevel || 0, 
                            unit: t("mp_form_ng_dl"), 
                            status: 'normal' 
                        },
                        { 
                            hormone: t("mp_form_free_testosterone_2"), 
                            value: foundRecord.FreeTestosterone || 0, 
                            unit: t("mp_form_ng_dl"), 
                            status: 'normal' 
                        },
                        { 
                            hormone: t("mp_form_lh_2"), 
                            value: foundRecord.LH || 0, 
                            unit: t("mp_form_mO_l"), 
                            status: 'normal' 
                        },
                        { 
                            hormone: t("mp_form_fsh"), 
                            value: foundRecord.FSH || 0, 
                            unit: t("mp_form_mO_l"), 
                            status: 'normal' 
                        },
                        { 
                            hormone: t("mp_form_prolactin"), 
                            value: foundRecord.Prolactin || 0, 
                            unit: t("mp_form_ng_ml"), 
                            status: 'normal' 
                        },
                        { 
                            hormone: t("mp_form_estradiol"), 
                            value: foundRecord.Estradiol || 0, 
                            unit: t("mp_form_pg_ml"), 
                            status: 'normal' 
                        }
                    ];

                    const dataWithStatus = transformedData.map(item => ({
                        ...item,
                        status: getRangeStatus(item.hormone, item.value)
                    }));

                    console.log('Processed data:', dataWithStatus);
                    setHormonesData(dataWithStatus);
                } else {
                    setError(t("mp_diagram_hormons_value_not_found"));
                    setHormonesData([]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Помилка при отриманні даних гормонів:', error);
                
                if (error.response?.status === 401) {
                    localStorage.removeItem('helth-token');
                    localStorage.removeItem('user-id');
                    navigate('/login');
                    return;
                }
                
                if (error.response?.status === 404) {
                    setError(t("mp_diagram_hormons_value_not_found"));  
                } else {
                    setError(t("mp_diagram_hormons_data_not_found"));
                }
                setLoading(false);
            }
        };

        fetchHormonesData();
    }, [navigate, t, getRangeStatus]);

    const getDotColor = (status) => {
        switch (status) {
            case 'high': return ' #C3FF00';
            case 'low': return '#FF1827';
            default: return ' #FFFFFF';
        }
    };

    const normalizeValue = (value, hormone) => {
        const ranges = {
            [t("mp_form_testosterone")]: { min: 0, max: 1500 },
            [t("mp_form_free_testosterone_2")]: { min: 0, max: 30 },
            [t("mp_form_lh_2")]: { min: 0, max: 15 },
            [t("mp_form_fsh")]: { min: 0, max: 20 },
            [t("mp_form_prolactin")]: { min: 0, max: 25 },
            [t("mp_form_estradiol")]: { min: 0, max: 50 }
        };

        const range = ranges[hormone] || { min: 0, max: 100 };
        const normalized = ((value - range.min) / (range.max - range.min)) * 100;
        return Math.max(0, Math.min(100, normalized));
    };

    const processedData = hormonesData.map(item => ({
        ...item,
        fullValue: item.value,
        value: normalizeValue(item.value, item.hormone),
        status: getRangeStatus(item.hormone, item.value),
        dotColor: getDotColor(getRangeStatus(item.hormone, item.value))
    }));

    console.log('Final processed data:', processedData);

    const handleBackClick = () => {
        navigate('/health/gender/male');
    };

    const handleFillFormClick = () => {
        navigate('/health/gender/male/hormonas');
    };

    const CustomDot = (props) => {
        const { cx, cy, index } = props;
        
        const dataItem = processedData[index];
        const dotColor = dataItem ? dataItem.dotColor : '#ffffff';
        
        return (
            <g>
                <circle 
                    cx={cx} 
                    cy={cy} 
                    r={6}
                    fill={dotColor}
                    style={{
                        fill: dotColor,
                    }}
                />
                <circle 
                    cx={cx} 
                    cy={cy} 
                    r={12}
                    fill="transparent"
                    style={{ cursor: 'pointer' }}
                />
            </g>
        );
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="mhd-custom-tooltip">
                    <p className="mhd-tooltip-value">
                        {data.fullValue} {data.unit}
                    </p>
                </div>
            );
        }
        return null;
    };

    if (loading) {
        return null;
    }

    if (error) {
        return (
            <div>
                <div className="mh-mhf-back-button" onClick={handleBackClick}>
                    <svg width="13" height="25" viewBox="0 0 13 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 23.0703L3 12.5703L11 2.07031" stroke="white" strokeWidth="4" />
                    </svg>
                    <span>{t("mp_return_back")}</span>
                </div>

                <div className="mhd-male-hormones-page mhd-male-hormones-page-error">
                    <div className="mhd-error-container">
                        <div className="mhd-error-message">
                            {error}
                        </div>
                        <button 
                            className="mhd-fill-form-button"
                            onClick={handleFillFormClick}
                        >
                            {t("mp_add_hormones_data")}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mh-mhf-back-button" onClick={handleBackClick}>
                <svg width="13" height="25" viewBox="0 0 13 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 23.0703L3 12.5703L11 2.07031" stroke="white" strokeWidth="4" />
                </svg>
                <span>{t("mp_return_back")}</span>
            </div>

            <div className="mhd-male-hormones-page">
                <header className="mhd-hormones-header">
                    <h1 className="mhd-page-title">{t("mp_male_health")}</h1>
                    <div className="mhd-header-spacer"></div>
                </header>

                <div className="mhd-hormones-content">
                    <div className="mhd-diagram-container">
                        <ResponsiveContainer width="100%" height={350}>
                            <RadarChart data={processedData}>
                                <PolarGrid stroke="#ffffff" />
                                <PolarAngleAxis 
                                    dataKey="hormone" 
                                    tick={{ fill: '#ffffff', fontSize: 14, fontWeight: 500 }}
                                />
                                <PolarRadiusAxis 
                                    angle={90} 
                                    domain={[0, 100]}
                                    tick={false}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Radar
                                    name="Гормони"
                                    dataKey="value"
                                    stroke="#ffffff"
                                    fill="#d6ff00"
                                    fillOpacity={0.8}
                                    dot={<CustomDot />}
                                    activeDot={false}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mhd-norms-table">
                        <div className="mhd-table-header">
                            <span className="mhd-hormone-column"></span>
                            <div className="mhd-legend-item">
                                <span className="mhd-legend-dot normal"></span>
                                <span className="mhd-legend-text">{t("mp_diagram_norm")}</span>
                            </div>
                            <div className="mhd-legend-item">
                                <span className="mhd-legend-dot high"></span>
                                <span className="mhd-legend-text">{t("mp_diagram_high")}</span>
                            </div>
                            <div className="mhd-legend-item">
                                <span className="mhd-legend-dot low"></span>
                                <span className="mhd-legend-text">{t("mp_diagram_low")}</span>
                            </div>
                        </div>
                        <div className="mhd-table-row">
                            <div className="mhd-hormone-name">
                                <div>{t("mp_form_testosterone")}</div>
                                <div className="mhd-hormone-unit">({t("mp_form_ng_dl")})</div>
                            </div>
                            <span className="mhd-value-cell">300-1000</span>
                            <span className="mhd-value-cell">&gt;1000</span>
                            <span className="mhd-value-cell">0-299</span>
                        </div>
                        <div className="mhd-table-row">
                            <div className="mhd-hormone-name">
                                <div>{t("mp_form_free_testosterone_2")}</div>
                                <div className="mhd-hormone-unit">({t("mp_form_ng_dl")})</div>
                            </div>
                            <span className="mhd-value-cell">5-21</span>
                            <span className="mhd-value-cell">&gt;21</span>
                            <span className="mhd-value-cell">0-4</span>
                        </div>
                        <div className="mhd-table-row">
                            <div className="mhd-hormone-name">
                                <div>{t("mp_form_lh_2")}</div>
                                <div className="mhd-hormone-unit">({t("mp_form_mO_l")})</div>
                            </div>
                            <span className="mhd-value-cell">1.8-8.6</span>
                            <span className="mhd-value-cell">&gt;8.6</span>
                            <span className="mhd-value-cell">0-1.7</span>
                        </div>
                        <div className="mhd-table-row">
                            <div className="mhd-hormone-name">
                                <div>{t("mp_form_fsh")}</div>
                                <div className="mhd-hormone-unit">({t("mp_form_mO_l")})</div>
                            </div>
                            <span className="mhd-value-cell">1.5-12.4</span>
                            <span className="mhd-value-cell">&gt;12.4</span>
                            <span className="mhd-value-cell">0-1.4</span>
                        </div>
                        <div className="mhd-table-row">
                            <div className="mhd-hormone-name">
                                <div>{t("mp_form_prolactin")}</div>
                                <div className="mhd-hormone-unit">({t("mp_form_pg_ml")})</div>
                            </div>
                            <span className="mhd-value-cell">4-15</span>
                            <span className="mhd-value-cell">&gt;15</span>
                            <span className="mhd-value-cell">0-3.9</span>
                        </div>
                        <div className="mhd-table-row">
                            <div className="mhd-hormone-name">
                                <div>{t("mp_form_estradiol")}</div>
                                <div className="mhd-hormone-unit">({t("mp_form_pg_ml")})</div>
                            </div>
                            <span className="mhd-value-cell">10-40</span>
                            <span className="mhd-value-cell">&gt;40</span>
                            <span className="mhd-value-cell">0-9</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaleHormonesDiagramPage;