import React from 'react';
import './CentrosMedicos.css'; // O importa el archivo de estilos donde manejes tu CSS

const CentrosMedicos = ({ onBack }) => {
  // Datos de ejemplo para renderizar las tarjetas dinámicamente
  const hospitales = [
    {
      id: 1,
      titulo: 'HOSPITAL N1',
      nombre: 'Hospital Central',
      provincia: 'Buenos Aires',
      localidad: 'Capital Federal',
      codigoPostal: 'C1000',
      direccion: 'Av. Corrientes 1234',
      imagen: 'https://via.placeholder.com/250x150' // Reemplazar por tu imagen o import
    },
    {
      id: 2,
      titulo: 'HOSPITAL N2',
      nombre: 'Hospital de San Martín',
      provincia: 'Buenos Aires',
      localidad: 'San Martín',
      codigoPostal: 'B1650',
      direccion: 'Calle 55 N° 4321',
      imagen: 'https://via.placeholder.com/250x150'
    }
  ];

  return (
    <div className="centros-medicos-container">
      {/* Encabezado Superior con Botón de Regreso y Título */}
      <header className="centros-header">
        <button className="btn-back" onClick={onBack}>
          &lt;
        </button>
        <h2 className="header-title">CENTROS MÉDICOS</h2>
      </header>

      {/* Contenedor Principal de Tarjetas */}
      <div className="centros-list">
        {hospitales.map((hospital) => (
          <div key={hospital.id} className="hospital-card">
            <div className="hospital-info">
              <h3>{hospital.titulo}</h3>
              <ul>
                <li><strong>NOMBRE:</strong> {hospital.nombre}</li>
                <li><strong>PROVINCIA:</strong> {hospital.provincia}</li>
                <li><strong>LOCALIDAD:</strong> {hospital.localidad}</li>
                <li><strong>CODIGO POSTAL:</strong> {hospital.codigoPostal}</li>
                <li><strong>DIRECCIÓN:</strong> {hospital.direccion}</li>
              </ul>
            </div>
            
            <div className="hospital-image-container">
              <img 
                src={hospital.imagen} 
                alt={hospital.nombre} 
                className="hospital-image" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CentrosMedicos;