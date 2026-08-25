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
  tabsContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  tabButton: (active) => ({
    padding: '10px 20px',
    borderRadius: '20px',
    border: active ? 'none' : '1px solid #ccc',
    backgroundColor: active ? '#3498db' : '#f8f9fa',
    color: active ? '#fff' : '#555',
    fontWeight: active ? 'bold' : 'normal',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }),
  searchBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    gap: '10px',
    flexWrap: 'wrap',
  },
  searchInput: {
    flex: 1,
    minWidth: '200px',
    padding: '10px 15px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  newButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    whiteSpace: 'nowrap',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
  th: {
    backgroundColor: '#f2f2f2',
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
    fontWeight: 'bold',
  },
  td: {
    padding: '12px 15px',
    borderBottom: '1px solid #eee',
    verticalAlign: 'middle',
  },
  viewButton: {
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    padding: '5px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  badgeUrgente: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '3px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'inline-block',
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

const API_INFORMES = 'http://localhost:5000/api/informes';
const API_URGENCIAS = 'http://localhost:5000/api/urgencias';

const Informes = () => {
  const [subseccion, setSubseccion] = useState('generales'); // 'generales' | 'urgentes'
  const [datos, setDatos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const formatDate = (dateString) => {
    if (!dateString) return 'Sin fecha';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleDateString('es-ES');
  };

  // Cargar datos según la pestaña activa
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const endpoint = subseccion === 'generales' ? API_INFORMES : API_URGENCIAS;

      try {
        const respuesta = await fetch(endpoint, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!respuesta.ok) {
          throw new Error(`Error del servidor: ${respuesta.status}`);
        }

        const data = await respuesta.json();
        setDatos(data);
        setFiltered(data);
      } catch (err) {
        console.error(`Error al cargar ${subseccion}:`, err);
        setError(`No se pudieron cargar los registros. Intente nuevamente.`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subseccion]);

  // Filtrado reactivo en tiempo real
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFiltered(datos);
    } else {
      const lower = searchTerm.toLowerCase();
      const filteredData = datos.filter((item) => {
        const remitente = (item.remitente || item.Remitente || '').toLowerCase();
        const contenido = (item.informe || item.Informe || '').toLowerCase();
        const hospital = (item.hospital || item.Hospital_Nombre || '').toLowerCase();
        return remitente.includes(lower) || contenido.includes(lower) || hospital.includes(lower);
      });
      setFiltered(filteredData);
    }
  }, [searchTerm, datos]);

  const handleView = (item) => {
    const fecha = formatDate(item.fecha);
    const hospital = item.hospital || item.Hospital_Nombre;
    const remitente = item.remitente || item.Remitente;
    const contenido = item.informe || item.Informe;

    alert(
      `Detalle (${subseccion === 'generales' ? 'Informe General' : 'Situación Urgente'}):\n\n` +
      `Fecha: ${fecha}\n` +
      `Hospital: ${hospital}\n` +
      `Remitente: ${remitente}\n\n` +
      `Detalle:\n${contenido}`
    );
  };

  return (
    <div>
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>Informes & Urgencias</h2>
      </div>

      {/* Pestañas de Navegación */}
      <div style={styles.tabsContainer}>
        <button
          style={styles.tabButton(subseccion === 'generales')}
          onClick={() => { setSubseccion('generales'); setSearchTerm(''); }}
        >
          Informes Generales
        </button>
        <button
          style={styles.tabButton(subseccion === 'urgentes')}
          onClick={() => { setSubseccion('urgentes'); setSearchTerm(''); }}
        >
          Situaciones Urgentes
        </button>
      </div>

      <div style={styles.searchBar}>
        <input
          type="text"
          style={styles.searchInput}
          placeholder={`Buscar en ${subseccion === 'generales' ? 'informes' : 'urgencias'}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button style={styles.newButton} onClick={() => alert('Funcionalidad en desarrollo.')}>
          {subseccion === 'generales' ? 'Nuevo Informe +' : 'Nueva Urgencia +'}
        </button>
      </div>

      {loading ? (
        <div style={styles.loading}>Cargando datos...</div>
      ) : error ? (
        <div style={styles.error}>{error}</div>
      ) : filtered.length === 0 ? (
        <div style={styles.noData}>No se encontraron registros en esta sección.</div>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Fecha</th>
                <th style={styles.th}>Hospital</th>
                <th style={styles.th}>Remitente</th>
                <th style={styles.th}>
                  {subseccion === 'generales' ? 'Informe' : 'Situación Urgente'}
                </th>
                <th style={styles.th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => {
                const id = item.id || item.Id || index;
                const fecha = item.fecha;
                const hospital = item.hospital || item.Hospital_Nombre || 'Desconocido';
                const remitente = item.remitente || item.Remitente || 'Desconocido';
                const contenido = item.informe || item.Informe || '';

                return (
                  <tr key={id}>
                    <td style={styles.td}>{formatDate(fecha)}</td>
                    <td style={styles.td}>{hospital}</td>
                    <td style={styles.td}>{remitente}</td>
                    <td style={styles.td}>
                      {subseccion === 'urgentes' && (
                        <span style={styles.badgeUrgente}>URGENTE</span>
                      )}{' '}
                      {contenido.length > 60 ? `${contenido.substring(0, 60)}...` : contenido}
                    </td>
                    <td style={styles.td}>
                      <button style={styles.viewButton} onClick={() => handleView(item)}>
                        Ver
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Informes;