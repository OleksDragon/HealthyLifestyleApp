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
import RestorePasswordPage from "./components/pages/RestorePasswordPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Menu from "./components/elements/Menu";
import SpecialistsPage from "./components/pages/SpecialistsPage";

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
      {/* Переброс на страницу авторизации, если не авторизирован (нет токена) */}
      <Route path="/dashboard" element={<PrivateRoute><Menu><DashboardPage/></Menu></PrivateRoute>} />
      <Route path="/specialists" element={<PrivateRoute><Menu><SpecialistsPage/></Menu></PrivateRoute>} />
    </Routes>
  );
}

export default App;
