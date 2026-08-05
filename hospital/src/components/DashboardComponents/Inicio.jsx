import React from 'react';
import { styles } from '../ComponentsStyles';
import CentrosMedicos from '../pages/CentrosMedicos';

const Inicio = ({ usuario, rangoActual, setSubSeccion }) => {
  return (
    <div style={styles.contenedorTarjetas}>
      {/* Tarjeta 1 - Centros Médicos: Visible para todos */}
      <button 
        style={styles.tarjetaBoton}
        onClick={() => setSubSeccion('centros Médicos')}
      >
        Centros Médicos
      </button>

      {/* Tarjeta 2 - Situaciones Urgentes: Protegida por rol */}
      {['Médico', 'Enfermero', 'Director Médico', 'Admin'].includes(rangoActual) && (
        <button 
          style={styles.tarjetaBoton} 
          onClick={() => setSubSeccion('urgencias')} 
        >
          Situaciones Urgentes
        </button>
      )}
    </div>
  );
};

export default Inicio;