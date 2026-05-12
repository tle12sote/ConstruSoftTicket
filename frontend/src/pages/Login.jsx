import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/authService";
import "../styles/Login.css";

const SLIDES = [
  {
    image: "https://upla.edu.pe/web/wp-content/uploads/2025/07/10-INGRESOCAMP-scaled-2560x1280-1-1024x512-1.webp",
    caption: "Campus UPLA",
    sub: "Universidad Peruana Los Andes"
  },
  {
    image: "https://upla.edu.pe/web/wp-content/uploads/2025/09/DSC02384.webp",
    caption: "Formación de Excelencia",
    sub: "Comprometidos con tu futuro profesional"
  },
  {
    image: "https://www.sigc.gestorinfo.upla.edu.pe/storage/per/logo.png",
    caption: "Soporte Técnico",
    sub: "Sistema integral de gestión universitaria"
  }
];

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [slide, setSlide] = useState(0);
  const [fading, setFading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setSlide((prev) => (prev + 1) % SLIDES.length);
        setFading(false);
      }, 500);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index) => {
    if (index === slide) return;
    setFading(true);
    setTimeout(() => {
      setSlide(index);
      setFading(false);
    }, 500);
  };

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        await login({ email, password });
        navigate("/tickets");
      } else {
        await register({ email, password });
        setIsLogin(true);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      {/* ── Panel izquierdo con carrusel ── */}
      <div className="auth-left">
        <div
          className={`carousel-bg ${fading ? "fade-out" : "fade-in"}`}
          style={{ backgroundImage: `url(${SLIDES[slide].image})` }}
        />
        <div className="auth-overlay">
          <div className="brand-content">
            <span className="logo-badge">UPLA</span>
            <h1>REALIZADO POR</h1>
            <p>STUARH STEVEN PEÑA SANCHEZ</p>
          </div>

          <div className={`carousel-caption ${fading ? "fade-out" : "fade-in"}`}>
            <p className="carousel-title">{SLIDES[slide].caption}</p>
            <p className="carousel-sub">{SLIDES[slide].sub}</p>
          </div>

          <div className="carousel-dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === slide ? "active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Panel derecho: formulario ── */}
      <div className="auth-right">
        <div className="auth-form-box">
          <div className="form-header">
            <h2>{isLogin ? "Bienvenido de nuevo" : "Crea tu cuenta"}</h2>
            <p>
              {isLogin
                ? "Ingresa tus credenciales para continuar"
                : "Regístrate para acceder al sistema universitario"}
            </p>
          </div>

          <div className="input-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              placeholder="ejemplo@upla.edu.pe"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="auth-btn" onClick={handleSubmit}>
            {isLogin ? "Ingresar al Sistema" : "Completar Registro"}
          </button>

          <div className="auth-footer">
            <p>
              {isLogin ? "¿Eres nuevo aquí?" : "¿Ya eres parte?"}{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="switch-link"
              >
                {isLogin ? "Regístrate ahora" : "Inicia sesión"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
