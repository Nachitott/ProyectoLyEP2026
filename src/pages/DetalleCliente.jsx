import '../css/detallecliente.css'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button, Spinner } from "react-bootstrap";
import { FiTrash2, FiAlertTriangle } from "react-icons/fi";
 
const DetalleCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [cliente, setCliente] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => setCliente(data));
  }, [id]);

  const abrirModalEliminar = () => {
    setShowModal(true);
  };

  const cerrarModal = () => {
    if (!eliminando) {
      setShowModal(false);
    }
  };

  const confirmarEliminacion = async () => {
    setEliminando(true);
    try {
      const respuesta = await fetch(
        `https://fakestoreapi.com/users/${id}`,
        {
          method: "DELETE",
        }
      );

      if (respuesta.ok) {
        setShowModal(false);
        setMensaje("Cliente eliminado correctamente");

        setTimeout(() => {
          navigate("/clientes");
        }, 2000);
      } else {
        setMensaje("Error al eliminar cliente");
        setShowModal(false);
      }
    } catch {
      setMensaje("Error al eliminar cliente");
      setShowModal(false);
    } finally {
      setEliminando(false);
    }
  };

  if (!cliente) {
    return <h2>Cargando cliente...</h2>;
  }

  return (
    <div className="detalle-cliente">
      <h1>Ficha del Cliente</h1>
      <p>Rol actual: {role}</p>

      {mensaje && <p className = 'mensaje-eliminado'>{mensaje}</p>}

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

      <p>
        <strong>Contraseña:</strong> {cliente.password}
      </p>

      {role?.trim() === "Gerencia" && (
        <button className='btn-eliminar' onClick={abrirModalEliminar}>
          <FiTrash2 className="me-1" /> Eliminar Cliente
        </button>
      )}

      {/* Modal de Confirmación de Eliminación */}
      <Modal show={showModal} onHide={cerrarModal} centered>
        <Modal.Header closeButton={!eliminando}>
          <Modal.Title className="d-flex align-items-center text-danger">
            <FiAlertTriangle className="me-2" /> Confirmar Eliminación
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-2">
            ¿Está seguro de que desea eliminar al cliente{" "}
            <strong>
              {cliente.name?.firstname} {cliente.name?.lastname}
            </strong>{" "}
            (ID: {cliente.id})?
          </p>
          <p className="text-muted small mb-0">
            Esta acción no se puede deshacer.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={cerrarModal}
            disabled={eliminando}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={confirmarEliminacion}
            disabled={eliminando}
          >
            {eliminando ? (
              <>
                <Spinner size="sm" className="me-1" animation="border" /> Eliminando...
              </>
            ) : (
              <>
                <FiTrash2 className="me-1" /> Confirmar Eliminación
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetalleCliente;