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

  useEffect(() => {
    axios
      .get("/data/usuarios.json")
      .then((respuesta) => {
        const puntajesArray = obtenerPuntajes();
        const bajas = obtenerBajas();

        const lista = respuesta.data
          .filter((u) => u.rol === "usuario" && !bajas.includes(u.user))
          .map((u) => {
            // Buscamos coincidencias flexibles por nombre, user o id
            const registrosAlumno = puntajesArray.filter((p) => {
              const nombreMatch =
                p.nombre && u.nombre && p.nombre.trim().toLowerCase() === u.nombre.trim().toLowerCase();
              const userMatch =
                p.user && u.user && p.user.trim().toLowerCase() === u.user.trim().toLowerCase();
              const idMatch = p.id && u.id && String(p.id) === String(u.id);
              return nombreMatch || userMatch || idMatch;
            });

            let maxJuego1 = 0;
            let maxJuego2 = 0;

            if (registrosAlumno.length > 0) {
              maxJuego1 = Math.max(...registrosAlumno.map((reg) => Number(reg.puntajeJuego1) || 0));
              maxJuego2 = Math.max(...registrosAlumno.map((reg) => Number(reg.puntajeJuego2) || 0));
            }

            return {
              user: u.user,
              nombre: u.nombre,
              puntajeJuego1: maxJuego1,
              puntajeJuego2: maxJuego2,
            };
          });

        setAlumnos(lista);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al cargar alumnos:", err);
        setError(true);
        setCargando(false);
      });
  }, []);

  const salir = () => {
    cerrarSesion();
    navegar("/");
  };

  const darDeBaja = (user) => {
    if (window.confirm("¿Seguro que querés dar de baja a este alumno?")) {
      darDeBajaUsuario(user);
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
  );
};

export default PanelDocente;