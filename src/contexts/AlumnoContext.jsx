import { createContext, useState } from "react";

export const AlumnoContext = createContext(null);

export const ProveedorAlumno = ({ children }) => {
  const [nombreAlumno, setNombreAlumno] = useState("");

  const guardarNombreAlumno = (nombre) => {
    setNombreAlumno(nombre);
  };

  const limpiarNombreAlumno = () => {
    setNombreAlumno("");
  };

  return (
    <AlumnoContext.Provider
      value={{
        nombreAlumno,
        guardarNombreAlumno,
        limpiarNombreAlumno,
      }}
    >
      {children}
    </AlumnoContext.Provider>
  );
};
