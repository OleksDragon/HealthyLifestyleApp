import './App.css';
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
import RestorePasswordPage from "./components/pages/RestorePasswordPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Menu from "./components/elements/Menu";
import SpecialistsPage from "./components/pages/SpecialistsPage";

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
  return token && token.trim() !== "" ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/restore" element={<RestorePasswordPage />} />
      <Route path="/dashboard" element={<PrivateRoute><Menu><DashboardPage/></Menu></PrivateRoute>} />


      <Route path="/specialists" element={<PrivateRoute><Menu><SpecialistsPage/></Menu></PrivateRoute>} />

      <Route path="/profile" element={<PrivateRoute><Menu><ProfilePage /></Menu></PrivateRoute>} />

      <Route path="/health" element={<PrivateRoute><Menu><HealthPageMenu /><HealthPage /></Menu></PrivateRoute>} />
      <Route path="/health/your" element={<PrivateRoute><Menu><HealthPageMenu><YourHealthPage /></HealthPageMenu></Menu></PrivateRoute>} />
      
      <Route path="/health/mental" element={<PrivateRoute><Menu><HealthPageMenu><MentalHealthPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/mental/diary" element={<PrivateRoute><Menu><HealthPageMenu><EmotionDiaryPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/mental/mentaltest" element={<PrivateRoute><Menu><HealthPageMenu><MentalTestPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/mental/breathing" element={<PrivateRoute><Menu><HealthPageMenu><BreathingPracticesPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/mental/breathing/diaphragmatic" element={<PrivateRoute><Menu><HealthPageMenu><DiaphragmaticBreathingPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/mental/breathing/square" element={<PrivateRoute><Menu><HealthPageMenu><SquareBreathingPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/mental/breathing/nadishodhana" element={<PrivateRoute><Menu><HealthPageMenu><NadiShodhanaPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/mental/articles" element={<PrivateRoute><Menu><HealthPageMenu><ArticlesPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/mental/articles/:articleId" element={<PrivateRoute><Menu><HealthPageMenu><ArticleDetailPage /></HealthPageMenu></Menu></PrivateRoute> } />

      <Route path="/health/gender" element={<PrivateRoute><Menu><HealthPageMenu><GenderHealthPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/gender/female" element={<PrivateRoute><Menu><HealthPageMenu><FemaleHealthPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/gender/female/cycle" element={<PrivateRoute><Menu><HealthPageMenu><FemaleCyclePage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/gender/female/cycle/menstruation_calendar" element={<PrivateRoute><Menu><HealthPageMenu><FemaleCycleCalendarPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/gender/female/gynecology" element={<PrivateRoute><Menu><HealthPageMenu><GynecologyPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/gender/female/checks" element={<PrivateRoute><Menu><HealthPageMenu><FemaleRegularReviewPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/gender/female/examination" element={<PrivateRoute><Menu><HealthPageMenu><FemaleExaminationPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/gender/female/reproductive" element={<PrivateRoute><Menu><HealthPageMenu><FemaleReproductiveHealthPage /></HealthPageMenu></Menu></PrivateRoute>} />

      <Route path="/health/gender/male" element={<PrivateRoute><Menu><HealthPageMenu><MaleHealthPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/gender/male/hormonas" element={<PrivateRoute><Menu><HealthPageMenu><MaleHormonesFormPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/gender/male/hormonas_diagram" element={<PrivateRoute><Menu><HealthPageMenu><MaleHormonesDiagramPage /></HealthPageMenu></Menu></PrivateRoute>} />

    </Routes>
  );
}

export default App;
