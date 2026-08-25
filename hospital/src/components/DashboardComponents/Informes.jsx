import React, { useState, useEffect } from 'react';

// Necesario para el modo oscuro.
import { useTheme } from '../../context/ThemeContext';
// Estilos en objeto para mantener todo en un solo archivo
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f7fa',
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

const GeneradorInformes = () => {
  const [informes, setInformes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
    const { modoOscuro } = useTheme();
  // Cargar datos al montar
  useEffect(() => {
    // El compañero debe reemplazar esta URL con la ruta real de la API
    // que devuelva los informes con los datos de hospital y remitente.
    // Estructura esperada: array de objetos con:
    // { fecha, hospital: "Nombre Hospital", remitente: "Nombre Apellido", informe: "texto del informe" }
    const fetchData = async () => {
      try {
        // Simulación de datos según la estructura de la BD
        // (solo para demostración, en producción usar fetch)
        const mockData = [
          {
            fecha: '2024-05-15',
            hospital: 'Hospital N1',
            remitente: 'Ana Pérez',
            informe: 'Informe Anual de resultados del área de cirugía.',
          },
          {
            fecha: '2024-05-13',
            hospital: 'Hospital N2',
            remitente: 'Java Aliacer',
            informe: 'Reporte de incidencias en el servicio de urgencias.',
          },
          {
            fecha: '2024-05-13',
            hospital: 'Hospital N1',
            remitente: 'Jarea Maidar',
            informe: 'Actualización de protocolos de enfermería.',
          },
          {
            fecha: '2024-05-13',
            hospital: 'Hospital N3',
            remitente: 'Tana Pérez',
            informe: 'Evaluación de satisfacción de pacientes.',
          },
        ];

        // Simular tiempo de carga
        await new Promise((resolve) => setTimeout(resolve, 500));
        setInformes(mockData);
        setFiltered(mockData);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar informes:', err);
        setError('No se pudieron cargar los informes. Intente nuevamente.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrar cuando cambia el término de búsqueda
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFiltered(informes);
    } else {
      const lower = searchTerm.toLowerCase();
      const filteredData = informes.filter(
        (item) =>
          item.remitente.toLowerCase().includes(lower) ||
          item.informe.toLowerCase().includes(lower) ||
          item.hospital.toLowerCase().includes(lower)
      );
      setFiltered(filteredData);
    }
  }, [searchTerm, informes]);

  const handleView = (informe) => {
    // Acción al hacer clic en "Ver" - se puede abrir un modal o detalle
    alert(`Ver detalle del informe:\nFecha: ${informe.fecha}\nHospital: ${informe.hospital}\nRemitente: ${informe.remitente}\nInforme: ${informe.informe}`);
  };

  const handleNew = () => {
    // Acción para crear nuevo informe
    alert('Funcionalidad "Nuevo Informe" en desarrollo.');
  };


  //Creamos variables que guarde los estilos que queremos para cada parte en modo oscuro.
  const barraBusqueda = modoOscuro
    ? { backgroundColor: '#111111', color: '#ffffff' }
    : {};

  const variables = modoOscuro
    ? { backgroundColor: '#111111', color: '#ffffff' }
    : {};
  // Renderizado principal
  return (
    <div>
      {/* Contenido principal */}
        <div style={styles.header}>
          <h2 style={styles.headerTitle}>Generador de Informes</h2>
        </div>

        {/* Barra de búsqueda y botón nuevo */}
        <div style={styles.searchBar}>
          <input
            type="text"

            //Forma en la que se aplican los estilos fusionados.
            style={{ ...styles.searchInput, ...barraBusqueda}}

            
            placeholder="Buscar paciente o informe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button style={styles.newButton} onClick={handleNew}>
            Nuevo Informe +
          </button>
        </div>

        {/* Tabla de informes */}
        {loading ? (
          <div style={styles.loading}>Cargando informes...</div>
        ) : error ? (
          <div style={styles.error}>{error}</div>
        ) : filtered.length === 0 ? (
          <div style={styles.noData}>No se encontraron informes.</div>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={{...styles.th,...variables}}>Fecha</th>
                  <th style={{...styles.th,...variables}}>Hospital</th>
                  <th style={{...styles.th,...variables}}>Remitente</th>
                  <th style={{...styles.th,...variables}}>Informe</th>
                  <th style={{...styles.th,...variables}}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, index) => (
                  <tr key={index}>
                    <td style={styles.td}>{item.fecha}</td>
                    <td style={styles.td}>{item.hospital}</td>
                    <td style={styles.td}>{item.remitente}</td>
                    <td style={styles.td}>
                      {item.informe.length > 60
                        ? `${item.informe.substring(0, 60)}...`
                        : item.informe}
                    </td>
                    <td style={styles.td}>
                      <button style={styles.viewButton} onClick={() => handleView(item)}>
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
};

export default GeneradorInformes;