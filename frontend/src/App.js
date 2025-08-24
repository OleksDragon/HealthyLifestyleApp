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
import UserPage from "./components/pages/UserPage";
import SuccessPage from "./components/pages/SuccessPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  console.log("Using ", process.env.REACT_APP_API_URL, "as API URL");

  return (
    // {process.env.REACT_APP_GOOGLE_CLIENT_ID}
    <GoogleOAuthProvider clientId="596782705647-sa9h8d11i8grjh3jukglih9c9hnsp3co.apps.googleusercontent.com">
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
      <Route path="/success" element={<SuccessPage />} />
      {/* Переброс на страницу авторизации, если не авторизирован (нет токена) */}
      <Route path="/userpage" element={<PrivateRoute><UserPage /></PrivateRoute>} />
    </Routes>
  );
}

export default App;
