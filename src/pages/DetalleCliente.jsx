import '../css/detallecliente.css'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAutorizaciones from "../hooks/useAutorizaciones";
import clientesService from "../services/clientesService";

const DetalleCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useAutorizaciones();

  const [cliente, setCliente] = useState(null);
  const [mensaje, setMensaje] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    clientesService.getClienteById(id)
      .then(data => { 
        setCliente(data); 
        setLoading(false); 
      })
      .catch(() => { 
        setError(true); 
        setLoading(false); 
      });
  }, [id]);

  const eliminarCliente = async () => {
    try {
      await clientesService.eliminarCliente(id);
      setMensaje("Cliente eliminado correctamente");
      setTimeout(() => navigate("/clientes"), 2000);
    } catch {
      setMensaje("Error al eliminar el cliente");
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "20px" }}>Cargando ficha del cliente...</h2>;
  }

  if (error || !cliente) {
    return <h2 style={{ color: "red", textAlign: "center", marginTop: "20px" }}>Error de conexión. No se pudo cargar el cliente.</h2>;
  }

  return (
    <div className="detalle-cliente">
      <h1>Ficha del Cliente</h1>
      <p>Rol actual: {admin?.sector}</p>

      {mensaje && <p className='mensaje-eliminado'>{mensaje}</p>}

      <p>
        <strong>ID:</strong> {cliente.id}
      </p>

      <p>
        <strong>Nombre:</strong>{" "}
        {cliente.name.firstname} {cliente.name.lastname}
      </p>

      <p>
        <strong>Email:</strong> {cliente.email}
      </p>

      <p>
        <strong>Teléfono:</strong> {cliente.phone}
      </p>

      <h2>Dirección</h2>

      <p>
        <strong>Calle:</strong> {cliente.address.street}
      </p>

      <p>
        <strong>Número:</strong> {cliente.address.number}
      </p>

      <p>
        <strong>Código Postal:</strong> {cliente.address.zipcode}
      </p>

      <p>
        <strong>Ciudad:</strong> {cliente.address.city}
      </p>

      <h2>Credenciales</h2>

      <p>
        <strong>Usuario:</strong> {cliente.username}
      </p>

      {admin?.sector?.trim() === "Gerencia" && (
        <button className='btn-eliminar' onClick={eliminarCliente}>
          Eliminar Cliente
        </button>
      )}
    </div>
  );
};

export default DetalleCliente;