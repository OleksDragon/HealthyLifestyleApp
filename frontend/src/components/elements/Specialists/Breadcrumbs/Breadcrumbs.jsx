import { Link, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import "./Breadcrumbs.css";

function Breadcrumbs() {
  const { t } = useTranslation();
  const location = useLocation();
  const { id } = useParams(); // Get the id from the URL
  const [specialistName, setSpecialistName] = useState(null);

  // Fetch specialist name when id is present
  useEffect(() => {
    if (id) {
      // Replace with your actual API call
      fetch(`/api/specialists/${id}`)
        .then((response) => response.json())
        .then((data) => setSpecialistName(data.name))
        .catch((error) => console.error("Error fetching specialist:", error));
    }
  }, [id]);

  // Split the pathname and filter out empty strings and "dashboard"
  const pathnames = location.pathname
    .split("/")
    .filter((x) => x && x !== "dashboard");

  return (
    <div className="breadcrumbs">
      <Link
        to="/dashboard"
        className={location.pathname === "/dashboard" ? "active" : ""}
      >
        {t("dashboard")}
      </Link>
      {pathnames.map((name, index) => {
        // Use specialistName for the "id" segment
        const displayName =
          name === id && specialistName ? specialistName : t(name);
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
                                                                               

