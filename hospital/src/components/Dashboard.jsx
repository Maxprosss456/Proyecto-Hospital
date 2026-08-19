import React, { useState } from 'react';
import { styles } from './ComponentsStyles'; 
import Inicio from './DashboardComponents/Inicio';
import Informes from './DashboardComponents/Informes';
import Norma from './DashboardComponents/Norma';
import Configuracion from './DashboardComponents/Configuracion';

const Dashboard = ({ usuario, alCerrarSesion }) => {
  const [subSeccion, setSubSeccion] = useState('inicio');

  const rangoActual = usuario?.rango || 'sin_rango';

  return (
    
    <div style={styles.contenedorPrincipal}>
      {/* barra lateral */}
      <aside style={styles.sidebar}>
        <div style={styles.bloqueSuperiorMarca}>
          <div style={styles.contenedorLogo}>
            <img src={usuario.logo} alt="Logo Hospital" style={styles.logo} />
          </div>
          <h1 style={styles.textoHospital}>{usuario.hospital}</h1>
        </div>
        
        <nav style={styles.menuNav}>
          <div 
            style={subSeccion === 'inicio' ? styles.enlaceActivo : styles.enlaceMenu} 
            onClick={() => setSubSeccion('inicio')}
          >
            INICIO
          </div>
          
          {['Médico', 'Enfermero', 'Director Médico', 'Admin'].includes(rangoActual) && (
            <div 
              style={subSeccion === 'urgencias' ? styles.enlaceActivo : styles.enlaceMenu} 
              onClick={() => setSubSeccion('urgencias')}
            >
              INFORMES
            </div>
          )}
          
          {['Admin', 'Director Médico'].includes(rangoActual) && (
            <div 
              style={subSeccion === 'norma' ? styles.enlaceActivo : styles.enlaceMenu} 
              onClick={() => setSubSeccion('norma')}
            >
              NORMA
            </div>
          )}
          
          {['Admin', 'Director Médico'].includes(rangoActual) && (
            <div 
              style={subSeccion === 'configuracion' ? styles.enlaceActivo : styles.enlaceMenu} 
              onClick={() => setSubSeccion('configuracion')}
            >
              CONFIGURACIÓN
            </div>
          )}
        </nav>

        <button onClick={alCerrarSesion} style={styles.botonSalir}>
          Cerrar Sesión
        </button>
      </aside>




      {/* parte central */}
      <main style={styles.areaContenido}>
        
        {subSeccion !== 'inicio' && (
          <button style={styles.botonVolver} onClick={() => setSubSeccion('inicio')}>
            ⤺
          </button>  
        )}

        
          
          {/* COLOCAR SECCIONES AQUI */}

          {subSeccion === 'inicio' && (
            <Inicio usuario={usuario} rangoActual={rangoActual} setSubSeccion={setSubSeccion} />
          )}

          {subSeccion === 'urgencias' && <Informes />}

          {subSeccion === 'norma' && <Norma />}

          {subSeccion === 'configuracion' && <Configuracion />}


      </main>

    </div>
  );
};

export default Dashboard;