const CLAVE_PUNTAJES = "puntajesAlumnos";
const CLAVE_BAJAS = "alumnosBajas";

/**
 * Obtiene el diccionario de puntajes desde localStorage.
 * Estructura esperada: { "usuario1": { puntajeJuego1: 10, puntajeJuego2: 15 }, ... }
 */
export const obtenerPuntajes = () => {
  try {
    const datos = localStorage.getItem(CLAVE_PUNTAJES);
    return datos ? JSON.parse(datos) : {};
  } catch (error) {
    console.error("Error al leer puntajes de localStorage:", error);
    return {};
  }
};

/**
 * Obtiene la lista de nombres de usuario que han sido dados de baja.
 */
export const obtenerBajas = () => {
  try {
    const datos = localStorage.getItem(CLAVE_BAJAS);
    return datos ? JSON.parse(datos) : [];
  } catch (error) {
    console.error("Error al leer bajas de localStorage:", error);
    return [];
  }
};

/**
 * Da de baja a un alumno guardando su identificador en localStorage.
 */
export const darDeBajaUsuario = (user) => {
  try {
    const bajasActuales = obtenerBajas();
    if (!bajasActuales.includes(user)) {
      bajasActuales.push(user);
      localStorage.setItem(CLAVE_BAJAS, JSON.stringify(bajasActuales));
    }
  } catch (error) {
    console.error("Error al guardar la baja en localStorage:", error);
  }
};