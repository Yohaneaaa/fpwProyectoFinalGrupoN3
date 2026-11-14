import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AlumnoContext } from "../contexts/AlumnoContext.jsx";
import { useAutorizaciones } from "../hooks/useAutorizaciones";

const ProtectorRuta = ({ children, rolRequerido }) => {
  const { usuarioActivo } = useAutorizaciones();
  const { nombreAlumno } = useContext(AlumnoContext);

  const hayIdentidad = usuarioActivo || nombreAlumno.trim() !== "";

  if (!hayIdentidad) {
    return <Navigate to="/" replace />;
  }

  if (rolRequerido && usuarioActivo?.rol !== rolRequerido) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectorRuta;