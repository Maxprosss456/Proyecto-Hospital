import React, { useState } from 'react';
import { styles } from './ComponentsStyles'; 
import './Dashboard.css'; // Importación de estilos responsivos

import Inicio from './DashboardComponents/Inicio';
import Informes from './DashboardComponents/Informes';
import Norma from './DashboardComponents/Norma';
import Configuracion from './DashboardComponents/Configuracion';
import CentrosMedicos from './pages/CentrosMedicos';

const Dashboard = ({ usuario, alCerrarSesion }) => {
  const [subSeccion, setSubSeccion] = useState('inicio');
  const [menuAbierto, setMenuAbierto] = useState(false);

  const rangoActual = usuario?.rango || 'sin_rango';

  return (
    <div style={styles.contenedorPrincipal} className="contenedor-principal-responsive">
      
      {/* Sidebar adaptable */}
      <aside 
        className={`sidebar-responsive ${menuAbierto ? 'abierta' : 'colapsada'}`}
        style={{
          ...styles.sidebar,
          width: menuAbierto ? '270px' : '70px'
        }}
      >
        
        {/* Toggle al pulsar el logo */}
        <div 
          style={{ ...styles.bloqueSuperiorMarca, cursor: 'pointer' }} 
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <div style={styles.contenedorLogo}>
            <img src={usuario.logo} alt="Logo Hospital" style={styles.logo} />
          </div>
          {menuAbierto && <h1 style={styles.textoHospital}>{usuario.hospital}</h1>}
        </div>
        
        {/* Opciones del menú */}
        {menuAbierto && (
          <>
            <nav style={styles.menuNav}>
              <div 
                style={subSeccion === 'inicio' ? styles.enlaceActivo : styles.enlaceMenu} 
                onClick={() => setSubSeccion('inicio')}
              >
                ⌂ INICIO
              </div>
              
              {['Médico', 'Enfermero', 'Director Médico', 'Admin'].includes(rangoActual) && (
                <div 
                  style={subSeccion === 'urgencias' ? styles.enlaceActivo : styles.enlaceMenu} 
                  onClick={() => setSubSeccion('urgencias')}
                >
                 🗎 INFORMES
                </div>
              )}
              
              {['Admin', 'Director Médico'].includes(rangoActual) && (
                <div 
                  style={subSeccion === 'norma' ? styles.enlaceActivo : styles.enlaceMenu} 
                  onClick={() => setSubSeccion('norma')}
                >
                 🕮 NORMAS
                </div>
              )}
              
              {['Admin', 'Director Médico'].includes(rangoActual) && (
                <div 
                  style={subSeccion === 'configuracion' ? styles.enlaceActivo : styles.enlaceMenu} 
                  onClick={() => setSubSeccion('configuracion')}
                >
                 ⛭ CONFIGURACIÓN
                </div>
              )}
            </nav>

            <button onClick={alCerrarSesion} style={styles.botonSalir}>
              Cerrar Sesión
            </button>
          </>
        )}
      </aside>

      {/* Contenido Principal */}
      <main style={styles.areaContenido} className="area-contenido-responsive">
        
        {subSeccion !== 'inicio' && (
          <div style={styles.barraSuperiorUrgencias} className="barra-superior-responsive">
            <button style={styles.botonVolver} onClick={() => setSubSeccion('inicio')}>
              ⤺
            </button>
            <span style={styles.tituloSeccionSuperior}>
              {subSeccion.toUpperCase()}
            </span>
          </div>
        )}

        <div 
          
        >
          {/* COLOCAR SECCIONES AQUI */}
          {subSeccion === 'inicio' && (
            <Inicio usuario={usuario} rangoActual={rangoActual} setSubSeccion={setSubSeccion} />
          )}

          {subSeccion === 'urgencias' && <Informes />}

          {subSeccion === 'norma' && <Norma />}

          {subSeccion === 'configuracion' && <Configuracion />}

          {subSeccion === 'centros médicos' && <CentrosMedicos />}
        </div>
      </main>

    </div>
  );
};

export default Dashboard;