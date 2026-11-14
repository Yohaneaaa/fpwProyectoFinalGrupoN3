import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="text-center py-5">
      <h2>¡Ups! Esta página no existe 🐄</h2>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
};

export default Error;