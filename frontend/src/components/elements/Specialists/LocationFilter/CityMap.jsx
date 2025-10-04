import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import './CityMap.css';
import arrow_v_white from '../../../../assets/profile-icons/arrow_v_white.svg';
import arrow_v_blue from '../../../../assets/profile-icons/arrow_v_blue.svg';
import { text } from '@fortawesome/fontawesome-svg-core';

const CITY_COORDS = {
  'Київ': { lat: 50.4501, lon: 30.5234, zoom: 1 },
  'Львів': { lat: 49.8397, lon: 24.0297, zoom: 1 },
  'Одеса': { lat: 46.4825, lon: 30.7233, zoom: 1 },
  'Харків': { lat: 49.9935, lon: 36.2304, zoom: 1 },
  'Дніпро': { lat: 48.4647, lon: 35.0462, zoom: 1 }
};

export const CityMap = ({ city, onCityChange, cities = [] }) => {
  const { t } = useTranslation();
  const fallback = { lat: 48.3794, lon: 31.1656, zoom: 6 };
  const baseCoords = CITY_COORDS[city] || fallback;

  const [coords, setCoords] = useState(baseCoords);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Resolve selected label by value for display
  const selectedLabel = useMemo(() => {
    const opt = cities.find(o => o.value === city);
    return opt ? opt.label : '';
  }, [cities, city]);

  // Update coords when city changes
  useEffect(() => {
    setCoords(CITY_COORDS[city] || fallback);
  }, [city]);

  // Fetch suggestions from Nominatim API
  useEffect(() => {
    let cancelled = false;
    const fetchSuggestions = async () => {
      if (!query || query.length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`;
        const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
        const data = await res.json();
        if (!cancelled) {
          const items = (data || []).map(d => ({
            label: d.display_name,
            value: d.display_name,
            lat: parseFloat(d.lat),
            lon: parseFloat(d.lon)
          }));
          setSuggestions(items);
        }
      } catch (_) {
        if (!cancelled) setSuggestions([]);
      }
    };
    fetchSuggestions();
    return () => { cancelled = true; };
  }, [query]);

  // Close dropdown when clicking outside
  const handleClickOutside = useCallback((event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  // Combine cities and suggestions for the dropdown
  const filteredOptions = useMemo(() => {
    const cityOptions = cities.map(c => ({ ...c, isCity: true }));
    const suggestionOptions = suggestions.map(s => ({ ...s, isCity: false }));
    return [...cityOptions, ...suggestionOptions];
  }, [cities, suggestions]);

  const src = `https://www.openstreetmap.org/export/embed.html?layer=mapnik&marker=${coords.lat},${coords.lon}&zoom=${coords.zoom}`;

  const handleOptionClick = (option) => {
    setCoords({ lat: option.lat || coords.lat, lon: option.lon || coords.lon, zoom: option.isCity ? 1 : 12 });
    onCityChange(option.value);
    setIsOpen(false);
    setQuery('');
    setSuggestions([]);
  };

  const handleResetCurrentFilterClick = () => {
    onCityChange('');
    setCoords(fallback);
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const hasValue = (v) => v !== null && v !== undefined && v !== '';

return (
  <div className="city-map-container">
    <button
      className={`city-filter-select ${isOpen ? 'expanded' : ''} ${hasValue(city) ? 'has-value' : ''}`}
      ref={selectRef}
    >
      <div className="city-filter-header" onClick={toggleDropdown}>
         <input
            type="text"
            className="city-filter-input"
            value={query || selectedLabel}
            onChange={(e) => setQuery(e.target.value)}
            onClick={(e) => {
              e.stopPropagation();
              if (!isOpen) setIsOpen(true);
            }}
            readOnly
          />
          {!hasValue(city) && (
            <span className="city-filter-icon">
              {/* SVG тут */}
              <svg
                width="21"
                height="27"
                viewBox="0 0 21 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_2141_5572"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="21"
                  height="27"
                >
                  <path
                    d="M10.375 26C10.375 26 19.75 18.5 19.75 10.375C19.75 5.1975 15.5525 1 10.375 1C5.1975 1 1 5.1975 1 10.375C1 18.5 10.375 26 10.375 26Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.375 14.125C10.8675 14.125 11.3551 14.028 11.8101 13.8395C12.265 13.6511 12.6784 13.3749 13.0267 13.0267C13.3749 12.6784 13.6511 12.265 13.8395 11.8101C14.028 11.3551 14.125 10.8675 14.125 10.375C14.125 9.88254 14.028 9.39491 13.8395 8.93994C13.6511 8.48497 13.3749 8.07157 13.0267 7.72335C12.6784 7.37513 12.265 7.09891 11.8101 6.91045C11.3551 6.722 10.8675 6.625 10.375 6.625C9.38044 6.625 8.42661 7.02009 7.72335 7.72335C7.02009 8.42661 6.625 9.38044 6.625 10.375C6.625 11.3696 7.02009 12.3234 7.72335 13.0267C8.42661 13.7299 9.38044 14.125 10.375 14.125Z"
                    fill="black"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </mask>
                <g mask="url(#mask0_2141_5572)">
                  <path
                    d="M-4.625 -1.5H25.375V28.5H-4.625V-1.5Z"
                    fill="#0661CC"
                  />
                </g>
              </svg>
            </span>
          )}
        {/* <input
          type="text"
          className="city-filter-input"
          value={query || selectedLabel}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('select_city')}
          onClick={(e) => {
            e.stopPropagation();
            if (!isOpen) setIsOpen(true);
          }}
          readOnly
        /> */}
        
      </div>
      {isOpen && (
        <div className="city-filter-options-container">
          <div className="city-filter-options">
            <span className="city-filter-option-header">{t('select_city')}</span>
            {filteredOptions.map((opt, index) => (
              <div
                key={index}
                className="city-filter-option"
                onClick={() => handleOptionClick(opt)}
              >
                <div className="icon">{opt.icon}</div>
                {opt.label}
              </div>
            ))}
            <div
              className="city-filter-option"
              onClick={handleResetCurrentFilterClick}
            >
              <span className="city-filter-clear">{t("clear_option")}</span>
            </div>
          </div>
        </div>
      )}
    </button>
  </div>
);


};

export default CityMap;

/* <div className='city-select-options-container'>
         <select
        className="city-select"
        value={city || ''}
        onChange={(e) => onCityChange(e.target.value)}
        onFocus={() => setOpenSuggest(true)}
        onBlur={() => setTimeout(() => setOpenSuggest(false), 200)} // Delay to allow option click
      >
        <option className='city-select-option' value="">Всі міста</option>
        {cities.map((c) => (
          <option className='city-select-option' key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>
      </div> */
 // <div className="component">
    //   <div className="rectangle" />
    //   <div className="group">
    //     <div className="div">Введи своє місце знаходження</div>
    //     <div className="text-wrapper">Найближчі до тебе</div>
    //     <div className="city-autocomplete">
    //       <input
    //         className="city-input"
    //         value={query}
    //         onChange={(e) => { setQuery(e.target.value); setOpenSuggest(true); }}
    //         placeholder="Почніть вводити місто..."
    //       />
    //       {openSuggest && suggestions.length > 0 && (
    //         <div className="city-suggestions">
    //           {suggestions.map((s, idx) => (
    //             <div key={`${s.value}-${idx}`} className="city-suggestion" onClick={() => handleSelectSuggestion(s)}>
    //               {s.label}
    //             </div>
    //           ))}
    //         </div>
    //       )}
    //     </div>
    //   </div>
    //   <div className="rectangle-2" />
    //   <div className="map-container night">
    //     <iframe
    //       title="city-map"
    //       className="map-frame"
    //       src={src}
    //       style={{ border: 0 }}
    //       allowFullScreen={true}
    //     ></iframe>
    //   </div>
    //   <div className="city-select-wrapper">
    //     <select className="city-select" value={city || ''} onChange={(e) => onCityChange(e.target.value)}>
    //       <option value="">Всі міста</option>
    //       {cities.map((c) => (
    //         <option key={c.value} value={c.value}>{c.label}</option>
    //       ))}
    //     </select>
    //   </div>
    // </div>