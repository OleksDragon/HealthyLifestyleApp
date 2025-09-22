import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../../styles/create-challenge.css";
import Modal from "../../elements/Modal";

const EditChallengePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [challengeData, setChallengeData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    type: "Competition",
  });

  const [currentUserId, setCurrentUserId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState({ open: false, type: null, message: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("helth-token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId || decodedToken.sub;
        if (userId) setCurrentUserId(userId);
        else navigate("/login");
      } catch {
        navigate("/login");
      }
    } else navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const token = localStorage.getItem("helth-token");
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/socialchallenge/${id}`,
          { headers }
        );

        setChallengeData({
          name: response.data.name || response.data.Name,
          description: response.data.description || response.data.Description,
          startDate: (response.data.startDate || response.data.StartDate).split("T")[0],
          endDate: (response.data.endDate || response.data.EndDate).split("T")[0],
          type: response.data.type || response.data.Type,
        });
        setIsLoading(false);
      } catch (err) {
        console.error("Помилка завантаження челенджа:", err);
        setModal({ open: true, type: "error", message: t("ch_details_error_loading") });
        setIsLoading(false);
      }
    };
    fetchChallenge();
  }, [id, t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChallengeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoBack = () => navigate(-1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("helth-token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const typeMap = {
        Competition: 0,
        GroupChallenge: 1,
        PersonalGoal: 2,
      };

      const payload = {
        Name: challengeData.name,
        Description: challengeData.description,
        StartDate: new Date(challengeData.startDate).toISOString(),
        EndDate: new Date(challengeData.endDate).toISOString(),
        CreatorId: currentUserId,
        Type: typeMap[challengeData.type],
      };

      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/socialchallenge/${id}`,
        payload,
        { headers }
      );

      setModal({
        open: true,
        type: "success",
        message: t("ch_edit_success"),
      });
      setTimeout(() => navigate(`/social/${id}`), 10000);
    } catch (err) {
      console.error("Помилка при оновленні:", err);
      setModal({ open: true, type: "error", message: t("ch_edit_error") });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="loading-message">{t("ch_loading")}</div>;
  }
  
  if (modal.open && modal.type === "error") {
      return (
          <Modal onClose={() => setModal({ open: false, type: null, message: "" })}>
              <h3 className="modal-title">{t("ch_errorTitle")}</h3>
              <p className="modal-message">{modal.message}</p>
              <div className="modal-actions">
                  <button className="modal-btn close" onClick={() => navigate("/social")}>{t("ok")}</button>
              </div>
          </Modal>
      );
  }

  return (
    <div className="page-container create-challenge-page">
      <h2 className="ch-create-title">{t("ch_edit_title")}</h2>
      <form onSubmit={handleSubmit} className="challenge-form">
        <div className="form-group">
          <label htmlFor="name">{t("ch_name")}</label>
          <input type="text" name="name" value={challengeData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="description">{t("ch_description")}</label>
          <textarea name="description" value={challengeData.description} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="startDate">{t("ch_start_date")}</label>
          <input type="date" name="startDate" value={challengeData.startDate} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">{t("ch_end_date")}</label>
          <input type="date" name="endDate" value={challengeData.endDate} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="type">{t("ch_type")}</label>
          <select name="type" value={challengeData.type} onChange={handleChange}>
            <option value="Competition">{t("ch_type_competition")}</option>
            <option value="GroupChallenge">{t("ch_type_group")}</option>
            <option value="PersonalGoal">{t("ch_type_personal")}</option>
          </select>
        </div>        
        <div className="challenge-button-group">
            <button type="button" onClick={handleGoBack} className="ch-button">
                {t("ch_back")}
            </button>
            <button type="submit" disabled={isSubmitting} className="ch-button">
                {isSubmitting ? t("ch_saving") : t("ch_save")}
            </button>          
        </div>
      </form>

        {modal.open && modal.type === "success" && (
        <Modal onClose={() => setModal({ open: false, type: null, message: "" })}>
            <h3 className="modal-title">{t("ch_edit_success_title")}</h3>
            <p className="modal-message">{modal.message}</p>
            <div className="modal-actions">
                <button
                    className="modal-btn confirm"
                    onClick={() => {
                        setModal({ open: false, type: null, message: "" });
                        navigate(`/social/${id}`);
                    }}
                >
                    {t("ok")}
                </button>
            </div>
        </Modal>
        )}
    </div>
  );
};

export default EditChallengePage;