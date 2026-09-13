import '../css/nav.css'
import { NavLink } from 'react-router-dom'
import { FiGrid, FiUsers } from 'react-icons/fi'

const Nav = () => {
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
            </ul>
        </nav>
    );

};
export default Nav;