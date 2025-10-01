import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

// import { useTranslation } from 'react-i18next';


import "../styles/specialists.css"; // стилі винесемо в css


function Specialists() {

   const { t } = useTranslation();

  //  const { t } = useTranslation();
  const [specialists, setSpecialists] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/ProfessionalQualification/types`)
      .then((res) => res.json())
      .then((data) => setSpecialists(data))
      .catch((err) => console.error("Error loading specialists:", err));
  }, []);

  return (
    <div className="page">
      {/* <h1>Фахівці ({specialists.length})</h1> */}
      
      <div className="grid-12">
        {specialists.map((spec) => (
          <div key={spec.Id} className="glass-card-for-sepc">
            <h2>{spec.Name}</h2>
            <p>
              <strong>Ставка: </strong>${spec.DefaultHourlyRate}/год
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Specialists;
