import React from 'react';

export const ProtectorPorRol = ({ rangoUsuario, rolesPermitidos, children }) => {
  const tienePermiso = rolesPermitidos.includes(rangoUsuario);

  if (!tienePermiso) {
    return null; 
  }

  return <>{children}</>;
};