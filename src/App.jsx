import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { AlumnoContext } from './contexts/AlumnoContext';

function App() {
  const [nombre, setNombre] = useState('');
  const navegar = useNavigate();
  const { guardarNombreAlumno } = useContext(AlumnoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
   if (nombre.trim() !== ""){ 
    guardarNombreAlumno(nombre);
    navegar('/juego1');
   }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>Proyecto Final - Grupo N3</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <h2>Login / Ingreso</h2>
        <input
          type="text"
          placeholder="Ingresá tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ padding: '8px', fontSize: '16px', marginRight: '8px' }}
          required
        />
        <button type="submit" style={{ padding: '8px 16px', fontSize: '16px' }}>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default App;