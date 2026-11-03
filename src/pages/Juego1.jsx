import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { AlumnoContext } from "../contexts/AlumnoContext.jsx";
import { useAutorizaciones } from "../hooks/useAutorizaciones";
import { animales } from "../data/animales.js";
import { useNavigate } from "react-router-dom";


const Juego1 = () => {
  const { nombreAlumno } = useContext(AlumnoContext);
  const { usuarioActivo } = useAutorizaciones();
  const navegar = useNavigate();

  const nombreMostrar = usuarioActivo ? usuarioActivo.nombre : nombreAlumno;

  const [rondaActual, setRondaActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [respondida, setRespondida] = useState(false);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  const animal = animales[rondaActual];

  const responder = (opcion) => {
    if (respondida === false) {
      setRespondida(true);

      if (animal.respuestasCorrectas.includes(opcion)) {
        setPuntaje(puntaje + 10);
        setMensaje(`Correcto. ¡${animal.nombre} comió!`);
      } else {
        setMensaje(`¡Esa no es su comida!`);
      }
    }
  };

  const siguienteRonda = () => {
    if (rondaActual < animales.length - 1) {
      setRondaActual(rondaActual + 1);
      setMensaje("");
      setRespondida(false);
    } else {
      setJuegoTerminado(true);
    }
  };

  const irAlSiguienteJuego = () => {
    navegar("/juegoDos", { state: { puntajeJuego1: puntaje } });
  };

  return (
    <Container className="py-4">
      <h2>¡Hora de Comer!</h2>

      <p>¡Vamos {nombreMostrar}!</p>

      {!juegoTerminado ? (
        <>
          <h4>
            Ronda {rondaActual + 1} de {animales.length}
          </h4>
          
          <div className="text-center" style={{ marginTop: '-15px', marginBottom: '-10px' }}>
            <img 
              src={`/image/${animal.nombre.toLowerCase()}.png`} 
              alt={animal.nombre} 
              style={{ width: '200px', height: '200px', objectFit: 'contain' }} 
            />
          </div>

          <h3>{animal.nombre}</h3>

          <p>¿Que comida elegis para este animal?</p>

          {animal.opciones.map((opcion) => (
            <Button
              key={opcion}
              className="m-2"
              variant="primary"
              disabled={respondida}
              onClick={() => responder(opcion)}
            >
              {opcion}
            </Button>
          ))}

          {mensaje && (
            <div className="mt-3">
              <p>{mensaje}</p>
              {/*condicion ? valorSiVerdadero : valorSiFalso */}
              <Button onClick={siguienteRonda}>
                {rondaActual < animales.length - 1
                  ? "Siguiente animal"
                  : "Ver resultado"}
              </Button>
            </div>
          )}

          <h5 className="mt-3">Puntaje: {puntaje} / 50</h5>
        </>
      ) : (
        <>
          <h3>¡Juego terminado!</h3>
          <h4>
            {nombreMostrar}, obtuviste {puntaje} de 50 puntos.
          </h4>

          <Button onClick={irAlSiguienteJuego}>Siguiente juego</Button>
        </>
      )}
    </Container>
  );
};

export default Juego1;
