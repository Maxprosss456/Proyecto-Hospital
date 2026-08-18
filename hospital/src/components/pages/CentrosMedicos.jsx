import React, { useState, useEffect } from 'react';
import './CentrosMedicos.css';

const CentrosMedicos = ({ onBack }) => {
  const [hospitales, setHospitales] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ejemplo de consumo de API/Backend
  useEffect(() => {
    const fetchHospitales = async () => {
      try {
        const response = await fetch('/api/hospitales');
        const data = await response.json();
        setHospitales(data);
      } catch (error) {
        console.error('Error al obtener hospitales:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitales();
  }, []);

  return (
    <div className="centros-medicos-container">
      {/* Barra superior */}
      <header className="centros-header">
        <button className="btn-back" onClick={onBack}>
          &lt;
        </button>
        <h2 className="header-title">CENTROS MÉDICOS</h2>
      </header>

      {/* Lista dinámicamente mapeada desde la base de datos */}
      <div className="centros-list">
        {loading ? (
          <p>Cargando centros médicos...</p>
        ) : hospitales.length === 0 ? (
          <p>No se encontraron hospitales registrados.</p>
        ) : (
          hospitales.map((hospital, index) => (
            <div className="hospital-card" key={hospital.id}>
              <div className="hospital-info">
                <h3>HOSPITAL N°{index + 1}</h3>
                <ul>
                  <li>• NOMBRE: {hospital.nombre}</li>
                  <li>• TELÉFONO: {hospital.telefono}</li>
                  <li>• EMAIL: {hospital.email}</li>
                  <li>• CÓDIGO POSTAL: {hospital.codpostal}</li>
                  {hospital.direccion && <li>• DIRECCIÓN: {hospital.direccion}</li>}
                </ul>
              </div>
              <div className={`hospital-image-box ${index % 2 !== 0 ? 'red-filter' : ''}`}>
                {hospital.logo ? (
                  <img src={hospital.logo} alt={hospital.nombre} />
                ) : (
                  <span>IMAGEN HOSPITAL {index + 1}</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CentrosMedicos;