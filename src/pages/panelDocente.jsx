import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAutorizaciones } from "../hooks/useAutorizaciones";
import { obtenerPuntajes, obtenerBajas, darDeBajaUsuario } from "../services/alumnosService";
import TarjetaAlumno from "../components/TarjetaAlumno";
import NavbarAdmin from "../components/NavbarAdmin";

const PanelDocente = () => {
  const { usuarioActivo } = useAutorizaciones();

  const [alumnos, setAlumnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

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

  const darDeBaja = (user) => {
    if (window.confirm("¿Seguro que querés dar de baja a este alumno?")) {
      darDeBajaUsuario(user);
      setAlumnos(alumnos.filter((a) => a.user !== user));
    }
  };

  return (
    <>
      <NavbarAdmin />

      <Container className="py-4 panel-docente">
        <div className="panel-docente-encabezado mb-4">
          <h2 className="panel-docente-titulo">Panel docente</h2>
          <p className="panel-docente-saludo mb-0">
            Docente: {usuarioActivo ? usuarioActivo.nombre : "sin sesión"}
          </p>
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
              <p className="panel-docente-vacio">No hay alumnos para mostrar.</p>
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
    </>
  );
};

export default PanelDocente;