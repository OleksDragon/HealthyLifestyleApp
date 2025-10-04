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
  const [participation, setParticipation] = useState(null);
  const [modal, setModal] = useState({ open: false, type: null });

  const token = localStorage.getItem("helth-token");

  const fetchChallengeDetails = async () => {
    try {
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
      
      const challengeRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/socialchallenge/${challengeId}`, 
        { headers }
      );

      console.log("Challenge API response:", challengeRes.data);

      const normalizedChallenge = {
        id: challengeRes.data.Id,
        title: challengeRes.data.Name,
        description: challengeRes.data.Description,
        startDate: challengeRes.data.StartDate,
        endDate: challengeRes.data.EndDate,
        type: challengeRes.data.Type,
        creatorId: challengeRes.data.CreatorId.toUpperCase(),
        participantsCount: challengeRes.data.ParticipantsCount,
      };

      setChallenge(normalizedChallenge);
      
      if (challengeRes.data.Participations && challengeRes.data.Participations.length > 0) {
        const userParticipation = challengeRes.data.Participations.find(
          p => p.UserId.toUpperCase() === currentUserId?.toUpperCase()
        );
        if (userParticipation) {
          setParticipation({
            status: userParticipation.Status === "Completed" ? "Completed" : "Joined"
          });
        }
      }
    } catch (err) {
      console.error("Ошибка загрузки деталей челленджа:", err);
      setError(t("ch_details_error_loading"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChallengeDetails();
  }, [challengeId, t, token, currentUserId]);

  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const isCreator = currentUserId && challenge?.creatorId
    ? currentUserId === challenge.creatorId
    : false;

  const handleGoBack = () => navigate(-1);

  const handleJoinChallenge = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/challengeparticipants/${challengeId}/join`,
        {},
        { headers }
      );
      await fetchChallengeDetails();
      setParticipation({ status: "Joined" });
      setModal({ open: true, type: "joinSuccess" });
    } catch (err) {
      console.error("Ошибка присоединения к челленджу:", err);
      setModal({ open: true, type: "error" });
    }
  };

  const handleLeaveChallenge = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/challengeparticipants/${challengeId}/leave`,
        { headers }
      );
      await fetchChallengeDetails();
      setParticipation(null);
      setModal({ open: true, type: "leaveSuccess" });
    } catch (err) {
      console.error("Ошибка выхода из челленджа:", err);
      setModal({ open: true, type: "error" });
    }
  };

  const handleCompleteChallenge = async () => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/challengeparticipants/${challengeId}/complete`,
        {},
        { headers }
      );
      await fetchChallengeDetails();
      setParticipation({ ...participation, status: "Completed" });
      setModal({ open: true, type: "completeSuccess" });
    } catch (err) {
      console.error("Ошибка завершения челленджа:", err);
      setModal({ open: true, type: "error" });
    }
  };

  const handleEditChallenge = () => navigate(`/social/${challengeId}/edit`);

  const handleDeleteChallenge = async () => {
    try {
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

  // Функция для закрытия модального окна и обновления данных
  const handleCloseModal = () => {
    setModal({ open: false, type: null });
    if (modal.type === "joinSuccess" || modal.type === "leaveSuccess" || modal.type === "completeSuccess") {
      fetchChallengeDetails();
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
        <p><strong>{t("ch_participants")}:</strong> {challenge.participantsCount}</p>
      </div>

      <div className="ch-details-actions">
        <button className="action-button" onClick={handleGoBack}>{t("ch_back")}</button>

        {!participation ? (
          <button className="action-button" onClick={() => setModal({ open: true, type: "joinConfirm" })}>
            {t("ch_join")}
          </button>
        ) : (
          <>
            {participation.status !== "Completed" && (
              <button className="action-button" onClick={handleCompleteChallenge}>
                {t("ch_complete")}
              </button>
            )}
            <button className="action-button" onClick={() => setModal({ open: true, type: "leaveConfirm" })}>
              {t("ch_leave")}
            </button>
          </>
        )}

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
        <Modal onClose={handleCloseModal}>
          {modal.type === "joinConfirm" && (
            <>
              <h3 className="modal-title">{t("ch_confirmJoinTitle")}</h3>
              <p className="modal-message">{t("ch_confirmJoinText")}</p>
              <div className="modal-actions">
                <button className="modal-btn confirm" onClick={handleJoinChallenge}>{t("yes")}</button>
                <button className="modal-btn close" onClick={handleCloseModal}>{t("no")}</button>
              </div>
            </>
          )}
          {modal.type === "leaveConfirm" && (
            <>
              <h3 className="modal-title">{t("ch_confirmLeaveTitle")}</h3>
              <p className="modal-message">{t("ch_confirmLeaveText")}</p>
              <div className="modal-actions">
                <button className="modal-btn confirm" onClick={handleLeaveChallenge}>{t("yes")}</button>
                <button className="modal-btn close" onClick={handleCloseModal}>{t("no")}</button>
              </div>
            </>
          )}
          {modal.type === "joinSuccess" && (
            <>
              <h3 className="modal-title">{t("ch_joinedTitle")}</h3>
              <p className="modal-message">{t("ch_joinedText")}</p>
              <div className="modal-actions">
                <button className="modal-btn confirm" onClick={handleCloseModal}>{t("ok")}</button>
              </div>
            </>
          )}
          {modal.type === "leaveSuccess" && (
            <>
              <h3 className="modal-title">{t("ch_leftTitle")}</h3>
              <p className="modal-message">{t("ch_leftText")}</p>
              <div className="modal-actions">
                <button className="modal-btn confirm" onClick={handleCloseModal}>{t("ok")}</button>
              </div>
            </>
          )}
          {modal.type === "completeSuccess" && (
            <>
              <h3 className="modal-title">{t("ch_completedTitle")}</h3>
              <p className="modal-message">{t("ch_completedText")}</p>
              <div className="modal-actions">
                <button className="modal-btn confirm" onClick={handleCloseModal}>{t("ok")}</button>
              </div>
            </>
          )}
          {modal.type === "deleteConfirm" && (
            <>
              <h3 className="modal-title">{t("ch_confirmDeleteTitle")}</h3>
              <p className="modal-message">{t("ch_confirmDeleteText")}</p>
              <div className="modal-actions">
                <button className="modal-btn confirm" onClick={handleDeleteChallenge}>{t("yes")}</button>
                <button className="modal-btn close" onClick={handleCloseModal}>{t("no")}</button>
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
                <button className="modal-btn close" onClick={handleCloseModal}>{t("ok")}</button>
              </div>
            </>
          )}
        </Modal>
      )}
    </div>
  );
};

export default ChallengeDetailsPage;