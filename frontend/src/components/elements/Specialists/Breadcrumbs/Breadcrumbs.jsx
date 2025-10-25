import { Link, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import "./Breadcrumbs.css";

function Breadcrumbs() {
  const { t } = useTranslation();
  const location = useLocation();
  const { id } = useParams(); // Get the id from the URL
  const [specialistName, setSpecialistName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [specialistType, setSpecialistType] = useState(null);

  // Fetch specialist name when id is present
  useEffect(() => {
    if (id) {
      // Replace with your actual API call
      fetch(`${process.env.REACT_APP_API_URL}/api/ProfessionalQualification/${id}`)
        .then((response) => response.json())
        .then((data) => setSpecialistName(data.User.FullName))
        .catch((error) => console.error("Error fetching specialist:", error));
    }
  }, [id]);

  // Get user name and specialist type for specialist profile page
  useEffect(() => {
    if (location.pathname === "/profile/specialist") {
      // Get specialist type from localStorage
      const specialistTypeFromStorage = localStorage.getItem("specialist-profile");
      setSpecialistType(specialistTypeFromStorage);

      // Get user name from localStorage or fetch from API
      const storedUserName = localStorage.getItem("user-name");
      if (storedUserName) {
        setUserName(storedUserName);
      } else {
        // Fetch user profile if name not in localStorage
        const token = localStorage.getItem("helth-token");
        if (token) {
          fetch(`${process.env.REACT_APP_API_URL}/api/User/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then(response => response.json())
            .then(data => {
              const fullName = data.FullName;
              setUserName(fullName);
              localStorage.setItem("user-name", fullName);
            })
            .catch(error => console.error("Error fetching user profile:", error));
        }
      }
    }
  }, [location.pathname]);

  // Split the pathname and filter out empty strings and "dashboard"
  const pathnames = location.pathname
    .split("/")
    .filter((x) => x && x !== "dashboard");

  // Special handling for specialist profile page
  const getDisplayName = (name, index) => {
    if (location.pathname === "/profile/specialist") {
      if (name === "profile") {
        return userName || t("profile");
      }
      if (name === "specialist") {
        // Show specialist type and user name
        const specialistTypeTranslation = specialistType ? t(`spec_${specialistType.toLowerCase()}`) : t("specialist");
        return `${specialistTypeTranslation} - ${userName || t("profile")}`;
      }
    }
    
    // Use specialistName for the "id" segment
    if (name === id && specialistName) {
      return specialistName;
    }
    
    return t(name);
  };

  return (
    <div className="breadcrumbs">
      <Link
        to="/dashboard"
        className={location.pathname === "/dashboard" ? "active" : ""}
      >
        {t("dashboard")}
      </Link>
      {pathnames.map((name, index) => {
        const displayName = getDisplayName(name, index);
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <span key={name} className="breadcrumb-item">
            <svg
              width="5"
              height="8"
              viewBox="0 0 5 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L4 4L1 7" stroke="white" />
            </svg>
            <Link to={routeTo} className={isLast ? "active" : ""}>
              {displayName}
            </Link>
          </span>
        );
      })}
    </div>
  );
}

export default Breadcrumbs;
                                                                               

