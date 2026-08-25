import React from 'react';
import { styles } from '../ComponentsStyles';
import '../Dashboard.css';

const Inicio = ({ usuario, rangoActual, setSubSeccion }) => {
  return (
    <div 
      style={styles.contenedorTarjetas} 
      className="contenedor-tarjetas-responsive"
    >
      {/* Tarjeta 1 - Centros Médicos: Visible para todos */}
      <button 
        style={styles.tarjetaBoton}
        className="tarjeta-responsive"
        onClick={() => setSubSeccion('centros médicos')}
      >
        Centros Médicos
      </button>

      {/* Tarjeta 2 - Situaciones Urgentes: Redirige a informes activando la pestaña urgentes */}
      {['Médico', 'Enfermero', 'Director Médico', 'Admin'].includes(rangoActual) && (
        <button 
          style={styles.tarjetaBoton} 
          className="tarjeta-responsive"
          onClick={() => setSubSeccion('informes:urgentes')}
        >
          Situaciones Urgentes
        </button>
      )}
    </div>
  );
};

export default Inicio;