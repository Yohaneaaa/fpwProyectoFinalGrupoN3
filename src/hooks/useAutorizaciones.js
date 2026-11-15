import { useContext } from "react";
import { AutorizacionesContext } from "../contexts/AutorizacionesContext";

export const useAutorizaciones = () => {
 
  const contexto = useContext(AutorizacionesContext);

  if (!contexto) {
    throw new Error(
      "useAutorizaciones debe ser usado dentro de ProveedorAutenticacion",
    );
  }

  return contexto;
};
