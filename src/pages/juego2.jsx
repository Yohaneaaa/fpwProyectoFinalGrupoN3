import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { AlumnoContext } from '../contexts/AlumnoContext.jsx';
import { useAutorizaciones } from '../hooks/useAutorizaciones';
import { rondas } from '../../public/data/juego2.js';
import AnimalCard from '../components/nivel2.jsx';


export default function FarmGame() {
    const navegar = useNavigate();
    const {state} =useLocation();
    const { nombreAlumno } = useContext(AlumnoContext);
    const { usuarioActivo } = useAutorizaciones();

    const nombreMostrar = usuarioActivo ? usuarioActivo.nombre : nombreAlumno;

 // nivel 2
    const [rondaActualIndex, setRondaActualIndex] = useState(0);
    const [puntos, setPuntos] = useState(0);
    const [mensaje, setMensaje] = useState("");
    const [bloqueado, setBloqueado] = useState(false);
    const [juegoTerminado, setJuegoTerminado] = useState(false);

    const datosRonda = rondas[rondaActualIndex];

    const verificarRespuesta = (nombreAnimal) => {
        if (bloqueado) return;
        setBloqueado(true);

        const esCorrecto = nombreAnimal === datosRonda.intruso;

        if (esCorrecto) {
            setPuntos(prev => prev + 10);
            setMensaje("¡Sacaste al intruso! La granja está a salvo. (+10 pts)");
        } else {
            setMensaje("Incorrecto. Ese sí es de la granja.");
        }

        setTimeout(() => {
            const siguienteRonda = rondaActualIndex + 1;
            if (siguienteRonda < rondas.length) {
                setRondaActualIndex(siguienteRonda);
                setMensaje("");
                setBloqueado(false);
            } else {
                setJuegoTerminado(true);
                setBloqueado(false);
            }
        }, 2000);
    };

    const irAlSiguienteJuego = () => {
        // Si querés enviar tu puntaje a la siguiente pantalla por state:
        navegar("/resultados", {
            state: { puntajeJuego1: state?.puntajeJuego1 ?? 0, puntajeJuego2: puntos },
        });
    };

    return (
        <Container className="py-4">
            <h2>¡Intruso en la Granja! </h2>
            <p>¡Vamos {nombreMostrar}!</p>
            <p className="instruccion">Un animal que NO es de la granja se metió. ¡Encontralo y sacalo!</p>

            <div className="hud">
                <span>Ronda: <strong>{rondaActualIndex + 1}</strong>/5</span>
                <span>Puntos: <strong>{puntos}</strong></span>
            </div>

            {!juegoTerminado ? (
                <>
                    <section className="grid-animales">
                        {datosRonda.animales.map((animal, index) => (
                            <AnimalCard 
                                key={index} 
                                animal={animal} 
                                onClick={() => verificarRespuesta(animal.nombre)} 
                            />
                        ))}
                    </section>

                    {mensaje && (
                        <div className="mensaje">
                            {mensaje}
                        </div>
                    )}
                </>
            ) : (
                <div className="pantalla-final">
                    <h2>¡Completaste el Nivel 2!</h2>
                    <p>Obtuviste {puntos} de 50 puntos posibles.</p>
                    
                    <Button variant="success" onClick={irAlSiguienteJuego}>
                        Ver resultados
                    </Button>
                </div>
            )}
        </Container>
    );
}