import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Breadcrumbs.css";

function Breadcrumbs() {
  const { t } = useTranslation();
  const location = useLocation();

  // Пропускаємо "dashboard" у шляху
  const pathnames = location.pathname
    .split("/")
    .filter((x) => x && x !== "dashboard");

  return (
    <div className="breadcrumbs">
      <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
        {t("dashboard")}
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
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
            <Link
              to={routeTo}
              className={isLast ? "active" : ""}
            >
              {t(name)}
            </Link>
          </span>
        );
      })}
    </div>
  );
}

export default Breadcrumbs;
                                                                               

