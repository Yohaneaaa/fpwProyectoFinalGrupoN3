import { createContext, useState } from "react";

export const AutorizacionesContext = createContext(null);

export const ProveedorContext = ({ children }) => {
 
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const guardarSesion = (usuario) => setUsuarioActivo(usuario);
  const cerrarSesion = () => setUsuarioActivo(null);

  return (
    <AutorizacionesContext.Provider
      value={{ usuarioActivo, guardarSesion, cerrarSesion }}
    >
      {children}
    </AutorizacionesContext.Provider>
  );
};
