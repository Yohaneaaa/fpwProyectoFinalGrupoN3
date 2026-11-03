import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AlumnoContext } from "../contexts/AlumnoContext";
import "../css/login.css";

const Login = () => {
  const [nombre, setNombre] = useState("");
  const navegar = useNavigate();
  const { guardarNombreAlumno } = useContext(AlumnoContext);

  const gestionarLogin = (e) => {
    e.preventDefault();
    if (nombre.trim() !== "") {
      guardarNombreAlumno(nombre);
      navegar("/juego1");
    }
  };

  return (
    <div className="container mt-5 login-contenedor" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4 login-titulo">♡ Aventura en la Granja ♡</h2>

      <Form onSubmit={gestionarLogin} className="login-formulario">
        <Form.Group className="mb-4" controlId="formNombre">
          <Form.Label className="login-etiqueta">Ingresá tu nombre:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Escribí tu nombre aquí"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="login-campo"
            required
          />
        </Form.Group>

        <div className="d-grid">
          <Button type="submit" className="login-boton">
            🚀 Comenzar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;