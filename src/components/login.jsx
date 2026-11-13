import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import servicesAutorizaciones from "../services/servicesAutorizaciones";
import { useAutorizaciones } from "../hooks/useAutorizaciones";
import "../css/login.css";

const Login = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const { guardarSesion } = useAutorizaciones();
    const navegar = useNavigate();
    const [error, setError] = useState("");

    const gestionarLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!user.trim() || !password.trim()) {
            setError("Por favor, completá todos los campos.");
            return;
        }

        try {
            const usuarioEnSesion = await servicesAutorizaciones.login(user, password);

            if (!usuarioEnSesion) {
                setError('Credenciales inválidas. Verificá tus datos.');
                return;
            }

            guardarSesion(usuarioEnSesion);

            if (usuarioEnSesion.rol === "admin") {
                navegar("/otrapagina"); 
            } else {
                navegar("/juego1"); 
            }

        } catch (e) {
            setError("No se ha podido conectar a la base de datos de usuarios.");
        }
    };

    return (
        <div className="container mt-5 login-contenedor" style={{ maxWidth: "400px" }}>
            <h2 className="text-center mb-4 login-titulo">♡ Aventura en la Granja ♡</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={gestionarLogin} className="login-formulario">
                <Form.Group className="mb-3" controlId="formUser">
                    <Form.Label className="login-etiqueta">Usuario o Nombre:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Escribí tu usuario aquí"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        className="login-campo"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Label className="login-etiqueta">Contraseña:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Escribí tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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