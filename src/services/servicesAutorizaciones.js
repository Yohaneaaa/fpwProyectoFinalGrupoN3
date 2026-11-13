import { listarUsuarios } from './servicesUsuarios';

const servicesAutorizaciones = (() => {

    const login = async (user, password) => {
        try {
            const usuarios = await listarUsuarios();

            const listaUsuarios = Array.isArray(usuarios) ? usuarios : (usuarios.data || []);

            const encontrado = listaUsuarios.find(
                u => String(u.user).trim() === String(user).trim() && String(u.password).trim() === String(password).trim()
            );
            
            if (!encontrado) {
                return null;
            }
                    
            return { id: encontrado.id, nombre: encontrado.nombre, rol: encontrado.rol };        
        } catch (error) {
            return null;
        }
    };

    return { login };
}) ();

export default servicesAutorizaciones;