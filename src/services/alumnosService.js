export const obtenerPuntajes = () => {
  try {
    let acumuladorPuntajes = [];
    for (let i = 0; i < localStorage.length; i++) {
      const clave = localStorage.key(i);
      const dato = localStorage.getItem(clave);
      try {
        const parsed = JSON.parse(dato);
        if (Array.isArray(parsed)) {
          acumuladorPuntajes = [...acumuladorPuntajes, ...parsed];
        } else if (parsed && typeof parsed === "object") {
          acumuladorPuntajes.push(parsed);
        }
      } catch (e) {
        // Si no es un JSON válido, se ignora
      }
    }
    return acumuladorPuntajes;
  } catch (error) {
    console.error("Error al obtener puntajes:", error);
    return [];
  }
};

const CLAVE_BAJAS = "fpw_alumnos_bajas";

export const obtenerBajas = () => {
  try {
    const datos = localStorage.getItem(CLAVE_BAJAS);
    const parsed = datos ? JSON.parse(datos) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

export const darDeBajaUsuario = (user) => {
  try {
    const bajasActuales = obtenerBajas();
    if (!bajasActuales.includes(user)) {
      bajasActuales.push(user);
      localStorage.setItem(CLAVE_BAJAS, JSON.stringify(bajasActuales));
    }
  } catch (error) {
    console.error("Error al guardar la baja:", error);
  }
};