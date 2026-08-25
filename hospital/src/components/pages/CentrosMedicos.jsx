import React, { useState, useEffect } from 'react';

const styles = {
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
  sanctionActions: {
    marginTop: '20px',
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
  noData: {
    textAlign: 'center',
    padding: '30px',
    color: '#777',
  },
};

const BASE_API_URL = 'http://localhost:5000/api';

const CentrosMedicos = () => {
  const [centros, setCentros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDetalle, setLoadingDetalle] = useState(false);
  const [error, setError] = useState(null);

  const [vista, setVista] = useState('lista'); 
  const [centroSeleccionado, setCentroSeleccionado] = useState(null);
  const [medicos, setMedicos] = useState([]);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);
  const [sanciones, setSanciones] = useState([]);
  const [sancionSeleccionada, setSancionSeleccionada] = useState(null);

  // Cargar lista general de centros médicos
  useEffect(() => {
    const fetchCentros = async () => {
      setLoading(true);
      setError(null);
      try {
        const respuesta = await fetch(`${BASE_API_URL}/centros`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!respuesta.ok) {
          throw new Error(`Error del servidor: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        setCentros(datos);
      } catch (err) {
        console.error('Error al cargar centros médicos:', err);
        setError('No se pudieron cargar los centros médicos. Intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchCentros();
  }, []);

  const irALista = () => {
    setVista('lista');
    setCentroSeleccionado(null);
    setMedicos([]);
    setMedicoSeleccionado(null);
    setSanciones([]);
    setSancionSeleccionada(null);
  };

  const irADetalleCentro = async (centro) => {
    setCentroSeleccionado(centro);
    setVista('detalleCentro');
    setLoadingDetalle(true);
    try {
      const respuesta = await fetch(`${BASE_API_URL}/centros/${centro.id}/medicos`);
      if (respuesta.ok) {
        const datosMedicos = await respuesta.json();
        setMedicos(datosMedicos);
      } else {
        setMedicos(centro.medicos || []);
      }
    } catch (err) {
      console.error('Error al obtener médicos:', err);
      setMedicos(centro.medicos || []);
    } finally {
      setLoadingDetalle(false);
    }
  };

  const irADetalleMedico = async (medico) => {
    setMedicoSeleccionado(medico);
    setVista('detalleMedico');
    setLoadingDetalle(true);
    try {
      const respuesta = await fetch(`${BASE_API_URL}/medicos/${medico.id}/sanciones`);
      if (respuesta.ok) {
        const datosSanciones = await respuesta.json();
        setSanciones(datosSanciones);
      } else {
        setSanciones(medico.sanciones || []);
      }
    } catch (err) {
      console.error('Error al obtener sanciones:', err);
      setSanciones(medico.sanciones || []);
    } finally {
      setLoadingDetalle(false);
    }
  };

  const irADetalleSancion = (sancion) => {
    setSancionSeleccionada(sancion);
    setVista('detalleSancion');
  };

  const renderLista = () => (
    <>
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>Centros Médicos</h2>
      </div>
      {centros.length === 0 ? (
        <div style={styles.noData}>No hay centros médicos cargados.</div>
      ) : (
        <div style={styles.cardGrid}>
          {centros.map((centro) => {
            const id = centro.id || centro.Id;
            const nombre = centro.nombre || centro.Nombre;
            const cp = centro.codigoPostal || centro.CodigoPostal || centro.cp;
            const telefono = centro.telefono || centro.Telefono;
            const email = centro.email || centro.Email;

            return (
              <div
                key={id}
                style={styles.card}
                onClick={() => irADetalleCentro({ ...centro, id, nombre })}
              >
                <div style={styles.cardTitle}>{nombre}</div>
                <div style={styles.cardField}>
                  <span style={styles.label}>Código Postal:</span> {cp ?? 'N/A'}
                </div>
                <div style={styles.cardField}>
                  <span style={styles.label}>Teléfono:</span> {telefono ?? 'N/A'}
                </div>
                <div style={styles.cardField}>
                  <span style={styles.label}>Email:</span> {email ?? 'N/A'}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );

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
          <p>
            <span style={styles.label}>Código Postal:</span>{' '}
            {centroSeleccionado.codigoPostal || centroSeleccionado.CodigoPostal || 'N/A'}
          </p>
          <p>
            <span style={styles.label}>Teléfono:</span>{' '}
            {centroSeleccionado.telefono || centroSeleccionado.Telefono || 'N/A'}
          </p>
          <p>
            <span style={styles.label}>Email:</span>{' '}
            {centroSeleccionado.email || centroSeleccionado.Email || 'N/A'}
          </p>
        </div>
        <h3 style={{ marginTop: '20px' }}>Cuerpo Médico</h3>
        {loadingDetalle ? (
          <div style={styles.loading}>Cargando médicos...</div>
        ) : medicos.length === 0 ? (
          <div style={styles.noData}>Este centro no tiene médicos cargados.</div>
        ) : (
          medicos.map((medico) => {
            const medId = medico.id || medico.Id;
            const medNombre = medico.nombre || medico.Nombre;
            const medCargo = medico.cargo || medico.Cargo || 'Médico';
            const medSanciones = medico.sanciones || medico.Sanciones || [];

            return (
              <div
                key={medId}
                style={styles.doctorCard}
                onClick={() => irADetalleMedico({ ...medico, id: medId, nombre: medNombre, cargo: medCargo })}
              >
                <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{medNombre}</div>
                <div>{medCargo}</div>
                {medSanciones.length > 0 && (
                  <div style={{ color: '#e74c3c', fontSize: '13px', marginTop: '5px' }}>
                    {medSanciones.length} sanción(es) registrada(s)
                  </div>
                )}
              </div>
            );
          })
        )}
      </>
    );
  };

  const renderDetalleMedico = () => {
    if (!medicoSeleccionado) return null;
    const medico = medicoSeleccionado;
    const dni = medico.dni || medico.Dni;
    const antiguedad = medico.antiguedad || medico.Antiguedad;
    const telefono = medico.telefono || medico.Telefono;
    const email = medico.email || medico.Email;
    const direccion = medico.direccion || medico.Direccion;
    const titulos = medico.titulos || medico.Titulos;

    return (
      <>
        <div style={styles.header}>
          <button style={styles.backButton} onClick={() => irADetalleCentro(centroSeleccionado)}>←</button>
          <h2 style={styles.headerTitle}>{medico.nombre}</h2>
          <div style={{ width: '40px' }}></div>
        </div>
        <div style={styles.detailSection}>
          <div style={styles.detailRow}><span style={styles.label}>Cargo:</span> {medico.cargo}</div>
          <div style={styles.detailRow}><span style={styles.label}>DNI:</span> {dni ?? 'N/A'}</div>
          <div style={styles.detailRow}><span style={styles.label}>Antigüedad:</span> {antiguedad ?? 0} años</div>
          <div style={styles.detailRow}><span style={styles.label}>Teléfono:</span> {telefono ?? 'N/A'}</div>
          <div style={styles.detailRow}><span style={styles.label}>Email:</span> {email ?? 'N/A'}</div>
          <div style={styles.detailRow}><span style={styles.label}>Dirección:</span> {direccion ?? 'N/A'}</div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Títulos:</span>{' '}
            {titulos && titulos.length > 0 ? (Array.isArray(titulos) ? titulos.join(', ') : titulos) : 'Sin títulos cargados'}
          </div>
        </div>
        <div style={{ marginTop: '20px' }}>
          <h4>Sanciones</h4>
          {loadingDetalle ? (
            <div style={styles.loading}>Cargando sanciones...</div>
          ) : sanciones.length === 0 ? (
            <p>No hay sanciones registradas.</p>
          ) : (
            sanciones.map((sancion, idx) => {
              const sancionId = sancion.id || sancion.Id || idx;
              const detalleSancion = sancion.sancion || sancion.Sancion || sancion.descripcion || 'Sanción registrada';

              return (
                <div key={sancionId} style={styles.sanctionBox}>
                  <div>{detalleSancion}</div>
                  <button
                    style={{ ...styles.button, marginTop: '10px' }}
                    onClick={() => irADetalleSancion({ ...sancion, sancion: detalleSancion })}
                  >
                    Ver detalles de sanción
                  </button>
                </div>
              );
            })
          )}
        </div>
        <div style={{ marginTop: '20px' }}>
          <button style={styles.button} onClick={() => alert('Funcionalidad en desarrollo.')}>Cambiar cargo</button>
          <button style={{ ...styles.button, ...styles.buttonDanger }} onClick={() => alert('Funcionalidad en desarrollo.')}>Dar de baja</button>
        </div>
      </>
    );
  };

  const renderDetalleSancion = () => {
    if (!sancionSeleccionada) return null;
    return (
      <>
        <div style={styles.header}>
          <button style={styles.backButton} onClick={() => irADetalleMedico(medicoSeleccionado)}>←</button>
          <h2 style={styles.headerTitle}>Detalle de sanción</h2>
          <div style={{ width: '40px' }}></div>
        </div>
        <div>
          <div style={styles.detailRow}><span style={styles.label}>Sanción:</span></div>
          <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', marginTop: '5px' }}>
            {sancionSeleccionada.sancion}
          </div>
        </div>
        <div style={styles.sanctionActions}>
          <h4>Acciones disponibles</h4>
          <button style={styles.button} onClick={() => alert('Funcionalidad en desarrollo.')}>Actualizar sanción</button>
          <button style={{ ...styles.button, ...styles.buttonSuccess }} onClick={() => alert('Funcionalidad en desarrollo.')}>Levantar sanción</button>
        </div>
      </>
    );
  };

  const renderContent = () => {
    if (loading) return <div style={styles.loading}>Cargando centros médicos...</div>;
    if (error) return <div style={styles.error}>{error}</div>;

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

  return <div>{renderContent()}</div>;
};

export default CentrosMedicos;