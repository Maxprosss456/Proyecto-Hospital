import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './CentrosMedicos.css';

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

  const { modoOscuro } = useTheme();

  // Helper Getters
  const getCentroId = (c) => c?.id || c?.id_hospital;
  const getCentroNombre = (c) => c?.nombre || 'Hospital sin nombre';
  const getCentroCP = (c) => c?.codpostal ?? c?.codigoPostal ?? 'N/A';
  const getCentroTel = (c) => c?.telefono ?? 'N/A';
  const getCentroEmail = (c) => c?.email ?? 'N/A';
  const getCentroLogo = (c) => c?.logo || '/hospital_logo.ico';

  const getMedicoId = (m) => m?.id || m?.id_medico;
  const getMedicoNombre = (m) => m?.nombre || m?.nombre_completo || 'Médico';
  const getMedicoCargo = (m) => m?.cargo || 'Médico';
  const getSancionDetalle = (s) => s?.sancion || s?.descripcion || 'Sanción registrada';

  // === Lógica de fetch (idéntica a la original) ===
  useEffect(() => {
    const fetchCentros = async () => {
      setLoading(true);
      setError(null);
      try {
        let respuesta = await fetch(`${BASE_API_URL}/hospitales`);
        if (!respuesta.ok) {
          respuesta = await fetch(`${BASE_API_URL}/centros`);
        }
        if (!respuesta.ok) {
          throw new Error(`Error en el servidor backend: Status ${respuesta.status}`);
        }
        const datos = await respuesta.json();
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
    try {
      const respuesta = await fetch(`${BASE_API_URL}/hospitales/${centroId}/medicos`);
      if (respuesta.ok) {
        const datosMedicos = await respuesta.json();
        const listaMedicos = Array.isArray(datosMedicos) ? datosMedicos : (datosMedicos.data || []);
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
    try {
      const respuesta = await fetch(`${BASE_API_URL}/medicos/${medicoId}/sanciones`);
      if (respuesta.ok) {
        const datosSanciones = await respuesta.json();
        const listaSanciones = Array.isArray(datosSanciones) ? datosSanciones : (datosSanciones.data || []);
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

  // === Tokens de color según tema (fix del bug de textos invisibles) ===
  const t = modoOscuro
    ? {
        cardBg: '#242c33', cardBorder: '#333e46',
        textPrimary: '#eef2f4', textSecondary: '#9fb0b8',
        headerBorder: '#333e46', accent: '#38c793', accentSoft: '#1c332a',
        doctorCardBg: '#2b343b', doctorCardBorder: '#3a454d',
        sanctionBg: '#3a331a', sanctionBorder: '#caa53d', danger: '#ff6b5e',
      }
    : {
        cardBg: '#ffffff', cardBorder: '#e2e6ea',
        textPrimary: '#1c2b34', textSecondary: '#5b6b74',
        headerBorder: '#e2e6ea', accent: '#0f7a5c', accentSoft: '#eaf7f1',
        doctorCardBg: '#f8fafb', doctorCardBorder: '#e2e6ea',
        sanctionBg: '#fff8e6', sanctionBorder: '#f0c419', danger: '#c0392b',
      };

  const styles = {
    header: {
      display: 'flex', alignItems: 'center', gap: '12px',
      borderBottom: `2px solid ${t.headerBorder}`,
      paddingBottom: '14px', marginBottom: '22px',
    },
    headerTitle: { fontSize: '26px', fontWeight: 600, color: t.textPrimary, margin: 0 },
    backButton: {
      background: 'none', border: `1.5px solid ${t.cardBorder}`, borderRadius: '8px',
      width: '36px', height: '36px', fontSize: '18px', cursor: 'pointer',
      color: t.accent, flexShrink: 0,
    },
    cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
    card: {
      backgroundColor: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: '12px',
      padding: '22px', cursor: 'pointer',
      boxShadow: modoOscuro ? '0 2px 10px rgba(0,0,0,0.35)' : '0 2px 10px rgba(15,40,50,0.06)',
    },
    cardHeader: { display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' },
    logoImg: {
      width: '46px', height: '46px', objectFit: 'contain', borderRadius: '50%',
      border: `2px solid ${t.cardBorder}`, backgroundColor: '#fff', padding: '2px', flexShrink: 0,
    },
    cardTitle: { fontSize: '18px', fontWeight: 700, color: t.textPrimary, margin: 0 },
    cardField: { margin: '6px 0', color: t.textSecondary, fontSize: '14px' },
    label: { fontWeight: 600, color: t.textPrimary },
    sectionTitle: { fontSize: '17px', fontWeight: 700, color: t.textPrimary, marginTop: '24px', marginBottom: '12px' },
    doctorCard: {
      backgroundColor: t.doctorCardBg, border: `1px solid ${t.doctorCardBorder}`,
      borderRadius: '10px', padding: '16px', marginBottom: '12px', cursor: 'pointer',
    },
    doctorNombre: { fontWeight: 700, fontSize: '16px', color: t.textPrimary },
    badgeCargo: {
      display: 'inline-block', marginTop: '6px', padding: '3px 10px', borderRadius: '20px',
      fontSize: '12px', fontWeight: 600, backgroundColor: t.accentSoft, color: t.accent,
    },
    detailSection: { marginTop: '20px' },
    detailRow: { marginBottom: '10px', color: t.textSecondary, fontSize: '15px' },
    button: {
      backgroundColor: t.accent, color: '#fff', border: 'none', padding: '10px 20px',
      borderRadius: '8px', cursor: 'pointer', marginRight: '10px', marginBottom: '10px',
      fontSize: '14px', fontWeight: 600,
    },
    sanctionBox: {
      backgroundColor: t.sanctionBg, borderLeft: `4px solid ${t.sanctionBorder}`,
      padding: '16px', marginTop: '15px', borderRadius: '8px', color: t.textPrimary,
    },
    loading: { textAlign: 'center', padding: '50px', fontSize: '17px', color: t.textSecondary },
    error: { textAlign: 'center', padding: '50px', fontSize: '17px', color: t.danger },
    noData: { textAlign: 'center', padding: '30px', color: t.textSecondary },
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
            const logo = getCentroLogo(centro);

            return (
              <div key={id} className="cm-card" style={styles.card} onClick={() => irADetalleCentro(centro)}>
                <div style={styles.cardHeader}>
                  <img
                    src={logo}
                    alt={`Logo de ${nombre}`}
                    style={styles.logoImg}
                    onError={(e) => { e.target.src = '/hospital_logo.ico'; }}
                  />
                  <div style={styles.cardTitle}>{nombre}</div>
                </div>
                <div style={styles.cardField}><span style={styles.label}>Código Postal:</span> {cp}</div>
                <div style={styles.cardField}><span style={styles.label}>Teléfono:</span> {telefono}</div>
                <div style={styles.cardField}><span style={styles.label}>Email:</span> {email}</div>
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
          <button className="cm-back-btn" style={styles.backButton} onClick={irALista}>←</button>
          <img
            src={getCentroLogo(centroSeleccionado)}
            alt="Logo"
            style={{ ...styles.logoImg, width: '38px', height: '38px' }}
            onError={(e) => { e.target.src = '/hospital_logo.ico'; }}
          />
          <h2 style={styles.headerTitle}>{getCentroNombre(centroSeleccionado)}</h2>
        </div>
        <div>
          <p style={styles.detailRow}><span style={styles.label}>Código Postal:</span> {getCentroCP(centroSeleccionado)}</p>
          <p style={styles.detailRow}><span style={styles.label}>Teléfono:</span> {getCentroTel(centroSeleccionado)}</p>
          <p style={styles.detailRow}><span style={styles.label}>Email:</span> {getCentroEmail(centroSeleccionado)}</p>
        </div>
        <h3 style={styles.sectionTitle}>Cuerpo Médico</h3>
        {loadingDetalle ? (
          <div style={styles.loading}>Cargando médicos...</div>
        ) : medicos.length === 0 ? (
          <div style={styles.noData}>Este centro no tiene médicos cargados.</div>
        ) : (
          medicos.map((medico, idx) => (
            <div key={getMedicoId(medico) || idx} className="cm-doctor-card" style={styles.doctorCard} onClick={() => irADetalleMedico(medico)}>
              <div style={styles.doctorNombre}>{getMedicoNombre(medico)}</div>
              <span style={styles.badgeCargo}>{getMedicoCargo(medico)}</span>
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
          <button className="cm-back-btn" style={styles.backButton} onClick={() => irADetalleCentro(centroSeleccionado)}>←</button>
          <h2 style={styles.headerTitle}>{getMedicoNombre(medicoSeleccionado)}</h2>
        </div>
        <div style={styles.detailSection}>
          <div style={styles.detailRow}><span style={styles.label}>Cargo:</span> {getMedicoCargo(medicoSeleccionado)}</div>
          <div style={styles.detailRow}><span style={styles.label}>DNI:</span> {medicoSeleccionado.dni ?? 'N/A'}</div>
          <div style={styles.detailRow}><span style={styles.label}>Teléfono:</span> {medicoSeleccionado.telefono ?? 'N/A'}</div>
          <div style={styles.detailRow}><span style={styles.label}>Email:</span> {medicoSeleccionado.email ?? 'N/A'}</div>
        </div>
        <div>
          <h3 style={styles.sectionTitle}>Sanciones</h3>
          {loadingDetalle ? (
            <div style={styles.loading}>Cargando sanciones...</div>
          ) : sanciones.length === 0 ? (
            <p style={{ color: t.textSecondary }}>No hay sanciones registradas.</p>
          ) : (
            sanciones.map((sancion, idx) => (
              <div key={idx} style={styles.sanctionBox}>
                <div>{getSancionDetalle(sancion)}</div>
                <button style={{ ...styles.button, marginTop: '12px' }} onClick={() => irADetalleSancion(sancion)}>
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
          <button className="cm-back-btn" style={styles.backButton} onClick={() => irADetalleMedico(medicoSeleccionado)}>←</button>
          <h2 style={styles.headerTitle}>Detalle de sanción</h2>
        </div>
        <div>
          <div style={styles.detailRow}><span style={styles.label}>Sanción:</span></div>
          <div style={styles.sanctionBox}>{getSancionDetalle(sancionSeleccionada)}</div>
        </div>
      </>
    );
  };

  const renderContent = () => {
    if (loading) return <div style={styles.loading}>Cargando centros médicos...</div>;
    if (error) return <div style={styles.error}>{error}</div>;
    switch (vista) {
      case 'lista': return renderLista();
      case 'detalleCentro': return renderDetalleCentro();
      case 'detalleMedico': return renderDetalleMedico();
      case 'detalleSancion': return renderDetalleSancion();
      default: return renderLista();
    }
  };

  return <div>{renderContent()}</div>;
};

export default CentrosMedicos;