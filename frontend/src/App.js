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
import ExpertDetailsPage from "./components/pages/SpecialistPages/ExpertDetailsPage/ExpertDetailsPage";
import HealthPageMenu from "./components/elements/Health/HealthPageMenu/HealthPageMenu";

import MentalHealthPage from "./components/pages/HealthPages/MentalHealthPages/MentalHealthPage";
import EmotionDiaryPage from "./components/pages/HealthPages/MentalHealthPages/EmotionDiaryPage";
import ArticlesPage from "./components/pages/HealthPages/MentalHealthPages/ArticlesPage";
import ArticleDetailPage from "./components/pages/HealthPages/MentalHealthPages/ArticleDetailPage";

import GenderHealthPage from "./components/pages/HealthPages/GenderHealthPages/GenderHealthPage";

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


      <Route path="/specialists" element={<Menu><SpecialistsPage/></Menu>} />
      <Route path="/specialists/:id" element={<Menu><ExpertDetailsPage/></Menu>} />

      <Route path="/profile" element={<PrivateRoute><Menu><ProfilePage /></Menu></PrivateRoute>} />

      <Route path="/profile" element={<PrivateRoute><Menu><ProfilePage /></Menu></PrivateRoute>} />

      <Route path="/health" element={<PrivateRoute><Menu><HealthPageMenu /></Menu></PrivateRoute>} />

      <Route path="/health/mental" element={<PrivateRoute><Menu><HealthPageMenu><MentalHealthPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/mental/diary" element={<PrivateRoute><Menu><HealthPageMenu><EmotionDiaryPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/mental/articles" element={<PrivateRoute><Menu><HealthPageMenu><ArticlesPage /></HealthPageMenu></Menu></PrivateRoute>} />
      <Route path="/health/mental/articles/:articleId" element={<PrivateRoute><Menu><HealthPageMenu><ArticleDetailPage /></HealthPageMenu></Menu></PrivateRoute> } />

      <Route path="/health/gender" element={<PrivateRoute><Menu><HealthPageMenu><GenderHealthPage /></HealthPageMenu></Menu></PrivateRoute>} />


    </Routes>
  );
}

export default App;
