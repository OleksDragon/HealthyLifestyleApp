import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react"; 
import animationData from "../../../assets/med.json";
import "../../styles/challenges-page.css";

const ChallengesPage = () => {
  const { t } = useTranslation();
  const [challenges, setChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const token = localStorage.getItem("helth-token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/socialchallenge`,
          { headers }
        );

        const normalizedData = response.data.map((challenge) => ({
          id: challenge.id || challenge.Id,
          title: challenge.title || challenge.Name,
          description: challenge.description || challenge.Description,
          startDate: challenge.startDate || challenge.StartDate,
          endDate: challenge.endDate || challenge.EndDate,
        }));

        setChallenges(normalizedData);
      } catch (err) {
        console.error("Ошибка загрузки челленджей:", err);
        setError(t("ch_error_loading"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, [t]);

  if (isLoading) {
    return <div className="loading-message">{t("ch_loading")}</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="page-container">
        <div className="ch-header">
            <h2 className="ch-page-title">{t("ch_all_challenges_title")}</h2>
            <Link to="/social/create-challenge" className="create-challenge-link">
                {t("ch_add_challenge_button")}
            </Link>
            <div className="animation-container">
                <Lottie
                    animationData={animationData}
                    loop={true}
                    style={{ width: 100, height: 100 }}
                />
            </div>
        </div>

        <div className="scrollable-card-container">
            <div className="challenge-list">
                {challenges.length > 0 ? (
                    challenges.map((challenge) => (
                        <div key={challenge.id} className="challenge-card">
                            <h3 className="challenge-title">{challenge.title}</h3>
                            <p className="challenge-description">{challenge.description}</p>
                            <p className="challenge-dates">
                                {new Date(challenge.startDate).toLocaleDateString()} –{" "}
                                {new Date(challenge.endDate).toLocaleDateString()}
                            </p>
                            <Link to={`/social/${challenge.id}`} className="details-link">
                                {t("ch_details_link")}
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="no-challenges-message">
                        {t("ch_no_challenges_message")}
                        <br />
                        <Link to="/create-challenge">{t("ch_create_first_link")}</Link>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default ChallengesPage;