// src/hooks/useSeguridadLogin.js
import { useState, useEffect } from 'react';

export const useSeguridadLogin = (alAutenticar) => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [intentosFallidos, setIntentosFallidos] = useState(0);
  const [estaBloqueado, setEstaBloqueado] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(0);

  // Manejo del temporizador de bloqueo por seguridad
  useEffect(() => {
    let intervalo = null;
    if (estaBloqueado && tiempoRestante > 0) {
      intervalo = setInterval(() => {
        setTiempoRestante((prev) => prev - 1);
      }, 1000);
    } else if (tiempoRestante === 0) {
      setEstaBloqueado(false);
      setIntentosFallidos(0);
    }
    return () => clearInterval(intervalo);
  }, [estaBloqueado, tiempoRestante]);

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (estaBloqueado) {
      setError(`Demasiados intentos. Intente de nuevo en ${tiempoRestante} segundos.`);
      return;
    }

    if (!usuario.trim() || !contrasena.trim()) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 💡 Adaptación para la nueva BD: Mandamos el estado 'contrasena' bajo el nombre 'clave'
        body: JSON.stringify({ 
          usuario: usuario, 
          clave: contrasena 
        }), 
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        setError('');
        setIntentosFallidos(0);
        alAutenticar(datos); // Pasa los datos del usuario logeado a la App principal
      } else {
        const nuevosIntentos = intentosFallidos + 1;
        setIntentosFallidos(nuevosIntentos);
        setError(datos.error || 'Credenciales incorrectas.');

        if (nuevosIntentos >= 3) {
          setEstaBloqueado(true);
          setTiempoRestante(60);
        }
      }
    } catch (err) {
      console.error('Error de conexión con la API:', err);
      setError('No se pudo conectar con el servidor. Intente más tarde.');
    }
  };

  return {
    usuario,
    setUsuario,
    contrasena,
    setContrasena,
    error,
    estaBloqueado,
    tiempoRestante,
    manejarEnvio
  };
};