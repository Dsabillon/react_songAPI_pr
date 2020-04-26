import React from "react";

const Error = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1> ERROR 404</h1>
      <p>Error al buscar artista o canción</p>
      <button
        onClick={() => window.location.reload(false)}
        type="button"
        className="btn btn-secondary center text-white"
      >
        Nueva Búsqueda
      </button>
    </div>
  );
};

export default Error;
