import { createContext, useState } from "react";

export const AutorizacionesContext = createContext(null);

export const ProveedorContext = ({ children }) => {

  const [usuarioActivo, setUsuarioActivo] = useState(() => {
    const guardado = sessionStorage.getItem("usuarioActivo");
    return guardado ? JSON.parse(guardado) : null;
  });

  const guardarSesion = (usuario) => {
    setUsuarioActivo(usuario);
    sessionStorage.setItem("usuarioActivo", JSON.stringify(usuario));
  };

  const cerrarSesion = () => {
    setUsuarioActivo(null);
    sessionStorage.removeItem("usuarioActivo");
  };

  return (
    <AutorizacionesContext.Provider
      value={{ usuarioActivo, guardarSesion, cerrarSesion }}
    >
      {children}
    </AutorizacionesContext.Provider>
  );
};