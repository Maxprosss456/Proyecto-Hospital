import React, { useState } from 'react';
import { styles } from './ComponentsStyles';
import './Dashboard.css'; // Importación de estilos responsivos
import { useTheme } from '../context/ThemeContext';

import Inicio from './DashboardComponents/Inicio';
import Informes from './DashboardComponents/Informes';
import Norma from './DashboardComponents/Norma';
import Configuracion from './DashboardComponents/Configuracion';
import CentrosMedicos from './pages/CentrosMedicos';

const Dashboard = ({ usuario, alCerrarSesion }) => {
  const [subSeccion, setSubSeccion] = useState('inicio');
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { modoOscuro } = useTheme();

  const rangoActual = usuario?.rango || 'sin_rango';

  // El sidebar se mantiene verde siempre; cambia el fondo según el tema.
  const contenidoTema = modoOscuro
    ? { backgroundColor: '#1e1e1e', color: '#ffffff' }
    : {};

  // Determinar si estamos en cualquier variante de la sección informes
  const esSeccionInformes = 
    subSeccion === 'informes' || 
    subSeccion === 'urgencias' || 
    subSeccion === 'informes:urgentes';

  // Título para la barra superior
  const obtenerTituloSuperior = () => {
    if (subSeccion === 'urgencias' || subSeccion === 'informes:urgentes') {
      return 'URGENCIAS';
    }
    if (subSeccion === 'informes') {
      return 'INFORMES';
    }
    return subSeccion.toUpperCase();
  };

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
                  style={esSeccionInformes ? styles.enlaceActivo : styles.enlaceMenu}
                  onClick={() => setSubSeccion('informes')}
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
      <main
        style={{ ...styles.areaContenido, ...contenidoTema }}
        className={`area-contenido-responsive ${
          modoOscuro ? 'tema-oscuro' : 'tema-claro'
        }`}
      >

        {subSeccion !== 'inicio' && (
          <div style={styles.barraSuperiorUrgencias} className="barra-superior-responsive">
            <button style={styles.botonVolver} onClick={() => setSubSeccion('inicio')}>
              ⤺
            </button>
            <span style={styles.tituloSeccionSuperior}>
              {obtenerTituloSuperior()}
            </span>
          </div>
        )}

        <div>
          {/* SECCIONES */}
          {subSeccion === 'inicio' && (
            <Inicio usuario={usuario} rangoActual={rangoActual} setSubSeccion={setSubSeccion} />
          )}

          {/* Renderiza Informes pasando la pestaña 'urgentes' o 'generales' */}
          {esSeccionInformes && (
            <Informes 
              tabInicial={
                subSeccion === 'urgencias' || subSeccion === 'informes:urgentes' 
                  ? 'urgentes' 
                  : 'generales'
              } 
            />
          )}

          {subSeccion === 'norma' && <Norma />}

          {subSeccion === 'configuracion' && <Configuracion />}

          {subSeccion === 'centros médicos' && <CentrosMedicos />}
        </div>
      </main>

    </div>
  );
};

export default Dashboard;