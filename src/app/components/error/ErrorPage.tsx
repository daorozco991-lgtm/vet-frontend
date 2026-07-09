import { useNavigate } from "react-router-dom";
import "./error.css";
interface ErrorProps {
  mensaje?: string;
  code?: string;
}

export default function ErrorPage({ mensaje, code = "404" }: ErrorProps) {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h1 className="error-code">{code}</h1>
        <h2 className="error-title">Página no encontrada</h2>
        <p className="error-message">
          {mensaje ??
            "Lo sentimos, la página que intentas visitar no existe o fue movida a otra ubicación."}
        </p>
        <button className="vet-btn vet-btn--primary" onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}