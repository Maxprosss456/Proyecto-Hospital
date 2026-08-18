import React from 'react';
import './CMDetalles.css';

const CMDetalles = ({ onBack, hospital = {} }) => {
  return (
    <div className="cm-detalles-container">
      {/* Barra superior verde con botón de retroceso y título */}
      <header className="cm-detalles-header">
        <button className="btn-back" onClick={onBack}>
          &lt;
        </button>
        <h2 className="header-title">
          {hospital.nombre ? `CENTRO MÉDICO ${hospital.nombre}` : 'CENTRO MÉDICO N1'}
        </h2>
      </header>

      {/* Sección superior: Datos e Imagen del hospital */}
      <div className="cm-info-section">
        <div className="cm-text-details">
          <h3>{hospital.nombre || 'NOMBRE'}</h3>
          <ul>
            <li>• PROVINCIA: {hospital.provincia || 'PROVINCIA'}</li>
            <li>• LOCALIDAD: {hospital.localidad || 'LOCALIDAD'}</li>
            <li>• CODIGO POSTAL: {hospital.codpostal || 'CODIGO POSTAL'}</li>
            <li>• DIRECCIÓN: {hospital.direccion || 'DIRECCIÓN'}</li>
          </ul>
        </div>
        <div className="cm-image-box">
          <img 
            src={hospital.logo || '/hospital_logo.ico'} 
            alt="Hospital" 
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      </div>

      {/* Cuadrícula de tarjetas de navegación/secciones */}
      <div className="cm-grid">
        <div className="cm-card green">CUERPO MÉDICO</div>
        <div className="cm-card green">CUERPO NO MÉDICO</div>
        <div className="cm-card green">MAQUINARIA</div>
        <div className="cm-card green">MEDICAMENTOS</div>
        <div className="cm-card green">HERRAMIENTAS</div>
        <div className="cm-card gray">PACIENTES</div>
        <div className="cm-card green">TRATAMIENTOS</div>
        <div className="cm-card green">INFORMES</div>
      </div>
    </div>
  );
};

export default CMDetalles;