import { Link } from 'react-router-dom';
import '../css/errorpage.css';

const ErrorPage = () => {
  return (
    <div className="error-container">
      <div className="error-card">
        <span className="error-codigo">404</span>
        <h1 className="error-titulo">Página no encontrada</h1>
        <p className="error-descripcion">
          Lo sentimos, la página que buscas no existe o la dirección web es incorrecta.
        </p>
        <Link to="/" className="btn-volver-dashboard">
          &larr; Volver al Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;