import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../../styles/create-challenge.css";

const CreateChallengePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [challengeData, setChallengeData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    type: "Competition",
  });

  const [currentUserId, setCurrentUserId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
  const token = localStorage.getItem("helth-token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);

      const userId = decodedToken.userId || decodedToken.sub;

      if (userId) {
        setCurrentUserId(userId);
      } else {
        console.error("Не знайдено ID користувача у токені");
        navigate("/login");
      }
    } catch (err) {
      console.error("Invalid token:", err);
      navigate("/login");
    }
  } else {
    navigate("/login");
  }
}, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChallengeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (!currentUserId) {
      setErrorMessage("Користувач не авторизований.");
      setIsSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem("helth-token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const typeMap = {
        "Competition": 0,
        "GroupChallenge": 1,
        "PersonalGoal": 2,
      };

      const payload = {
        Name: challengeData.name,
        Description: challengeData.description,
        StartDate: new Date(challengeData.startDate).toISOString(),
        EndDate: new Date(challengeData.endDate).toISOString(),
        CreatorId: currentUserId,
        Type: typeMap[challengeData.type],
      };

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/socialchallenge`,
        payload, 
        { headers }
      );

      setSuccessMessage(t("ch_create_success"));
      setTimeout(() => {
        navigate("/social");
      }, 2000);
    } catch (err) {
      console.error("Помилка при створенні челенджу:", err);
      setErrorMessage(t("ch_create_error"));
    } finally {
      setIsSubmitting(false);
    }
};
    
const handleGoBack = () => {
  navigate(-1);
};

return (
        <div className="page-container">
            <div className="scrollable-form-container">
            <form onSubmit={handleSubmit} className="challenge-form create-challenge-page">
                <h2 className="ch-create-title">{t("ch_create_title")}</h2>
                    <div className="form-group">
                        <label htmlFor="name">{t("ch_name")}</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={challengeData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">{t("ch_description")}</label>
                        <textarea
                            id="description"
                            name="description"
                            value={challengeData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="startDate">{t("ch_start_date")}</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={challengeData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endDate">{t("ch_end_date")}</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={challengeData.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">{t("ch_type")}</label>
                        <select
                            id="type"
                            name="type"
                            value={challengeData.type}
                            onChange={handleChange}
                        >
                            <option value="Competition">{t("ch_type_competition")}</option>
                            <option value="GroupChallenge">{t("ch_type_group")}</option>
                            <option value="PersonalGoal">{t("ch_type_personal")}</option>
                        </select>
                    </div>
                    <div className="challenge-button-group">
                        <button
                            type="button"
                            onClick={handleGoBack}
                            className="ch-button"
                        >
                            {t("ch_back")}
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || !currentUserId}
                            className="ch-button"
                        >
                            {isSubmitting ? t("ch_creating") : t("ch_create_submit")}
                        </button>             
                    </div>
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default CreateChallengePage;