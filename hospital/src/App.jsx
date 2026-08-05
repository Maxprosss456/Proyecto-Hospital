import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [usuarioSesion, setUsuarioSesion] = useState(null);

  const cerrarSesion = () => {
    setUsuarioSesion(null);
  };

  return (
    <>
      {usuarioSesion ? (
        <Dashboard usuario={usuarioSesion} alCerrarSesion={cerrarSesion} />
      ) : (
        <Login alAutenticar={setUsuarioSesion} />
      )}
    </>
  );
}

export default App;