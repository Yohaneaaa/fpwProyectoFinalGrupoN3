import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Login from "../components/login";
import Error from "../pages/error";
import Juego1 from "../pages/Juego1";
import Juego2 from "../pages/juego2";
import Resultados from "../pages/Resultados";
import PanelDocente from "../pages/panelDocente";
import ProtectorRuta from "../components/ProtectorRuta";
import { ProveedorContext } from "../contexts/AutorizacionesContext";
import { ProveedorAlumno } from "../contexts/AlumnoContext";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Login /> },
      {
        path: "juego1",
        element: <ProtectorRuta><Juego1 /></ProtectorRuta>,
      },
      {
        path: "juegodos",
        element: <ProtectorRuta><Juego2 /></ProtectorRuta>,
      },
      {
        path: "resultados",
        element: <ProtectorRuta><Resultados /></ProtectorRuta>,
      },
      {
        path: "docente",
        element: <ProtectorRuta rolRequerido="admin"><PanelDocente /></ProtectorRuta>,
      },
    ],
  },
]);

export const Enrutador = () => {
  return (
    <ProveedorAlumno>
      <ProveedorContext>
        <RouterProvider router={routes} />
      </ProveedorContext>
    </ProveedorAlumno>
  );
};