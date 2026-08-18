import React, { useState } from 'react';

// Estilos en objeto para mantener todo en un solo archivo
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f7fa',
  },
  sidebar: {
    width: '220px',
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sidebarTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#fff',
  },
  navItem: {
    width: '100%',
    padding: '12px 20px',
    textAlign: 'center',
    cursor: 'pointer',
    borderBottom: '1px solid #34495e',
    transition: 'background 0.2s',
  },
  navItemHover: {
    backgroundColor: '#34495e',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    backgroundColor: '#fff',
    margin: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #ecf0f1',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  headerTitle: {
    fontSize: '28px',
    fontWeight: '300',
    color: '#2c3e50',
  },
  backButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#3498db',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    transition: 'box-shadow 0.2s',
    cursor: 'pointer',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#2c3e50',
  },
  cardField: {
    margin: '5px 0',
    color: '#555',
  },
  label: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  doctorCard: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  doctorCardHover: {
    background: '#ecf0f1',
  },
  detailSection: {
    marginTop: '20px',
  },
  detailRow: {
    marginBottom: '8px',
  },
  button: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
    marginBottom: '10px',
    fontSize: '14px',
  },
  buttonDanger: {
    backgroundColor: '#e74c3c',
  },
  buttonSuccess: {
    backgroundColor: '#2ecc71',
  },
  sanctionBox: {
    backgroundColor: '#fef9e7',
    borderLeft: '4px solid #f1c40f',
    padding: '15px',
    marginTop: '15px',
    borderRadius: '4px',
  },
  sanctionActions: {
    marginTop: '20px',
  },
};

// Datos de ejemplo (simulados)
const initialData = {
  centros: [
    {
      id: 1,
      nombre: 'Hospital N1',
      provincia: 'Buenos Aires',
      localidad: 'La Plata',
      codigoPostal: '1900',
      direccion: 'Calle 1 N° 123',
      medicos: [
        {
          id: 101,
          nombre: 'Dr. Juan Pérez',
          especialidad: 'Ginecología',
          infoGeneral: 'Especialista en ginecología y obstetricia',
          pacientesACargo: 12,
          archivosTitulos: 'Diploma UBA, Especialidad en Ginecología',
          datosBiometricos: 'Huella digital registrada',
          estadoActual: 'Sancionado',
          tiempoAntiguedad: '5 años',
          tipoMedico: 'Permanente',
          historialPacientes: 'Paciente A, Paciente B, Paciente C',
          sanciones: [
            {
              id: 201,
              tipo: 'Suspensión temporal',
              duracion: '30 días',
              fechaInicio: '15/04/2026',
              fechaFinalizacion: '15/05/2026',
              nombre: 'Añejo Hernandez',
              cargo: 'Ginecólogo',
              sector: 'Ginecología',
              estado: 'Activo',
              motivo: 'El profesional incurrió en demoras reiteradas en la carga de informes médicos, afectando la continuidad asistencial.',
            },
          ],
        },
        {
          id: 102,
          nombre: 'Dr. Manuel Rodríguez',
          especialidad: 'Cirugía General',
          infoGeneral: 'Especialista en cirugía abdominal y laparoscópica',
          pacientesACargo: 8,
          archivosTitulos: 'Diploma UNLP, Residencia en Cirugía',
          datosBiometricos: 'Huella digital registrada',
          estadoActual: 'Activo',
          tiempoAntiguedad: '3 años',
          tipoMedico: 'Temporal',
          historialPacientes: 'Paciente X, Paciente Y',
          sanciones: [],
        },
      ],
    },
    {
      id: 2,
      nombre: 'Hospital N2',
      provincia: 'Córdoba',
      localidad: 'Córdoba',
      codigoPostal: '5000',
      direccion: 'Avenida 2 N° 456',
      medicos: [
        {
          id: 201,
          nombre: 'Dra. Laura Fernández',
          especialidad: 'Pediatría',
          infoGeneral: 'Especialista en pediatría y neonatología',
          pacientesACargo: 15,
          archivosTitulos: 'Diploma UNC, Especialidad en Pediatría',
          datosBiometricos: 'Huella digital registrada',
          estadoActual: 'Activo',
          tiempoAntiguedad: '4 años',
          tipoMedico: 'Permanente',
          historialPacientes: 'Paciente M, Paciente N',
          sanciones: [],
        },
      ],
    },
  ],
};

const CentrosMedicos = () => {
  const [data] = useState(initialData);
  const [vista, setVista] = useState('lista'); // 'lista', 'detalleCentro', 'detalleMedico', 'detalleSancion'
  const [centroSeleccionado, setCentroSeleccionado] = useState(null);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);
  const [sancionSeleccionada, setSancionSeleccionada] = useState(null);

  // Navegación
  const irALista = () => {
    setVista('lista');
    setCentroSeleccionado(null);
    setMedicoSeleccionado(null);
    setSancionSeleccionada(null);
  };

  const irADetalleCentro = (centro) => {
    setCentroSeleccionado(centro);
    setVista('detalleCentro');
  };

  const irADetalleMedico = (medico) => {
    setMedicoSeleccionado(medico);
    setVista('detalleMedico');
  };

  const irADetalleSancion = (sancion) => {
    setSancionSeleccionada(sancion);
    setVista('detalleSancion');
  };

  // Renderizar lista de centros
  const renderLista = () => (
    <>
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>Centros Médicos</h2>
      </div>
      <div style={styles.cardGrid}>
        {data.centros.map((centro) => (
          <div
            key={centro.id}
            style={styles.card}
            onClick={() => irADetalleCentro(centro)}
          >
            <div style={styles.cardTitle}>{centro.nombre}</div>
            <div style={styles.cardField}><span style={styles.label}>Provincia:</span> {centro.provincia}</div>
            <div style={styles.cardField}><span style={styles.label}>Localidad:</span> {centro.localidad}</div>
            <div style={styles.cardField}><span style={styles.label}>Código Postal:</span> {centro.codigoPostal}</div>
            <div style={styles.cardField}><span style={styles.label}>Dirección:</span> {centro.direccion}</div>
          </div>
        ))}
      </div>
    </>
  );

  // Renderizar detalle de centro (lista de médicos)
  const renderDetalleCentro = () => {
    if (!centroSeleccionado) return null;
    return (
      <>
        <div style={styles.header}>
          <button style={styles.backButton} onClick={irALista}>←</button>
          <h2 style={styles.headerTitle}>{centroSeleccionado.nombre}</h2>
          <div style={{ width: '40px' }}></div>
        </div>
        <div>
          <p><span style={styles.label}>Provincia:</span> {centroSeleccionado.provincia}</p>
          <p><span style={styles.label}>Localidad:</span> {centroSeleccionado.localidad}</p>
          <p><span style={styles.label}>Código Postal:</span> {centroSeleccionado.codigoPostal}</p>
          <p><span style={styles.label}>Dirección:</span> {centroSeleccionado.direccion}</p>
        </div>
        <h3 style={{ marginTop: '20px' }}>Cuerpo Médico</h3>
        {centroSeleccionado.medicos.map((medico) => (
          <div
            key={medico.id}
            style={styles.doctorCard}
            onClick={() => irADetalleMedico(medico)}
          >
            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{medico.nombre}</div>
            <div>{medico.especialidad}</div>
            <div style={{ color: '#555' }}>{medico.infoGeneral}</div>
          </div>
        ))}
      </>
    );
  };

  // Renderizar detalle de médico (página 9)
  const renderDetalleMedico = () => {
    if (!medicoSeleccionado) return null;
    const medico = medicoSeleccionado;
    return (
      <>
        <div style={styles.header}>
          <button style={styles.backButton} onClick={() => irADetalleCentro(centroSeleccionado)}>←</button>
          <h2 style={styles.headerTitle}>{medico.nombre}</h2>
          <div style={{ width: '40px' }}></div>
        </div>
        <div style={styles.detailSection}>
          <div style={styles.detailRow}><span style={styles.label}>Especialidad:</span> {medico.especialidad}</div>
          <div style={styles.detailRow}><span style={styles.label}>Información General:</span> {medico.infoGeneral}</div>
          <div style={styles.detailRow}><span style={styles.label}>Pacientes a cargo:</span> {medico.pacientesACargo}</div>
          <div style={styles.detailRow}><span style={styles.label}>Archivos y documentación de títulos:</span> {medico.archivosTitulos}</div>
          <div style={styles.detailRow}><span style={styles.label}>Datos biométricos:</span> {medico.datosBiometricos}</div>
          <div style={styles.detailRow}><span style={styles.label}>Estado actual:</span> {medico.estadoActual}</div>
          <div style={styles.detailRow}><span style={styles.label}>Tiempo de antigüedad:</span> {medico.tiempoAntiguedad}</div>
          <div style={styles.detailRow}><span style={styles.label}>Tipo de médico:</span> {medico.tipoMedico}</div>
          <div style={styles.detailRow}><span style={styles.label}>Historial de pacientes:</span> {medico.historialPacientes}</div>
        </div>
        <div style={{ marginTop: '20px' }}>
          <h4>Sanciones</h4>
          {medico.sanciones.length === 0 ? (
            <p>No hay sanciones registradas.</p>
          ) : (
            medico.sanciones.map((sancion) => (
              <div key={sancion.id} style={styles.sanctionBox}>
                <div><span style={styles.label}>Tipo:</span> {sancion.tipo}</div>
                <div><span style={styles.label}>Duración:</span> {sancion.duracion}</div>
                <div><span style={styles.label}>Fecha de inicio:</span> {sancion.fechaInicio}</div>
                <div><span style={styles.label}>Fecha de finalización:</span> {sancion.fechaFinalizacion}</div>
                <div><span style={styles.label}>Estado:</span> {sancion.estado}</div>
                <button
                  style={{ ...styles.button, marginTop: '10px' }}
                  onClick={() => irADetalleSancion(sancion)}
                >
                  Ver detalles de sanción
                </button>
              </div>
            ))
          )}
        </div>
        <div style={{ marginTop: '20px' }}>
          <button style={styles.button}>Cambiar cargo</button>
          <button style={styles.button}>Asignar paciente</button>
          <button style={styles.button}>Desasignar paciente</button>
          <button style={{ ...styles.button, ...styles.buttonDanger }}>Dar de baja</button>
        </div>
      </>
    );
  };

  // Renderizar detalle de sanción (páginas 10 y 11)
  const renderDetalleSancion = () => {
    if (!sancionSeleccionada) return null;
    const sancion = sancionSeleccionada;
    return (
      <>
        <div style={styles.header}>
          <button style={styles.backButton} onClick={() => irADetalleMedico(medicoSeleccionado)}>←</button>
          <h2 style={styles.headerTitle}>Configuración de sanción</h2>
          <div style={{ width: '40px' }}></div>
        </div>
        <div>
          <div style={styles.detailRow}><span style={styles.label}>Tipo/s de sanción:</span> {sancion.tipo}</div>
          <div style={styles.detailRow}><span style={styles.label}>Duración:</span> {sancion.duracion}</div>
          <div style={styles.detailRow}><span style={styles.label}>Fecha de inicio:</span> {sancion.fechaInicio}</div>
          <div style={styles.detailRow}><span style={styles.label}>Fecha de finalización:</span> {sancion.fechaFinalizacion}</div>
          <div style={styles.detailRow}><span style={styles.label}>Nombre:</span> {sancion.nombre}</div>
          <div style={styles.detailRow}><span style={styles.label}>Cargo:</span> {sancion.cargo}</div>
          <div style={styles.detailRow}><span style={styles.label}>Sector:</span> {sancion.sector}</div>
          <div style={styles.detailRow}><span style={styles.label}>Estado:</span> {sancion.estado}</div>
          <div style={styles.detailRow}><span style={styles.label}>Motivos de la sanción:</span></div>
          <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', marginTop: '5px' }}>
            {sancion.motivo}
          </div>
        </div>
        <div style={styles.sanctionActions}>
          <h4>Acciones disponibles</h4>
          <button style={styles.button}>Actualizar informe de sanción</button>
          <button style={styles.button}>Modificar duración</button>
          <button style={{ ...styles.button, ...styles.buttonDanger }}>Bloquear acceso completo</button>
          <button style={styles.button}>Agregar observación</button>
          <button style={{ ...styles.button, ...styles.buttonSuccess }}>Levantar sanción</button>
        </div>
      </>
    );
  };

  // Renderizar contenido según vista
  const renderContent = () => {
    switch (vista) {
      case 'lista':
        return renderLista();
      case 'detalleCentro':
        return renderDetalleCentro();
      case 'detalleMedico':
        return renderDetalleMedico();
      case 'detalleSancion':
        return renderDetalleSancion();
      default:
        return renderLista();
    }
  };

  return (
    <div style={styles.container}>
      {/* Barra lateral */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarTitle}>Hospital</div>
        <div style={styles.navItem}>INICIO</div>
        <div style={styles.navItem}>INFORMES</div>
        <div style={{ ...styles.navItem, backgroundColor: '#34495e' }}>NORMA</div>
        <div style={styles.navItem}>CONFIGURACIÓN</div>
      </div>

      {/* Contenido principal */}
      <div style={styles.mainContent}>
        {renderContent()}
      </div>
    </div>
  );
};

export default CentrosMedicos;