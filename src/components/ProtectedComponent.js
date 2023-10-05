import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedComponent({ token }) {
  const navigate = useNavigate();

  if (!token) {
    // Si no hay token, redirigir al usuario a la página de inicio de sesión
    navigate('/login');
    return null;
  }

  // Si hay un token, mostrar el contenido protegido
  return (
    <div>
      <h2>Contenido protegido</h2>
      {/* ... (contenido protegido) */}
    </div>
  );
}

export default ProtectedComponent;
