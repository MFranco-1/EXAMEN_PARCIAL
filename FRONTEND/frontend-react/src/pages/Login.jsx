import { useState } from "react";

function Login({ onLoginCorrecto }) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje("");

    try {
      const respuesta = await fetch("https://tendencias-import.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contrasena }),
      });
      const datos = await respuesta.json();

      if (datos.success) {
        onLoginCorrecto(usuario);
      } else {
        setMensaje("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-root">

      {/* ── Panel izquierdo: formulario ── */}
      <div className="login-panel">
        <div className="login-form-wrapper">

          <div className="login-logo-area">
            <img src="/logo.png" alt="Tendencias Import" className="login-logo" />
          </div>

          <h1 className="login-title">Bienvenido</h1>
          <p className="login-subtitle">Ingresa tus credenciales para continuar</p>

          <form onSubmit={iniciarSesion} className="login-form">

            <div className="input-group">
              <label htmlFor="usuario">Usuario</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <input
                  id="usuario"
                  type="text"
                  placeholder="Ingresa tu usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="contrasena">Contraseña</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  id="contrasena"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  required
                />
              </div>
            </div>

            {mensaje && (
              <div className="login-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {mensaje}
              </div>
            )}

            <button type="submit" className="login-btn" disabled={cargando}>
              {cargando ? (
                <span className="btn-loading">
                  <span className="spinner" />
                  Ingresando...
                </span>
              ) : "Ingresar al sistema"}
            </button>

          </form>

          <p className="login-footer">© 2025 Tendencias Import · Perú</p>
        </div>
      </div>

      {/* ── Panel derecho: imagen de marca ── */}
      <div className="login-brand">
        <div className="brand-overlay" />
        <div className="brand-content">
          <div className="brand-badge">Nueva colección</div>
          <h2 className="brand-headline">Moda que <br />enamora</h2>
          <p className="brand-tagline">Las mejores pacas y prendas importadas, directo a ti.</p>
          <div className="brand-dots">
            <span className="dot active" />
            <span className="dot" />
            <span className="dot" />
          </div>
        </div>
      </div>

    </div>
  );
}

export default Login;