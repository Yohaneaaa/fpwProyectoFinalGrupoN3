import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useAutorizaciones } from "../hooks/useAutorizaciones";
import { obtenerPuntajes, obtenerBajas, darDeBajaUsuario } from "../services/alumnosService";
import TarjetaAlumno from "../components/TarjetaAlumno";

const PanelDocente = () => {
  const navegar = useNavigate();
  const { usuarioActivo, cerrarSesion } = useAutorizaciones();

  const [alumnos, setAlumnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  // Al abrir la pantalla: lee public/data/usuarios.json con Axios, se queda
  // con los niños (rol "usuario"), les saca los dados de baja y les agrega
  // sus puntajes guardados en localStorage.
  useEffect(() => {
    axios
      .get("/data/usuarios.json")
      .then((respuesta) => {
        const puntajes = obtenerPuntajes();
        const bajas = obtenerBajas();

        const lista = respuesta.data
          .filter((u) => u.rol === "usuario" && !bajas.includes(u.user))
          .map((u) => {
            const p = puntajes[u.user] || {};
            return {
              user: u.user,
              nombre: u.nombre,
              puntajeJuego1: p.puntajeJuego1 || 0,
              puntajeJuego2: p.puntajeJuego2 || 0,
            };
          });

        setAlumnos(lista);
      })
      .catch(() => setError(true))
      .finally(() => setCargando(false));
  }, []);

  const salir = () => {
    cerrarSesion();
    navegar("/");
  };

  const darDeBaja = (user) => {
    if (window.confirm("¿Seguro que querés dar de baja a este alumno?")) {
      darDeBajaUsuario(user); // se anota en localStorage
      // filter devuelve una lista NUEVA sin ese alumno (no se modifica la original)
      setAlumnos(alumnos.filter((a) => a.user !== user));
    }
  };

  return (
    <Container className="py-4 panel-docente">
      <div className="panel-docente-encabezado d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="panel-docente-titulo">Panel docente</h2>
          <p className="panel-docente-saludo mb-0">
            Docente: {usuarioActivo ? usuarioActivo.nombre : "sin sesión"}
          </p>
        </div>
        <Button className="panel-docente-boton" onClick={salir}>
          Cerrar sesión
        </Button>
      </div>

      {cargando && <p className="panel-docente-cargando">Cargando alumnos...</p>}

      {error && (
        <p className="panel-docente-error">
          No se pudo leer la lista de alumnos. Revisá que exista public/data/usuarios.json.
        </p>
      )}

      {!cargando && !error && (
        <>
          <p className="panel-docente-cantidad">Alumnos registrados: {alumnos.length}</p>

          {alumnos.length === 0 ? (
            <p className="panel-docente-vacio">
              No hay alumnos para mostrar.
            </p>
          ) : (
            <Row className="g-3">
              {alumnos.map((alumno) => (
                <Col key={alumno.user} xs={12} md={6} lg={4}>
                  <TarjetaAlumno alumno={alumno} onEliminar={darDeBaja} />
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default PanelDocente;
