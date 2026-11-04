import { useContext } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { AlumnoContext } from "../contexts/AlumnoContext.jsx";
import { useAutorizaciones } from "../hooks/useAutorizaciones";
import "../css/resultados.css";

const piezasConfeti = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  emoji: ["🎉", "⭐", "🌽", "🐮", "🐔", "🎊"][i % 6],
  izquierda: Math.random() * 100,
  retraso: Math.random() * 3,
  duracion: 3 + Math.random() * 3,
}));

const mensajeSegunTotal = (total, nombre) => {
  if (total >= 80) return `🏆 ¡Increíble, ${nombre}! ¡Sos un granjero experto!`;
  if (total >= 50) return `🌟 ¡Muy bien, ${nombre}! ¡Sos un gran granjero!`;
  return `🐥 ¡Ánimo, ${nombre}! La próxima te sale mejor.`;
};

export default function Resultados() {
  const navegar = useNavigate();
  const { state } = useLocation();
  const { nombreAlumno, limpiarNombreAlumno } = useContext(AlumnoContext);
  const { usuarioActivo } = useAutorizaciones();

  if (!state) return <Navigate to="/" replace />;

  const nombre = usuarioActivo ? usuarioActivo.nombre : nombreAlumno;
  const { puntajeJuego1, puntajeJuego2 } = state;
  const total = puntajeJuego1 + puntajeJuego2;
  const estrellas = Math.round(total / 20);

  const jugarDeNuevo = () => {
    limpiarNombreAlumno();
    navegar("/");
  };

  return (
    <Container className="text-center py-4 resultados-contenedor">
      <div className="confeti" aria-hidden="true">
        {piezasConfeti.map((p) => (
          <span
            key={p.id}
            style={{
              left: `${p.izquierda}%`,
              animationDelay: `${p.retraso}s`,
              animationDuration: `${p.duracion}s`,
            }}
          >
            {p.emoji}
          </span>
        ))}
      </div>

      <h2 className="resultados-titulo">🎉 ¡Terminaste, {nombre}! 🎉</h2>
      <p className="resultados-juego">🍽️ ¡Hora de Comer!: {puntajeJuego1} / 50</p>
      <p className="resultados-juego">🔍 El Intruso de la Granja: {puntajeJuego2} / 50</p>
      <h3 className="resultados-total">Total: {total} / 100</h3>
      <p className="resultados-estrellas">
        {"⭐".repeat(estrellas)}{"☆".repeat(5 - estrellas)}
      </p>
      <p className="resultados-mensaje">{mensajeSegunTotal(total, nombre)}</p>
      <Button className="resultados-boton" onClick={jugarDeNuevo}>
        🔄 ¡Jugar de nuevo!
      </Button>
    </Container>
  );
}