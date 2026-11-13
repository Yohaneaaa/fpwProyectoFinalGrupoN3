import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../components/login"; 
import Juego1 from "../pages/Juego1";
import Juego2 from "../pages/juego2";
import Resultados from "../pages/Resultados";
import { ProveedorContext } from "../contexts/AutorizacionesContext";
import { ProveedorAlumno } from "../contexts/AlumnoContext";

export const Enrutador = () => {
    return (
        <ProveedorAlumno>
            <ProveedorContext>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />}>
                            <Route index element={<Login />} />
                            <Route path="juego1" element={<Juego1 />} />
                            <Route path="juegodos" element={<Juego2 />} />
                            <Route path="resultados" element={<Resultados />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ProveedorContext>
        </ProveedorAlumno>
    );
};