// src/components/ComponentsStyles.js
export const styles = {
  contenedorPrincipal: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#FFFFFF',
    fontFamily: 'sans-serif',
    overflow: 'hidden'
  },

  sidebar: {
    backgroundColor: '#00C86F', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '30px',
    paddingBottom: '20px',
    boxSizing: 'border-box',
    overflowX: 'hidden'
  },

  bloqueSuperiorMarca: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginBottom: '20px'
  },
  contenedorLogo: {
    maxWidth: '50px',
    maxHeight: '50px', 
    width: '20vw',
    height: '20vw', 
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center', 
    overflow: 'hidden'
  },

  logo: { 
    width: '100%',
    height: '100%', 
    objectFit: 'contain',
    borderRadius: '50%',
    backgroundColor: '#000' 
  },

  textoHospital: {
    color: '#FFFFFF',
    fontSize: '3vw',
    fontWeight: 'bold',
    marginTop: '15px',
    marginBottom: '20px',
    letterSpacing: '0.5px',
    textAlign: 'center'
  },

  menuNav: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },

  enlaceActivo: {
    width: '100%',
    backgroundColor: '#0B8236', 
    color: '#FFFFFF',
    padding: '16px 0',
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: '1px',
    cursor: 'pointer'
  },

  enlaceMenu: {
    width: '100%',
    color: '#FFFFFF',
    padding: '2vh 5vh 2vh 5vh',
    fontSize: '10px',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: '1px',
    cursor: 'pointer'
  },

  botonSalir: {
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    border: '2px solid #FFFFFF',
    padding: '8px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    marginTop: 'auto'
  },

  areaContenido: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: '2vh',
    paddingLeft: '2vw',
    paddingRight: '2vw',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    overflowY: 'auto'
  },


  contenedorTarjetas: {
    display: 'flex',
    gap: '2vw',
    width: '100%'
  },

  tarjetaBoton: {
    flex: 1,
    maxWidth: '50%',
    height: '10%',
    backgroundColor: '#00C86F',
    color: '#FFFFFF',
    fontSize: '3vw',
    border: '3px solid #000000',
    borderRadius: '40px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '20px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.15)'
  },

  botonVolver: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#000000',
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    fontSize: '3vw',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  },

  tituloSeccionSuperior: {
    color: '#FFFFFF',
    fontSize: '22px',
    fontWeight: 'bold',
    marginLeft: '20px',
    letterSpacing: '1px'
  },

  pizarraGrisUrgencias: {
    flexGrow: 1,
    backgroundColor: '#EFEFEF',
    borderRadius: '25px',
    border: '2px solid #333333',
    padding: '30px',
    boxSizing: 'border-box',
    overflowY: 'auto'
  },

  tarjetaAlerta: {
    backgroundColor: '#F5F5F5',
    border: '2px solid #333333',
    borderRadius: '25px',
    padding: '30px',
    boxSizing: 'border-box',
    boxShadow: '0px 4px 6px rgba(0,0,0,0.05)'
  },

  tituloAlertaText: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: '15px',
    fontFamily: 'sans-serif'
  },

  listaDetallesAlerta: {
    listStyleType: 'disc',
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '18px',
    color: '#000000',
    fontFamily: 'sans-serif'
  }
};