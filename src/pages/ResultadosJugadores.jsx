import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import CardIntento from "../components/CardIntento";
import { obtenerIntentos } from "../services/servicesResultados";

import NavbarAdmin from "../components/NavbarAdmin";

const ResultadosJugadores = () => {
  const [intentos, setIntentos] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const datos = obtenerIntentos();
    setIntentos(datos);
  }, []);

  const intentosFiltrados = intentos.filter((intento) =>
    intento.nombre.toLowerCase().includes(filtro.toLowerCase()),
  );

  return (
    <>
      <NavbarAdmin />

      <Container className="py-4">
        <h2 className="mb-4 text-center">Resultados de los jugadores</h2>

        <Form.Group className="mb-4">
          <Form.Label>Buscar jugador por nombre</Form.Label>

          <Form.Control
            type="text"
            placeholder="Escribí el nombre del jugador..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </Form.Group>

        <p>Intentos registrados: {intentosFiltrados.length}</p>

        {intentosFiltrados.length === 0 ? (
          <p className="text-center mt-5">
            {filtro
              ? "No se encontraron intentos para ese jugador."
              : "Todavía no hay intentos registrados."}
          </p>
        ) : (
          <Row className="g-3">
            {intentosFiltrados.map((intento) => (
              <Col key={intento.id} xs={12} md={6} lg={4}>
                <CardIntento intento={intento} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default ResultadosJugadores;
