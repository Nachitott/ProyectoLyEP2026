import '../css/nav.css'
import { NavLink } from 'react-router-dom'
import { FiGrid, FiUsers, FiUserPlus } from 'react-icons/fi'
import useAutorizaciones from '../hooks/useAutorizaciones'

const Nav = () => {
    const { admin } = useAutorizaciones();

    // Ocultar la barra de navegación si no hay sesión activa
    if (!admin) {
        return null;
    }

    return (
        <nav className="nav">
            <ul className="nav-lista">
                <li>
                    <NavLink to="/">
                        <FiGrid className="me-1" /> Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/clientes">
                        <FiUsers className="me-1" /> Clientes
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/clientes/nuevo">
                        <FiUserPlus className="me-1" /> Nuevo Cliente
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;