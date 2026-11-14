import Card from "react-bootstrap/Card";

const CardIntento = ({ intento }) => {
  const puntajeTotal = intento.puntajeJuego1 + intento.puntajeJuego2;

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title>{intento.nombre}</Card.Title>

        <Card.Subtitle className="mb-3 text-muted">
          {intento.usuario}
        </Card.Subtitle>

        <Card.Text>
          <strong>Juego 1:</strong> {intento.puntajeJuego1} puntos
        </Card.Text>

        <Card.Text>
          <strong>Juego 2:</strong> {intento.puntajeJuego2} puntos
        </Card.Text>

        <hr />

        <Card.Text className="fw-bold text-success">
          Puntaje total: {puntajeTotal} puntos
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardIntento;
