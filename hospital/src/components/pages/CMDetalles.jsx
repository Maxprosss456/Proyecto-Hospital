import React, { useState } from 'react';
import './CMDetalles.css';

const CMDetalles = ({ onBack, hospital = {} }) => {
  // Estado para controlar qué sección está seleccionada (null = menú de cuadrícula)
  const [seccionActiva, setSeccionActiva] = useState(null);

  // Botones de la cuadrícula
  const opcionesNavegacion = [
    { id: 'cuerpo-medico', label: 'CUERPO MÉDICO', color: 'green' },
    { id: 'cuerpo-no-medico', label: 'CUERPO NO MÉDICO', color: 'green' },
    { id: 'maquinaria', label: 'MAQUINARIA', color: 'green' },
    { id: 'medicamentos', label: 'MEDICAMENTOS', color: 'green' },
    { id: 'herramientas', label: 'HERRAMIENTAS', color: 'green' },
    { id: 'pacientes', label: 'PACIENTES', color: 'gray' },
    { id: 'tratamientos', label: 'TRATAMIENTOS', color: 'green' },
    { id: 'informes', label: 'INFORMES', color: 'green' },
  ];

  // Control del botón de regreso del encabezado
  const handleHeaderBack = () => {
    if (seccionActiva) {
      setSeccionActiva(null);
    } else {
      onBack();
    }
  };

  // =========================================================================
  // RENDERIZADO DE LAS SECCIONES EN PARALELO
  // Puedes trabajar el JSX de cada sección independientemente aquí dentro:
  // =========================================================================
  const renderSeccionParalela = () => {
    switch (seccionActiva?.id) {
      case 'cuerpo-medico':
        return (
          <div className="seccion-box">
            <h3>Gestión de Cuerpo Médico</h3>
            {/* AQUÍ DESARROLLAS CUERPO MÉDICO */}
            <p>Listado de doctores, especialidades y turnos asignados a este hospital.</p>
          </div>
        );

      case 'cuerpo-no-medico':
        return (
          <div className="seccion-box">
            <h3>Cuerpo No Médico / Personal Administrativo</h3>
            {/* AQUÍ DESARROLLAS CUERPO NO MÉDICO */}
            <p>Lista del personal de administración, limpieza, mantenimiento y seguridad.</p>
          </div>
        );

      case 'maquinaria':
        return (
          <div className="seccion-box">
            <h3>Inventario de Maquinaria Equipamiento</h3>
            {/* AQUÍ DESARROLLAS MAQUINARIA */}
            <p>Resonadores, tomógrafos, ecógrafos y estado de mantenimiento del equipo.</p>
          </div>
        );

      case 'medicamentos':
        return (
          <div className="seccion-box">
            <h3>Farmacia y Medicamentos</h3>
            {/* AQUÍ DESARROLLAS MEDICAMENTOS */}
            <p>Stock de medicamentos, lote, fecha de vencimiento y disponibilidad.</p>
          </div>
        );

      case 'herramientas':
        return (
          <div className="seccion-box">
            <h3>Herramientas e Insumos Médicos</h3>
            {/* AQUÍ DESARROLLAS HERRAMIENTAS */}
            <p>Bisturís, gasas, jeringas y kit de primeros auxilios.</p>
          </div>
        );

      case 'pacientes':
        return (
          <div className="seccion-box">
            <h3>Registro de Pacientes</h3>
            {/* AQUÍ DESARROLLAS PACIENTES */}
            <p>Historiales clínicos, pacientes ingresados en sala y altas médicas.</p>
          </div>
        );

      case 'tratamientos':
        return (
          <div className="seccion-box">
            <h3>Tratamientos Activos</h3>
            {/* AQUÍ DESARROLLAS TRATAMIENTOS */}
            <p>Seguimiento de tratamientos, quimioterapias, rehabilitaciones y terapias.</p>
          </div>
        );

      case 'informes':
        return (
          <div className="seccion-box">
            <h3>Informes y Reportes</h3>
            {/* AQUÍ DESARROLLAS INFORMES */}
            <p>Reportes generados por los médicos para la dirección general del hospital.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="cm-detalles-container">
      {/* Encabezado dinámico */}
      <header className="cm-detalles-header">
        <button className="btn-back" onClick={handleHeaderBack}>
          &lt;
        </button>
        <h2 className="header-title">
          {seccionActiva 
            ? `${seccionActiva.label} - ${hospital.nombre || 'CENTRO MÉDICO N1'}`
            : hospital.nombre ? `CENTRO MÉDICO ${hospital.nombre}` : 'CENTRO MÉDICO N1'
          }
        </h2>
      </header>

      {/* Si NO hay una sección seleccionada, muestra la vista principal */}
      {!seccionActiva ? (
        <>
          <div className="cm-info-section">
            <div className="cm-text-details">
              <h3>{hospital.nombre || 'NOMBRE'}</h3>
              <ul>
                <li>• PROVINCIA: {hospital.provincia || 'PROVINCIA'}</li>
                <li>• LOCALIDAD: {hospital.localidad || 'LOCALIDAD'}</li>
                <li>• CÓDIGO POSTAL: {hospital.codpostal || 'CÓDIGO POSTAL'}</li>
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

          <div className="cm-grid">
            {opcionesNavegacion.map((opcion) => (
              <button
                key={opcion.id}
                className={`cm-card ${opcion.color}`}
                onClick={() => setSeccionActiva(opcion)}
              >
                {opcion.label}
              </button>
            ))}
          </div>
        </>
      ) : (
        /* Renderiza automáticamente el contenido que corresponda al botón presionado */
        <div className="cm-seccion-contenido">
          {renderSeccionParalela()}

          <button 
            className="btn-volver-grid" 
            onClick={() => setSeccionActiva(null)}
          >
            ← Volver a opciones
          </button>
        </div>
      )}
    </div>
  );
};

export default CMDetalles;