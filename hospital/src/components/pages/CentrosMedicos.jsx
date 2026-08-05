import React from 'react';
import './CentrosMedicos.css';

const CentrosMedicos = ({ onBack }) => {
  return (
    <div className="centros-medicos-container">
      {/* Barra superior verde */}
      <header className="centros-header">
        <button className="btn-back" onClick={onBack}>
          &lt;
        </button>
        <h2 className="header-title">CENTROS MÉDICOS</h2>
      </header>

      {/* Lista de tarjetas con contenido fijo */}
      <div className="centros-list">

        {/* --- TARJETA 1 --- */}
        <div className="hospital-card">
          <div className="hospital-info">
            <h3>HOSPITAL N1</h3>
            <ul>
              <li>• NOMBRE</li>
              <li>• PROVINCIA</li>
              <li>• LOCALIDAD</li>
              <li>• CODIGO POSTAL</li>
              <li>• DIRECCIÓN</li>
            </ul>
          </div>
          <div className="hospital-image-box">
            <span>IMAGEN HOSPITAL 1</span>
          </div>
        </div>

        {/* --- TARJETA 2 --- */}
        <div className="hospital-card">
          <div className="hospital-info">
            <h3>HOSPITAL N2</h3>
            <ul>
              <li>• NOMBRE</li>
              <li>• PROVINCIA</li>
              <li>• LOCALIDAD</li>
              <li>• CODIGO POSTAL</li>
              <li>• DIRECCIÓN</li>
            </ul>
          </div>
          <div className="hospital-image-box red-filter">
            <span>IMAGEN HOSPITAL 2</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CentrosMedicos;