const CLAVE_RESULTADOS = "intentosJugadores";

// Recupera todos los intentos guardados
export const obtenerIntentos = () => {
  try {
    const datos = localStorage.getItem(CLAVE_RESULTADOS);

    return datos ? JSON.parse(datos) : [];
  } catch (error) {
    console.error("Error al recuperar los intentos:", error);
    return [];
  }
};

// Guarda un nuevo intento sin eliminar los anteriores
export const guardarIntento = (intento) => {
  try {
    const intentos = obtenerIntentos();

    const nuevoIntento = {
      id: crypto.randomUUID(),
      // ...intento,
      usuario: intento.usuario,
      nombre: intento.nombre,
      puntajeJuego1: intento.puntajeJuego1,
      puntajeJuego2: intento.puntajeJuego2,
    };

    intentos.push(nuevoIntento);

    localStorage.setItem(CLAVE_RESULTADOS, JSON.stringify(intentos));

    return nuevoIntento;
  } catch (error) {
    console.error("Error al guardar el intento:", error);
    return null;
  }
};
