import React, { useState, useEffect } from 'react';
import { styles } from '../ComponentsStyles';

const Informes = () => {
  const [listaUrgencias, setListaUrgencias] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/urgencias')
      .then((res) => {
        if (!res.ok) throw new Error('Error en la respuesta del servidor');
        return res.json();
      })
      .then((data) => {
        setListaUrgencias(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error('Error cargando urgencias:', err);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
        Cargando informes de urgencia...
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', color: '#333' }}>
      {listaUrgencias.map((item) => (
        <div key={item.Id} style={styles.tarjetaAlerta}>
          <h2 style={styles.tituloAlertaText}>{item.Titulo}</h2>
          <ul style={styles.listaDetallesAlerta}>
            <li><strong>HOSPITAL:</strong> {item.Hospital_Nombre}</li>
            <li><strong>UBICACIÓN:</strong> {item.Ubicacion}</li>
            <li><strong>INFORME:</strong> {item.Informe}</li>
            <li><strong>REMITENTE:</strong> {item.Remitente}</li>
          </ul>
        </div>
      ))}

      {listaUrgencias.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666' }}>
          No hay situaciones urgentes reportadas.
        </p>
      )}
    </div>
  );
};

export default Informes;