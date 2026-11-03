import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Juego1 from "../pages/Juego1";
import Juego2 from "../pages/juego2"
import { ProveedorContext } from "../contexts/AutorizacionesContext";
import { ProveedorAlumno } from "../contexts/AlumnoContext";

export const Enrutador = () => {
    return (
        <ProveedorAlumno>
            <ProveedorContext>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/juego1" element={<Juego1 />} />
                        <Route path="/juego2" element={<Juego2 />} />
                    </Routes>
                </BrowserRouter>
            </ProveedorContext>
        </ProveedorAlumno>
    );
};