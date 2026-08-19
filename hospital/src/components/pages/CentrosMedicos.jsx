import React, { useState, useEffect } from 'react';

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
  loading: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
    color: '#555',
  },
  error: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
    color: '#e74c3c',
  },
};

const CentrosMedicos = () => {
  // Estado para los datos
  const [hospitales, setHospitales] = useState([]);
  const [posiciones, setPosiciones] = useState([]); // Para obtener nombre de cargo
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado de navegación
  const [vista, setVista] = useState('lista'); // 'lista', 'detalleCentro', 'detalleMedico', 'detalleSancion'
  const [centroSeleccionado, setCentroSeleccionado] = useState(null);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);
  const [sancionSeleccionada, setSancionSeleccionada] = useState(null);

  // Cargar datos al montar el componente
  useEffect(() => {
    // El compañero debe reemplazar esta URL con la ruta real de la API
    // que devuelva los hospitales con sus médicos, sanciones y posiciones.
    // Se espera un objeto con las claves: hospitales, posiciones (opcional)
    // y cada hospital debe tener una lista de médicos (usuarios) con sus sanciones.
    const fetchData = async () => {
      try {
        // Simulación de datos según la estructura de la BD
        // En producción, reemplazar con fetch(URL_API)
        const mockData = {
          hospitales: [
            {
              id: 1,
              nombre: 'Hospital N1',
              telefono: '221-1234567',
              email: 'contacto@hospital1.com',
              codpostal: 1900,
              logo: '/hospital_logo.ico',
              medicos: [
                {
                  id: 101,
                  usuario: 'jperez',
                  nombre: 'Juan',
                  apellido: 'Pérez',
                  posicion: 3, // ID de posición (ej: Ginecólogo)
                  dni: 12345678,
                  antiguedad: 5,
                  telefono: '221-1111111',
                  email: 'jperez@hospital1.com',
                  direccion: 'Calle 1 N° 123',
                  sanciones: [
                    {
                      id: 201,
                      id_sancionado: 'jperez',
                      sancion: 'El profesional incurrió en demoras reiteradas en la carga de informes médicos, afectando la continuidad asistencial. Sanción: suspensión por 30 días.',
                    },
                  ],
                },
                {
                  id: 102,
                  usuario: 'mrodriguez',
                  nombre: 'Manuel',
                  apellido: 'Rodríguez',
                  posicion: 2, // Ej: Cirujano
                  dni: 87654321,
                  antiguedad: 3,
                  telefono: '221-2222222',
                  email: 'mrodriguez@hospital1.com',
                  direccion: 'Calle 2 N° 456',
                  sanciones: [],
                },
              ],
            },
            {
              id: 2,
              nombre: 'Hospital N2',
              telefono: '351-1234567',
              email: 'contacto@hospital2.com',
              codpostal: 5000,
              logo: '/hospital_logo.ico',
              medicos: [
                {
                  id: 201,
                  usuario: 'lfernandez',
                  nombre: 'Laura',
                  apellido: 'Fernández',
                  posicion: 4, // Ej: Pediatra
                  dni: 11223344,
                  antiguedad: 4,
                  telefono: '351-1111111',
                  email: 'lfernandez@hospital2.com',
                  direccion: 'Avenida 2 N° 789',
                  sanciones: [],
                },
              ],
            },
          ],
          posiciones: [
            { id: 1, posicion: 'Director' },
            { id: 2, posicion: 'Cirujano' },
            { id: 3, posicion: 'Ginecólogo' },
            { id: 4, posicion: 'Pediatra' },
          ],
        };

        // Simular tiempo de carga
        await new Promise((resolve) => setTimeout(resolve, 500));
        setHospitales(mockData.hospitales);
        setPosiciones(mockData.posiciones);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar los datos:', err);
        setError('No se pudieron cargar los centros médicos. Intente nuevamente.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Funciones de navegación
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

  // Obtener nombre de posición a partir del ID
  const getPosicionNombre = (posicionId) => {
    const pos = posiciones.find((p) => p.id === posicionId);
    return pos ? pos.posicion : 'Cargo no especificado';
  };

  // Renderizar lista de centros
  const renderLista = () => (
    <>
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>Centros Médicos</h2>
      </div>
      <div style={styles.cardGrid}>
        {hospitales.map((centro) => (
          <div
            key={centro.id}
            style={styles.card}
            onClick={() => irADetalleCentro(centro)}
          >
            <div style={styles.cardTitle}>{centro.nombre}</div>
            <div style={styles.cardField}>
              <span style={styles.label}>Teléfono:</span> {centro.telefono}
            </div>
            <div style={styles.cardField}>
              <span style={styles.label}>Email:</span> {centro.email}
            </div>
            <div style={styles.cardField}>
              <span style={styles.label}>Código Postal:</span> {centro.codpostal}
            </div>
          </div>
        ))}
      </div>
    </>
  );

  // Renderizar detalle de centro (lista de médicos)
  const renderDetalleCentro = () => {
    if (!centroSeleccionado) return null;
    const { medicos = [], ...centro } = centroSeleccionado;
    return (
      <>
        <div style={styles.header}>
          <button style={styles.backButton} onClick={irALista}>←</button>
          <h2 style={styles.headerTitle}>{centro.nombre}</h2>
          <div style={{ width: '40px' }}></div>
        </div>
        <div>
          <p>
            <span style={styles.label}>Teléfono:</span> {centro.telefono}
          </p>
          <p>
            <span style={styles.label}>Email:</span> {centro.email}
          </p>
          <p>
            <span style={styles.label}>Código Postal:</span> {centro.codpostal}
          </p>
        </div>
        <h3 style={{ marginTop: '20px' }}>Cuerpo Médico</h3>
        {medicos.length === 0 ? (
          <p>No hay médicos registrados en este centro.</p>
        ) : (
          medicos.map((medico) => (
            <div
              key={medico.id}
              style={styles.doctorCard}
              onClick={() => irADetalleMedico(medico)}
            >
              <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
                {medico.nombre} {medico.apellido}
              </div>
              <div>{getPosicionNombre(medico.posicion)}</div>
              <div style={{ color: '#555' }}>{medico.email}</div>
            </div>
          ))
        )}
      </>
    );
  };

  // Renderizar detalle de médico (página 9)
  const renderDetalleMedico = () => {
    if (!medicoSeleccionado) return null;
    const medico = medicoSeleccionado;
    // Obtener sanciones del médico
    const sanciones = medico.sanciones || [];
    return (
      <>
        <div style={styles.header}>
          <button
            style={styles.backButton}
            onClick={() => irADetalleCentro(centroSeleccionado)}
          >
            ←
          </button>
          <h2 style={styles.headerTitle}>
            {medico.nombre} {medico.apellido}
          </h2>
          <div style={{ width: '40px' }}></div>
        </div>
        <div style={styles.detailSection}>
          <div style={styles.detailRow}>
            <span style={styles.label}>Usuario:</span> {medico.usuario}
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Cargo:</span> {getPosicionNombre(medico.posicion)}
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>DNI:</span> {medico.dni}
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Antigüedad:</span> {medico.antiguedad} años
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Teléfono:</span> {medico.telefono}
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Email:</span> {medico.email}
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Dirección:</span> {medico.direccion}
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Estado actual:</span>{' '}
            {sanciones.length > 0 ? 'Sancionado' : 'Activo'}
          </div>
        </div>
        <div style={{ marginTop: '20px' }}>
          <h4>Sanciones</h4>
          {sanciones.length === 0 ? (
            <p>No hay sanciones registradas.</p>
          ) : (
            sanciones.map((sancion) => (
              <div key={sancion.id} style={styles.sanctionBox}>
                <div>
                  <span style={styles.label}>Motivo:</span> {sancion.sancion}
                </div>
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
          <button style={{ ...styles.button, ...styles.buttonDanger }}>
            Dar de baja
          </button>
        </div>
      </>
    );
  };

  // Renderizar detalle de sanción (páginas 10 y 11)
  const renderDetalleSancion = () => {
    if (!sancionSeleccionada) return null;
    const sancion = sancionSeleccionada;
    // Como la tabla solo tiene un campo de texto, mostramos el motivo completo
    // y agregamos placeholders para los campos que no existen en la BD.
    return (
      <>
        <div style={styles.header}>
          <button
            style={styles.backButton}
            onClick={() => irADetalleMedico(medicoSeleccionado)}
          >
            ←
          </button>
          <h2 style={styles.headerTitle}>Configuración de sanción</h2>
          <div style={{ width: '40px' }}></div>
        </div>
        <div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Tipo/s de sanción:</span>{' '}
            No especificado
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Duración:</span> No especificado
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Fecha de inicio:</span> No especificado
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Fecha de finalización:</span> No especificado
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Nombre del sancionado:</span>{' '}
            {medicoSeleccionado ? `${medicoSeleccionado.nombre} ${medicoSeleccionado.apellido}` : 'No disponible'}
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Cargo:</span>{' '}
            {medicoSeleccionado ? getPosicionNombre(medicoSeleccionado.posicion) : 'No disponible'}
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Sector:</span> No especificado
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Estado:</span> Activo
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Motivos de la sanción:</span>
          </div>
          <div
            style={{
              backgroundColor: '#f8f9fa',
              padding: '15px',
              borderRadius: '5px',
              marginTop: '5px',
            }}
          >
            {sancion.sancion}
          </div>
        </div>
        <div style={{ marginTop: '20px' }}>
          <h4>Acciones disponibles</h4>
          <button style={styles.button}>Actualizar informe de sanción</button>
          <button style={styles.button}>Modificar duración</button>
          <button style={{ ...styles.button, ...styles.buttonDanger }}>
            Bloquear acceso completo
          </button>
          <button style={styles.button}>Agregar observación</button>
          <button style={{ ...styles.button, ...styles.buttonSuccess }}>
            Levantar sanción
          </button>
        </div>
      </>
    );
  };

  // Renderizar contenido según vista
  const renderContent = () => {
    if (loading) {
      return <div style={styles.loading}>Cargando centros médicos...</div>;
    }
    if (error) {
      return <div style={styles.error}>{error}</div>;
    }
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
        <div style={{ ...styles.navItem, backgroundColor: '#34495e' }}>
          NORMA
        </div>
        <div style={styles.navItem}>CONFIGURACIÓN</div>
      </div>

      {/* Contenido principal */}
      <div style={styles.mainContent}>{renderContent()}</div>
    </div>
  );
};

export default CentrosMedicos;