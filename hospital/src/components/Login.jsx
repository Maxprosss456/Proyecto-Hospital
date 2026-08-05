import React from 'react';
import { useSeguridadLogin } from '../hooks/useSeguridadLogin';
import { styles } from '../styles/loginStyles';         

const Login = ({ alAutenticar }) => {
  const {
    usuario,
    setUsuario,
    contrasena,
    setContrasena,
    error,
    estaBloqueado,
    tiempoRestante,
    manejarEnvio
  } = useSeguridadLogin(alAutenticar);

  return (
    <div style={styles.pantallaCompleta}>
      <div style={styles.mitadIzquierda}>
        <div style={styles.contenedorLogo}>
          <img src="/hospital_logo.ico" alt="Logo Hospital" style={styles.logo} />
        </div>
        <h1 style={styles.eslogan}>
          Tu Salud <br /> En Primer Lugar
        </h1>
      </div>

      <div style={styles.mitadDerecha}>
        <form onSubmit={manejarEnvio} style={styles.formulario}>
          <h2 style={styles.tituloForm}>Iniciar Sesión</h2>
          
          {error && <p style={styles.errorText}>{error}</p>}

          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            style={styles.cajaTexto}
            disabled={estaBloqueado}
            autoComplete="username"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            style={styles.cajaTexto}
            disabled={estaBloqueado}
            autoComplete="current-password"
          />

          <button 
            type="submit" 
            style={estaBloqueado ? styles.botonBloqueado : styles.botonContinuar}
            disabled={estaBloqueado}
          >
            {estaBloqueado ? `Bloqueado (${tiempoRestante}s)` : 'Continuar'}
          </button>
        </form>
      </div>

    </div>
  );
};

export default Login;