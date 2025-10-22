import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";
import DashboardPage from "./components/pages/DashboardPage";
import ProfilePage from "./components/pages/ProfilePage";
import SpecialistProfilePage from "./components/pages/SpecialistProfilePage";
import RestorePasswordPage from "./components/pages/RestorePasswordPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Menu from "./components/elements/Menu";
import SpecialistsPage from "./components/pages/SpecialistsPage";

import ExpertDetailsPage from "./components/pages/SpecialistPages/ExpertDetailsPage/ExpertDetailsPage";

import ChallengesPage from "./components/pages/social/ChallengesPage";
import ChallengeDetailsPage from "./components/pages/social/ChallengeDetailsPage";
import CreateChallengePage from "./components/pages/social/CreateChallengePage";
import EditChallengePage from "./components/pages/social/EditChallengePage";

import HealthPageMenu from "./components/elements/Health/HealthPageMenu/HealthPageMenu";
import HealthPage from "./components/pages/HealthPages/HealthPage";
import YourHealthPage from "./components/pages/HealthPages/YourHealthPages/YourHealthPage";

import MentalHealthPage from "./components/pages/HealthPages/MentalHealthPages/MentalHealthPage";
import EmotionDiaryPage from "./components/pages/HealthPages/MentalHealthPages/EmotionDiaryPage";
import MentalTestPage from "./components/pages/HealthPages/MentalHealthPages/MentalTestPage";
import BreathingPracticesPage from "./components/pages/HealthPages/MentalHealthPages/BreathingPracticesPage";
import DiaphragmaticBreathingPage from "./components/pages/HealthPages/MentalHealthPages/DiaphragmaticBreathingPage";
import SquareBreathingPage from "./components/pages/HealthPages/MentalHealthPages/SquareBreathingPage";
import NadiShodhanaPage from "./components/pages/HealthPages/MentalHealthPages/NadiShodhanaPage";
import ArticlesPage from "./components/pages/HealthPages/MentalHealthPages/ArticlesPage";
import ArticleDetailPage from "./components/pages/HealthPages/MentalHealthPages/ArticleDetailPage";

import GenderHealthPage from "./components/pages/HealthPages/GenderHealthPages/GenderHealthPage";
import FemaleHealthPage from "./components/pages/HealthPages/GenderHealthPages/FemaleHealthPage";
import FemaleCyclePage from './components/pages/HealthPages/GenderHealthPages/FemaleCyclePage';
import FemaleCycleCalendarPage from './components/pages/HealthPages/GenderHealthPages/FemaleCycleCalendarPage';
import GynecologyPage from './components/pages/HealthPages/GenderHealthPages/GynecologyPage';
import FemaleRegularReviewPage from './components/pages/HealthPages/GenderHealthPages/FemaleRegularReviewPage';
import FemaleExaminationPage from './components/pages/HealthPages/GenderHealthPages/FemaleExaminationPage';
import FemaleReproductiveHealthPage from './components/pages/HealthPages/GenderHealthPages/FemaleReproductiveHealthPage';

import MaleHealthPage from "./components/pages/HealthPages/GenderHealthPages/MaleHealthPage";
import MaleHormonesFormPage from "./components/pages/HealthPages/GenderHealthPages/MaleHormonesFormPage";
import MaleHormonesDiagramPage from "./components/pages/HealthPages/GenderHealthPages/MaleHormonesDiagramPage";
import CalendarPage from './components/pages/CalendarPage';
import NotFoundPage from "./components/pages/NotFoundPage";

import SubscriptionPage from './components/pages/Subscription/SubscriptionPage';
import SubscriptionDetailsPage from './components/pages/Subscription/SubscriptionDetailsPage';
import SubscriptionPaymentPage from './components/pages/Subscription/SubscriptionPaymentPage';

import PaymentSuccessPage from "./components/pages/PaymentSuccessPage";
import Workout from "./components/pages/Workout";


function App() {
  console.log("Using ", process.env.REACT_APP_API_URL, "as API URL");

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <AppRoutes />
      </Router>
    </GoogleOAuthProvider>
  );
}

function PrivateRoute({ children }) {
  const token = localStorage.getItem("helth-token");
  return token && token.trim() !== "" ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/restore" element={<RestorePasswordPage />} />
      
      {/* Основные маршруты */}
      <Route path="/dashboard" element={<PrivateRoute><Menu><DashboardPage/></Menu></PrivateRoute>} />


      <Route path="/specialists" element={<Menu><SpecialistsPage/></Menu>} />
      <Route path="/specialists/:id" element={<Menu><ExpertDetailsPage/></Menu>} />

      <Route path="/profile" element={<PrivateRoute><Menu><ProfilePage /></Menu></PrivateRoute>} />

      <Route path="/profile" element={<PrivateRoute><Menu><ProfilePage /></Menu></PrivateRoute>} />

      {/* Профіль спеціалістів */}
      <Route path="/profile/specialist" element={<PrivateRoute><Menu><SpecialistProfilePage /></Menu></PrivateRoute>} />

      {/* Социальные челленджи */}
      <Route path="/social" element={<PrivateRoute><Menu><ChallengesPage /></Menu></PrivateRoute>} />
      <Route path="/social/:challengeId" element={<PrivateRoute><Menu><ChallengeDetailsPage /></Menu></PrivateRoute>} />
      <Route path="/social/create-challenge" element={<PrivateRoute><Menu><CreateChallengePage /></Menu></PrivateRoute>} />
      <Route path="/social/:id/edit" element={<PrivateRoute><Menu><EditChallengePage /></Menu></PrivateRoute>} />

      {/* Здоровье - Основные страницы */}
      <Route path="/health" element={<PrivateRoute><Menu><HealthPageMenu /><HealthPage /></Menu></PrivateRoute>} />
      <Route path="/health/your" element={<PrivateRoute><Menu><HealthPageMenu><YourHealthPage /></HealthPageMenu></Menu></PrivateRoute>} />
      
      {/* Ментальное здоровье */}
      <Route path="/health/mental" element={<PrivateRoute><Menu><HealthPageMenu><MentalHealthPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/mental/diary" element={<PrivateRoute><Menu><HealthPageMenu><EmotionDiaryPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/mental/mentaltest" element={<PrivateRoute><Menu><HealthPageMenu><MentalTestPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/mental/breathing" element={<PrivateRoute><Menu><HealthPageMenu><BreathingPracticesPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/mental/breathing/diaphragmatic" element={<PrivateRoute><Menu><HealthPageMenu><DiaphragmaticBreathingPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/mental/breathing/square" element={<PrivateRoute><Menu><HealthPageMenu><SquareBreathingPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/mental/breathing/nadishodhana" element={<PrivateRoute><Menu><HealthPageMenu><NadiShodhanaPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/mental/articles" element={<PrivateRoute><Menu><HealthPageMenu><ArticlesPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/mental/articles/:articleId" element={<PrivateRoute><Menu><HealthPageMenu><ArticleDetailPage /></HealthPageMenu></Menu></PrivateRoute> } />

      {/* Гендерное здоровье */}
      <Route path="/health/gender" element={<PrivateRoute><Menu><HealthPageMenu><GenderHealthPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/gender/female" element={<PrivateRoute><Menu><HealthPageMenu><FemaleHealthPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/gender/female/cycle" element={<PrivateRoute><Menu><HealthPageMenu><FemaleCyclePage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/gender/female/cycle/menstruation_calendar" element={<PrivateRoute><Menu><HealthPageMenu><FemaleCycleCalendarPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/gender/female/gynecology" element={<PrivateRoute><Menu><HealthPageMenu><GynecologyPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/gender/female/checks" element={<PrivateRoute><Menu><HealthPageMenu><FemaleRegularReviewPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/gender/female/examination" element={<PrivateRoute><Menu><HealthPageMenu><FemaleExaminationPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/gender/female/reproductive" element={<PrivateRoute><Menu><HealthPageMenu><FemaleReproductiveHealthPage /></HealthPageMenu></Menu></PrivateRoute>} />

      <Route path="/calendar" element={<PrivateRoute><Menu><CalendarPage /></Menu></PrivateRoute>} />

      {/* Мужское здоровье */}
      <Route path="/health/gender/male" element={<PrivateRoute><Menu><HealthPageMenu><MaleHealthPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/gender/male/hormonas" element={<PrivateRoute><Menu><HealthPageMenu><MaleHormonesFormPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/gender/male/hormonas_diagram" element={<PrivateRoute><Menu><HealthPageMenu><MaleHormonesDiagramPage /></HealthPageMenu></Menu></PrivateRoute>} />

      {/* Подписки */}
      <Route path="/premium" element={<PrivateRoute><Menu><SubscriptionPage /></Menu></PrivateRoute>} />
      <Route path="/premium/details" element={<PrivateRoute><Menu><SubscriptionDetailsPage /></Menu></PrivateRoute>} />
      <Route path="/premium/payment" element={<PrivateRoute><Menu><SubscriptionPaymentPage /></Menu></PrivateRoute>} />

      {/* Success and canceled payment */}
      <Route path="/success" element={<PrivateRoute><Menu><PaymentSuccessPage /></Menu></PrivateRoute>} />
      <Route path="/workout" element={<PrivateRoute><Menu><Workout /></Menu></PrivateRoute>} />

      {/* Not found */}
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  );
}

export default App;