import '../css/header.css'
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import useAutorizaciones from "../hooks/useAutorizaciones";

const Header = () => {
    const { admin, cerrarSesion } = useAutorizaciones();
    const navigate = useNavigate()
    const manejarCerrarSesion = () => {
        cerrarSesion()
        navigate('/login')
    }
    return (
        <Navbar>
            <Container>
                <Navbar.Brand>
                    Panel de Control de Clientes
                </Navbar.Brand>
                {
                    admin && (
                        <div className="usuario-header">
                            <p>
                                {admin.nombre} - {admin.sector}
                            </p>
                            <Button className="btn-header"
                                onClick={manejarCerrarSesion}
                            >
                                <FiLogOut className="me-1" /> Cerrar Sesion
                            </Button>
                        </div>
                    )
                }
            </Container>
        </Navbar>

    )
}
export default Header;