import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [usuarioSesion, setUsuarioSesion] = useState(null);

  const cerrarSesion = () => {
    setUsuarioSesion(null);
  };

  return (
    <ThemeProvider>
      {usuarioSesion ? (
        <Dashboard usuario={usuarioSesion} alCerrarSesion={cerrarSesion} />
      ) : (
        <Login alAutenticar={setUsuarioSesion} />
      )}
    </ThemeProvider>
  );
}

export default App;