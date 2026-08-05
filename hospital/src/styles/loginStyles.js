export const styles = {
  pantallaCompleta: { 
    display: 'flex', 
    width: '100vw', 
    height: '100vh' 
  },
  mitadIzquierda: { 
    flex: 1, 
    backgroundColor: '#00C86F', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: '20px' 
  },
  contenedorLogo: { 
    width: '280px', 
    height: '280px', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    objectFit: 'cover', 
    overflow: 'hidden' 
  },
  logo: { 
    width: '95%', 
    height: '95%', 
    objectFit: 'contain', 
    borderRadius: '50%', 
    backgroundColor: '#000' 
  },
  eslogan: { 
    color: '#000', 
    fontSize: '36px', 
    textAlign: 'center', 
    fontWeight: 'normal',
    lineHeight: '1.3' 
  },
  mitadDerecha: { 
    flex: 1, 
    backgroundColor: '#0B8236', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: '20px' 
  },
  formulario: { 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    width: '100%', 
    maxWidth: '400px' 
  },
  tituloForm: { 
    color: '#fff', 
    fontSize: '32px', 
    marginBottom: '30px', 
    fontWeight: 'bold', 
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)' 
  },
  cajaTexto: { 
    width: '100%', 
    padding: '16px 24px', 
    fontSize: '20px', 
    borderRadius: '30px', 
    border: '2px solid #000', 
    backgroundColor: '#EFEFEF', 
    marginBottom: '25px', 
    outline: 'none', 
    fontStyle: 'italic' 
  },
  botonContinuar: { 
    padding: '12px 40px', 
    fontSize: '20px', 
    borderRadius: '30px', 
    border: '2px solid #000', 
    backgroundColor: '#EFEFEF', 
    cursor: 'pointer', 
    fontWeight: 'normal', 
    marginTop: '10px', 
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', 
    transition: 'background-color 0.2s ease' 
  },
  botonBloqueado: { 
    padding: '12px 40px', 
    fontSize: '20px', 
    borderRadius: '30px', 
    border: '2px solid #555', 
    backgroundColor: '#888', 
    color: '#ccc', 
    cursor: 'not-allowed', 
    fontWeight: 'normal', 
    marginTop: '10px' 
  },
  errorText: { 
    color: '#ffcccc', 
    marginBottom: '15px', 
    fontWeight: 'bold', 
    textAlign: 'center', 
    backgroundColor: 'rgba(0,0,0,0.2)', 
    padding: '10px', 
    borderRadius: '8px', 
    width: '100%' 
  }
};