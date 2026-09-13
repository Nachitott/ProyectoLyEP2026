import { Link } from "react-router-dom";
import FormCliente from "../components/FormCliente";
import "../css/listaclientes.css";

const NuevoCliente = () => {
  return (
    <div className="clientes-container">
      <div className="contenedor-volver">
        <Link to="/clientes" className="link-volver">
          &larr; Volver al Listado
        </Link>
      </div>

      <FormCliente />
    </div>
  );
};

export default NuevoCliente;