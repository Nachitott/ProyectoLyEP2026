import { Link } from "react-router-dom";
import FormCliente from "../components/FormCliente";
import "../css/listaclientes.css";

const NuevoCliente = () => {
  return (
    <div className="clientes-container">
      <div className="header-acciones">
        <Link to="/clientes" className="btn-ficha btn-volver">
          &larr; Volver al Listado
        </Link>
      </div>

      <FormCliente />
    </div>
  );
};

export default NuevoCliente;