import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "../css/Login.css";

const Login = () => {
  const [nombre, setNombre] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  const gestionarLogin = (e) => {
    e.preventDefault();
    if (nombre.trim() !== "") {
      setMensajeExito(`¡Bienvenido/a a la granja, ${nombre}!`);
    
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Aventura en la Granja</h2>
      
      {mensajeExito && (
        <Alert variant="success" className="text-center">
          {mensajeExito}
        </Alert>
      )}

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
          <Button type="submit" variant="success" className="login-boton">
            🚀 Comenzar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;