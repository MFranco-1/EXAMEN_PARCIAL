import { useState } from "react";

function BuscarProducto({ regresar }) {
  const [codigo, setCodigo] = useState("");
  const [producto, setProducto] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const buscarProducto = async (e) => {
    e.preventDefault();
    setCargando(true);
    setProducto(null);
    setMensaje("");

    try {
      const respuesta = await fetch(`http://127.0.0.1:5000/producto/${codigo}`);
      const datos = await respuesta.json();

      if (datos.success) {
        setProducto(datos.producto);
      } else {
        setMensaje("No se encontró ningún producto con ese código.");
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor Flask.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="app-root">

      {/* Barra superior */}
      <header className="topbar">
        <img src="/logo.png" alt="Tendencias Import" className="topbar-logo" />
        <button className="btn-regresar" onClick={regresar}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Regresar
        </button>
      </header>

      {/* Contenido */}
      <main className="buscar-content">

        <div className="buscar-header">
          <h1 className="buscar-title">Buscar producto</h1>
          <p className="buscar-subtitle">Ingresa el código del producto para ver su información</p>
        </div>

        {/* Buscador */}
        <div className="search-box">
          <form onSubmit={buscarProducto} className="search-form">
            <div className="search-input-wrapper">
              <span className="search-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Ej: P001, P002..."
                value={codigo}
                onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                required
              />
            </div>
            <button type="submit" className="btn-buscar" disabled={cargando}>
              {cargando ? (
                <><span className="spinner-sm" /> Buscando...</>
              ) : "Buscar"}
            </button>
          </form>
        </div>

        {/* Error */}
        {mensaje && (
          <div className="buscar-error">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {mensaje}
          </div>
        )}

        {/* Resultado */}
        {producto && (
          <div className="producto-card">
            <div className="producto-card-header">
              <div className="producto-badge">{producto.codigo}</div>
              <h2 className="producto-nombre">{producto.nombre}</h2>
              {producto.categoria && (
                <span className="producto-categoria">{producto.categoria}</span>
              )}
            </div>

            <div className="producto-divider" />

            <div className="producto-grid">
              <div className="producto-field">
                <span className="field-label">
                  
                  Precio
                </span>
                <span className="field-value precio">S/ {producto.precio}</span>
              </div>

              {producto.stock !== undefined && (
                <div className="producto-field">
                  <span className="field-label">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    </svg>
                    Stock
                  </span>
                  <span className="field-value">{producto.stock} pacas</span>
                </div>
              )}

              {producto.proveedor && (
                <div className="producto-field">
                  <span className="field-label">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    Proveedor
                  </span>
                  <span className="field-value">{producto.proveedor}</span>
                </div>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default BuscarProducto;