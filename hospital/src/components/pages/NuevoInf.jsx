import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext'; // Ajusta la ruta a tu context si cambia según la estructura

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
  formContainer: {
    maxWidth: '700px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  group: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#34495e',
  },
  input: {
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '15px',
  },
  textarea: {
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '15px',
    minHeight: '150px',
    resize: 'vertical',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
    marginTop: '25px',
  },
  cancelButton: {
    backgroundColor: '#95a5a6',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  submitButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '10px 25px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

const API_HOSPITALES = 'http://localhost:5000/api/hospitales';
const API_INFORMES = 'http://localhost:5000/api/informes';
const API_URGENCIAS = 'http://localhost:5000/api/urgencias';

const NuevoInf = ({ tipo = 'generales', usuario, onVolver }) => {
  const [hospitales, setHospitales] = useState([]);
  const [idHospital, setIdHospital] = useState('');
  const [contenido, setContenido] = useState('');
  const [cargando, setCargando] = useState(false);
  const { modoOscuro } = useTheme();

  useEffect(() => {
    // Cargar la lista de hospitales para el select
    const fetchHospitales = async () => {
      try {
        const res = await fetch(API_HOSPITALES);
        if (res.ok) {
          const data = await res.json();
          setHospitales(data);
        }
      } catch (err) {
        console.error('Error al cargar hospitales:', err);
      }
    };
    fetchHospitales();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contenido.trim()) {
      alert('Por favor complete el campo de texto.');
      return;
    }

    setCargando(true);
    const esGeneral = tipo === 'generales';
    const endpoint = esGeneral ? API_INFORMES : API_URGENCIAS;

    // Obtener objeto usuario desde props o desde localStorage
    const usuarioSesion = usuario || JSON.parse(localStorage.getItem('usuario') || '{}');
    
    // Obtener id válido del remitente
    const remitenteId = usuarioSesion.id || usuarioSesion.id_usuario || 1;

    const bodyData = esGeneral
      ? {
          id_hospital: idHospital ? parseInt(idHospital, 10) : null,
          id_remitente: parseInt(remitenteId, 10),
          informe: contenido,
        }
      : {
          id_hospital: idHospital ? parseInt(idHospital, 10) : null,
          id_remitente: parseInt(remitenteId, 10),
          situacion: contenido,
        };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(esGeneral ? '¡Informe creado con éxito!' : '¡Urgencia registrada con éxito!');
        if (onVolver) onVolver();
      } else {
        alert(`Error: ${data.error || 'No se pudo guardar el registro.'}`);
      }
    } catch (err) {
      console.error('Error enviando datos:', err);
      alert('Error al procesar la solicitud.');
    } finally {
      setCargando(false);
    }
  };

  // Estilos adaptados al modo oscuro
  const contenedorEstilo = modoOscuro
    ? { ...styles.formContainer, backgroundColor: '#1a1a1a', border: '1px solid #333' }
    : styles.formContainer;

  const inputEstilo = modoOscuro
    ? { ...styles.input, backgroundColor: '#111111', color: '#ffffff', borderColor: '#444' }
    : styles.input;

  const textareaEstilo = modoOscuro
    ? { ...styles.textarea, backgroundColor: '#111111', color: '#ffffff', borderColor: '#444' }
    : styles.textarea;

  const labelEstilo = modoOscuro
    ? { ...styles.label, color: '#ecf0f1' }
    : styles.label;

  const esGeneral = tipo === 'generales';

  return (
    <div>
      <div style={styles.header}>
        <h2 style={{ ...styles.headerTitle, color: modoOscuro ? '#fff' : '#2c3e50' }}>
          {esGeneral ? 'Nuevo Informe General' : 'Nueva Situación Urgente'}
        </h2>
      </div>

      <div style={contenedorEstilo}>
        <form onSubmit={handleSubmit}>
          <div style={styles.group}>
            <label style={labelEstilo}>Hospital / Centro Médico</label>
            <select
              style={inputEstilo}
              value={idHospital}
              onChange={(e) => setIdHospital(e.target.value)}
            >
              <option value="">-- Seleccione un Hospital --</option>
              {hospitales.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.nombre}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.group}>
            <label style={labelEstilo}>
              {esGeneral ? 'Detalle del Informe' : 'Descripción de la Situación Urgente'}
            </label>
            <textarea
              style={textareaEstilo}
              placeholder={esGeneral ? 'Escriba el informe detallado...' : 'Describa la urgencia...'}
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              required
            />
          </div>

          <div style={styles.buttonGroup}>
            <button
              type="button"
              style={styles.cancelButton}
              onClick={onVolver}
              disabled={cargando}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{
                ...styles.submitButton,
                backgroundColor: esGeneral ? '#3498db' : '#e74c3c',
              }}
              disabled={cargando}
            >
              {cargando ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevoInf;