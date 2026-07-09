import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import "./error.css";

export default function ErrorBoundary() {
  const error = useRouteError();

  let errorMessage = "Ocurrió un error inesperado";
  let errorStatus = "Error";

  if (isRouteErrorResponse(error)) {
    errorStatus = `${error.status}`;
    errorMessage = error.data?.message || error.statusText || "Error desconocido";
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  const handleGoHome = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h1 className="error-code">{errorStatus}</h1>
        <h2 className="error-title">Algo salió mal</h2>
        <p className="error-message">{errorMessage}</p>
        <button className="vet-btn vet-btn--primary" onClick={handleGoHome}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
