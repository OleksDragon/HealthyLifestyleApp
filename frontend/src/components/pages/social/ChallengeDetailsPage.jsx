import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { jwtDecode } from "jwt-decode";
import Modal from "../../elements/Modal";
import "../../styles/challenge-details.css";

const ChallengeDetailsPage = () => {
  const { t } = useTranslation();
  const { challengeId } = useParams();
  const navigate = useNavigate();

  const [challenge, setChallenge] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [modal, setModal] = useState({ open: false, type: null });

  useEffect(() => {
    const fetchChallengeDetails = async () => {
      try {
        const token = localStorage.getItem("helth-token");
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            const userId =
              decodedToken.userId ||
              decodedToken.sub ||
              decodedToken[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
              ];
            if (userId) setCurrentUserId(userId.toUpperCase());
          } catch (err) {
            console.warn("Невозможно декодировать токен:", err);
          }
        }

        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/socialchallenge/${challengeId}`,
          { headers }
        );

        const normalizedData = {
          id: response.data.id || response.data.Id,
          title: response.data.name || response.data.Name,
          description: response.data.description || response.data.Description,
          startDate: response.data.startDate || response.data.StartDate,
          endDate: response.data.endDate || response.data.EndDate,
          type: response.data.type || response.data.Type,
          creatorId: (response.data.creatorId || response.data.CreatorId).toUpperCase(),
        };

        setChallenge(normalizedData);
      } catch (err) {
        console.error("Ошибка загрузки деталей челленджа:", err);
        setError(t("ch_details_error_loading"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallengeDetails();
  }, [challengeId, t]);

  const isCreator =
    currentUserId && challenge?.creatorId
      ? currentUserId === challenge.creatorId
      : false;

  const handleGoBack = () => navigate(-1);

  const handleJoinChallenge = async () => {
    try {
      const token = localStorage.getItem("helth-token");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/socialchallenge/${challengeId}/join`,
        {},
        { headers }
      );
      setModal({ open: true, type: "joinSuccess" });
    } catch (err) {
      console.error("Ошибка присоединения к челленджу:", err);
      setModal({ open: true, type: "error" });
    }
  };

  const handleEditChallenge = () => {
    navigate(`/social/${challengeId}/edit`);
  };

  const handleDeleteChallenge = async () => {
    try {
      const token = localStorage.getItem("helth-token");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/socialchallenge/${challengeId}`,
        { headers }
      );
      setModal({ open: true, type: "deleteSuccess" });
    } catch (err) {
      console.error("Ошибка удаления челленджа:", err);
      setModal({ open: true, type: "error" });
    }
  };

  if (isLoading) return <div className="loading-message">{t("ch_loading")}</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!challenge) return <div className="no-challenges-message">{t("ch_not_found")}</div>;

  return (
    <div className="page-container challenge-details-page">
      <h2 className="ch-details-title">{challenge.title}</h2>
      <p className="ch-details-description">{challenge.description}</p>

      <div className="ch-details-info">
        <p><strong>{t("ch_start_date")}:</strong> {new Date(challenge.startDate).toLocaleDateString()}</p>
        <p><strong>{t("ch_end_date")}:</strong> {new Date(challenge.endDate).toLocaleDateString()}</p>
        <p><strong>{t("ch_type")}:</strong> {t(`ch_type_${challenge.type.toLowerCase()}`)}</p>
      </div>

      <div className="ch-details-actions">
        <button className="action-button" onClick={handleGoBack}>{t("ch_back")}</button>
        <button className="action-button" onClick={() => setModal({ open: true, type: "joinConfirm" })}>
          {t("ch_join")}
        </button>
        {isCreator && (
          <>
            <button className="action-button" onClick={handleEditChallenge}>{t("ch_edit")}</button>
            <button className="action-button" onClick={() => setModal({ open: true, type: "deleteConfirm" })}>
              {t("ch_delete")}
            </button>
          </>
        )}
      </div>

      {modal.open && (
        <Modal onClose={() => setModal({ open: false, type: null })}>
          {modal.type === "joinConfirm" && (
            <>
              <h3 className="modal-title">{t("ch_confirmJoinTitle")}</h3>
              <p className="modal-message">{t("ch_confirmJoinText")}</p>
              <div className="modal-actions">
                <button className="modal-btn confirm" onClick={handleJoinChallenge}>{t("yes")}</button>
                <button className="modal-btn close" onClick={() => setModal({ open: false, type: null })}>{t("no")}</button>
              </div>
            </>
          )}
          {modal.type === "deleteConfirm" && (
            <>
              <h3 className="modal-title">{t("ch_confirmDeleteTitle")}</h3>
              <p className="modal-message">{t("ch_confirmDeleteText")}</p>
              <div className="modal-actions">
                <button className="modal-btn confirm" onClick={handleDeleteChallenge}>{t("yes")}</button>
                <button className="modal-btn close" onClick={() => setModal({ open: false, type: null })}>{t("no")}</button>
              </div>
            </>
          )}
          {modal.type === "joinSuccess" && (
            <>
              <h3 className="modal-title">{t("ch_joinedTitle")}</h3>
              <p className="modal-message">{t("ch_joinedText")}</p>
              <div className="modal-actions">
                <button className="modal-btn confirm" onClick={() => setModal({ open: false, type: null })}>{t("ok")}</button>
              </div>
            </>
          )}
          {modal.type === "deleteSuccess" && (
            <>
              <h3 className="modal-title">{t("ch_deletedTitle")}</h3>
              <p className="modal-message">{t("ch_deletedText")}</p>
              <div className="modal-actions">
                <button className="modal-btn confirm" onClick={() => navigate("/social")}>{t("ok")}</button>
              </div>
            </>
          )}
          {modal.type === "error" && (
            <>
              <h3 className="modal-title">{t("ch_errorTitle")}</h3>
              <p className="modal-message">{t("ch_errorText")}</p>
              <div className="modal-actions">
                <button className="modal-btn close" onClick={() => setModal({ open: false, type: null })}>{t("ok")}</button>
              </div>
            </>
          )}
        </Modal>
      )}
    </div>
  );
};

export default ChallengeDetailsPage;