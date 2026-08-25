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

  // Extraer datos usando los nombres reales de la tabla "hospitales"
  const getCentroId = (c) => c?.id || c?.id_hospital;
  const getCentroNombre = (c) => c?.nombre || 'Hospital sin nombre';
  const getCentroCP = (c) => c?.codpostal ?? c?.codigoPostal ?? 'N/A';
  const getCentroTel = (c) => c?.telefono ?? 'N/A';
  const getCentroEmail = (c) => c?.email ?? 'N/A';

  const getMedicoId = (m) => m?.id || m?.id_medico;
  const getMedicoNombre = (m) => m?.nombre || m?.nombre_completo || 'Médico';
  const getMedicoCargo = (m) => m?.cargo || 'Médico';
  const getSancionDetalle = (s) => s?.sancion || s?.descripcion || 'Sanción registrada';

  useEffect(() => {
    const fetchCentros = async () => {
      setLoading(true);
      setError(null);
      console.log('--- Buscando Hospitales ---');
      try {
        // Consultamos /hospitales por el nombre exacto de la tabla en Supabase
        let respuesta = await fetch(`${BASE_API_URL}/hospitales`);
        
        // Fallback a /centros si la API backend mapea /centros en vez de /hospitales
        if (!respuesta.ok) {
          console.warn('Ruta /api/hospitales dio status:', respuesta.status, 'Probando /api/centros...');
          respuesta = await fetch(`${BASE_API_URL}/centros`);
        }

        if (!respuesta.ok) {
          throw new Error(`Error en el servidor backend: Status ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        console.log('Respuesta cruda del backend:', datos);

        // Desenvolver datos según como responda el servidor (Array directo, { data: [...] }, etc.)
        let listaHospitales = [];
        if (Array.isArray(datos)) {
          listaHospitales = datos;
        } else if (datos && Array.isArray(datos.data)) {
          listaHospitales = datos.data;
        } else if (datos && Array.isArray(datos.hospitales)) {
          listaHospitales = datos.hospitales;
        } else if (datos && Array.isArray(datos.centros)) {
          listaHospitales = datos.centros;
        }

        console.log('Lista procesada final:', listaHospitales);
        setCentros(listaHospitales);
      } catch (err) {
        console.error('Error al solicitar la lista de hospitales:', err);
        setError('No se pudieron cargar los centros médicos. Verifique la consola (F12).');
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

    const centroId = getCentroId(centro);
    console.log('Cargando médicos del hospital ID:', centroId);

    try {
      const respuesta = await fetch(`${BASE_API_URL}/hospitales/${centroId}/medicos`);
      if (respuesta.ok) {
        const datosMedicos = await respuesta.json();
        const listaMedicos = Array.isArray(datosMedicos) ? datosMedicos : (datosMedicos.data || []);
        console.log('Médicos obtenidos:', listaMedicos);
        setMedicos(listaMedicos);
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

    const medicoId = getMedicoId(medico);
    console.log('Cargando sanciones del médico ID:', medicoId);

    try {
      const respuesta = await fetch(`${BASE_API_URL}/medicos/${medicoId}/sanciones`);
      if (respuesta.ok) {
        const datosSanciones = await respuesta.json();
        const listaSanciones = Array.isArray(datosSanciones) ? datosSanciones : (datosSanciones.data || []);
        console.log('Sanciones obtenidas:', listaSanciones);
        setSanciones(listaSanciones);
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
          {centros.map((centro, index) => {
            const id = getCentroId(centro) || index;
            const nombre = getCentroNombre(centro);
            const cp = getCentroCP(centro);
            const telefono = getCentroTel(centro);
            const email = getCentroEmail(centro);

            return (
              <div
                key={id}
                style={styles.card}
                onClick={() => irADetalleCentro(centro)}
              >
                <div style={styles.cardTitle}>{nombre}</div>
                <div style={styles.cardField}>
                  <span style={styles.label}>Código Postal:</span> {cp}
                </div>
                <div style={styles.cardField}>
                  <span style={styles.label}>Teléfono:</span> {telefono}
                </div>
                <div style={styles.cardField}>
                  <span style={styles.label}>Email:</span> {email}
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
          <h2 style={styles.headerTitle}>{getCentroNombre(centroSeleccionado)}</h2>
          <div style={{ width: '40px' }}></div>
        </div>
        <div>
          <p><span style={styles.label}>Código Postal:</span> {getCentroCP(centroSeleccionado)}</p>
          <p><span style={styles.label}>Teléfono:</span> {getCentroTel(centroSeleccionado)}</p>
          <p><span style={styles.label}>Email:</span> {getCentroEmail(centroSeleccionado)}</p>
        </div>
        <h3 style={{ marginTop: '20px' }}>Cuerpo Médico</h3>
        {loadingDetalle ? (
          <div style={styles.loading}>Cargando médicos...</div>
        ) : medicos.length === 0 ? (
          <div style={styles.noData}>Este centro no tiene médicos cargados.</div>
        ) : (
          medicos.map((medico, idx) => (
            <div
              key={getMedicoId(medico) || idx}
              style={styles.doctorCard}
              onClick={() => irADetalleMedico(medico)}
            >
              <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{getMedicoNombre(medico)}</div>
              <div>{getMedicoCargo(medico)}</div>
            </div>
          ))
        )}
      </>
    );
  };

  const renderDetalleMedico = () => {
    if (!medicoSeleccionado) return null;
    return (
      <>
        <div style={styles.header}>
          <button style={styles.backButton} onClick={() => irADetalleCentro(centroSeleccionado)}>←</button>
          <h2 style={styles.headerTitle}>{getMedicoNombre(medicoSeleccionado)}</h2>
          <div style={{ width: '40px' }}></div>
        </div>
        <div style={styles.detailSection}>
          <div style={styles.detailRow}><span style={styles.label}>Cargo:</span> {getMedicoCargo(medicoSeleccionado)}</div>
          <div style={styles.detailRow}><span style={styles.label}>DNI:</span> {medicoSeleccionado.dni ?? 'N/A'}</div>
          <div style={styles.detailRow}><span style={styles.label}>Teléfono:</span> {medicoSeleccionado.telefono ?? 'N/A'}</div>
          <div style={styles.detailRow}><span style={styles.label}>Email:</span> {medicoSeleccionado.email ?? 'N/A'}</div>
        </div>
        <div style={{ marginTop: '20px' }}>
          <h4>Sanciones</h4>
          {loadingDetalle ? (
            <div style={styles.loading}>Cargando sanciones...</div>
          ) : sanciones.length === 0 ? (
            <p>No hay sanciones registradas.</p>
          ) : (
            sanciones.map((sancion, idx) => (
              <div key={idx} style={styles.sanctionBox}>
                <div>{getSancionDetalle(sancion)}</div>
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
            {getSancionDetalle(sancionSeleccionada)}
          </div>
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