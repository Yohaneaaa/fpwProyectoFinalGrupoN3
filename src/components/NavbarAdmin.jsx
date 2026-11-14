import { useNavigate, Link, useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useAutorizaciones } from "../hooks/useAutorizaciones";

const NavbarAdmin = () => {
  const navegar = useNavigate();
  const location = useLocation();
  const { cerrarSesion } = useAutorizaciones();

  const salir = () => {
    cerrarSesion();
    navegar("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Administración</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-admin" />

        <Navbar.Collapse id="navbar-admin">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/resultados-jugadores"
              active={location.pathname === "/resultados-jugadores"}
            >
              Resultados de jugadores
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/docente"
              active={location.pathname === "/docente"}
            >
              Panel docente
            </Nav.Link>
          </Nav>

          <Button variant="outline-light" onClick={salir}>
            Cerrar sesión
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarAdmin;
