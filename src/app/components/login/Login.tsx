import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [disabled, setDisabled] = useState(false);

  const iniciarSesion = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (userName === "" || password === "") {
      setError("Complete todos los campos");
      return;
    }

    setDisabled(true);

    try {
      const response = await authService.login({
        userName,
        password,
      });

      localStorage.setItem("token", response.token);
      localStorage.setItem("userName", response.userName);
      localStorage.setItem("nombre", response.name);
      localStorage.setItem("rol", response.rol);

      navigate("/mascotas");
    } catch (error: unknown) {
      setError((error as Error).message);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <svg
            className="login-paw"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="#D85A30"
          >
            <ellipse cx="12" cy="15.5" rx="5.2" ry="4.3" />
            <ellipse
              cx="6.2"
              cy="9.5"
              rx="2.1"
              ry="2.6"
              transform="rotate(-25 6.2 9.5)"
            />
            <ellipse
              cx="10.2"
              cy="6"
              rx="1.9"
              ry="2.4"
              transform="rotate(-8 10.2 6)"
            />
            <ellipse
              cx="14.3"
              cy="6"
              rx="1.9"
              ry="2.4"
              transform="rotate(8 14.3 6)"
            />
            <ellipse
              cx="18"
              cy="9.5"
              rx="2.1"
              ry="2.6"
              transform="rotate(25 18 9.5)"
            />
          </svg>
          <h1 className="login-title">Huellitas</h1>
          <p className="login-subtitle">Inicia sesión para continuar</p>
        </div>

        <form onSubmit={iniciarSesion} className="login-form">
          <div className="login-field">
            <svg
              className="login-field-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <input
              type="text"
              placeholder="Usuario"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={disabled}
              className={`login-input ${userName === "" && error !== "" ? "error" : ""}`}
            />
          </div>

          <div className="login-field">
            <svg
              className="login-field-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={disabled}
              className={`login-input ${password === "" && error !== "" ? "error" : ""}`}
            />
          </div>

          <p className="login-error" aria-live="polite">
            {error || " "}
          </p>

          <button disabled={disabled} type="submit" className="login-button">
            {disabled ? (
              <>
                <CircularProgress size={18} color="inherit" />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar sesión"
            )}
          </button>
        </form>

        <div className="login-link-row">
          <span>¿No tienes cuenta?</span>
          <button type="button" className="login-link-button" onClick={() => navigate("/register")}>
            Regístrate
          </button>
        </div>
      </div>
    </div>
  );
}
