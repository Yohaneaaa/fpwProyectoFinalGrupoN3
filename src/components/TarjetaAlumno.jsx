import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const TarjetaAlumno = ({ alumno, onEliminar }) => {
  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="fw-bold text-dark mb-1">
            {alumno.nombre}
          </Card.Title>
          <Card.Subtitle className="text-muted mb-3 small">
            Usuario: @{alumno.user}
          </Card.Subtitle>

          <div className="bg-light p-2 rounded mb-3">
            <p className="mb-1 small">
              <strong>Puntaje Juego 1:</strong> {alumno.puntajeJuego1} pts
            </p>
            <p className="mb-0 small">
              <strong>Puntaje Juego 2:</strong> {alumno.puntajeJuego2} pts
            </p>
          </div>
        </div>

        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => onEliminar(alumno.user)}
        >
          Dar de baja
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TarjetaAlumno;