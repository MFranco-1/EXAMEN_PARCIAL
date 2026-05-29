import { useState } from "react";
import Login from "./pages/Login";
import BuscarProducto from "./pages/BuscarProducto";
import "./App.css";

function App() {
  const [pantalla, setPantalla] = useState("login");
  const [nombreUsuario, setNombreUsuario] = useState("");

  return (
    <>
      {pantalla === "login" && (
        <Login onLoginCorrecto={(user) => { setNombreUsuario(user); setPantalla("principal"); }} />
      )}

      {pantalla === "principal" && (
        <div className="app-root">

          {/* Barra superior */}
          <header className="topbar">
            <img src="/logo.png" alt="Tendencias Import" className="topbar-logo" />
            <div className="topbar-right">
              <div className="topbar-user">
                <div className="user-avatar">TI</div>
                <span>{nombreUsuario}</span>
              </div>
              <button className="btn-salir" onClick={() => setPantalla("login")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Salir del sistema
              </button>
            </div>
          </header>

          {/* Contenido */}
          <main className="main-content">
            <div className="welcome-section">
              <h1 className="welcome-title">¡Bienvenida {nombreUsuario}!</h1>
              <p className="welcome-subtitle">Gestiona tu inventario y productos desde aquí</p>
            </div>

            <div className="modules-grid">
              {/* Tarjeta buscar producto */}
              <div className="module-card" onClick={() => setPantalla("buscar")}>
                <div className="module-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </div>
                <div className="module-info">
                  <h3>Buscar producto</h3>
                  <p>Consulta el detalle de cualquier producto por su código</p>
                </div>
                <span className="module-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </span>
              </div>

              {/* Tarjeta de estado */}
              <div className="module-card stat-card">
                <div className="module-icon stat-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 3v18h18"/>
                    <polyline points="18 9 13 14 8 9 3 14"/>
                  </svg>
                </div>
                <div className="module-info">
                  <h3>Inventario activo</h3>
                  <p>Sistema listo para consultas en tiempo real</p>
                </div>
                <span className="stat-badge">En línea</span>
              </div>
            </div>

            {/* Banner */}
            <div className="banner">
              <div className="banner-text">
                <span className="banner-tag">Tendencias Import · Perú</span>
                <p>Gestión de pacas y prendas importadas</p>
              </div>
            </div>
          </main>

        </div>
      )}

      {pantalla === "buscar" && (
        <BuscarProducto regresar={() => setPantalla("principal")} />
      )}
    </>
  );
}

export default App;