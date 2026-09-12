import "../css/listaclientes.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clientesService from "../services/clientesService";

import FormCliente from "../components/FormCliente";
import useDebounce from "../hooks/useDebounce";
import { Spinner, Alert } from "react-bootstrap";

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const busquedaDebounced = useDebounce(busqueda, 300);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const handleClienteCreado = (nuevoCliente) => {
  setClientes((prevClientes) => [nuevoCliente, ...prevClientes]);
};

    const cargarClientes = () => {
    setLoading(true);
    setError(false);
    clientesService.getClientes()
      .then(data => { 
        setClientes(data); 
        setLoading(false); 
      })
      .catch(() => { 
        setError(true); 
        setLoading(false); 
      });
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const clientesFiltrados = clientes.filter((cliente) => {
  const termino = busquedaDebounced.toLowerCase().trim();
  if (!termino) return true;
  const nombre = cliente?.name?.firstname?.toLowerCase() ?? "";
  const apellido = cliente?.name?.lastname?.toLowerCase() ?? "";
  const email = cliente?.email?.toLowerCase() ?? "";
  const ciudad = cliente?.address?.city?.toLowerCase() ?? "";
  const telefono = cliente?.phone?.toLowerCase() ?? "";
  return (
    nombre.includes(termino) ||
    apellido.includes(termino) ||
    email.includes(termino) ||
    ciudad.includes(termino) ||
    telefono.includes(termino)
  );
});

if (loading) {
  return (
    <div className="text-center my-5 py-5">
      <Spinner animation="border" variant="primary" role="status" />
      <p className="mt-3 text-muted">Cargando clientes del sistema...</p>
    </div>
  );
}

if (error) {
  return (
    <div className="clientes-container mt-4">
      <Alert variant="danger" className="text-center">
        <Alert.Heading>Error de conexión</Alert.Heading>
        <p>Ocurrió un error al cargar los clientes desde la API.</p>
        <hr />
        <button 
          onClick={cargarClientes} 
          className="btn btn-outline-danger font-weight-bold"
        >
          Reintentar conexión
        </button>
      </Alert>
    </div>
  );
}

  return (
    <div className="clientes-container">


      <h1>Clientes</h1>
      <FormCliente onClienteCreado={handleClienteCreado} />

      <hr />

      <div className="header-acciones">
        <Link to="/clientes/nuevo" className="btn-ficha btn-nuevo-cliente">
         +Nuevo cliente</Link>
      </div>


      <div className="contenedor-buscador">

        <h2 className="titulo-buscador">
          Buscar Clientes
        </h2>

        <input
          className="buscador"
          type="text"
          placeholder="Buscar por nombre, apellido, email, ciudad o teléfono..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <p className="cantidad-clientes">
          Clientes encontrados: {clientesFiltrados.length}
        </p>

      </div>
      <table className="tabla-clientes">

        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Ciudad</th>
            <th>Acciones</th>
          </tr>
        </thead>

<tbody>
  {clientesFiltrados.length === 0 ? (
    <tr>
      <td colSpan="6" className="text-center py-4 text-muted">
        No se encontraron clientes que coincidan con "<strong>{busqueda}</strong>".
      </td>
    </tr>
  ) : (
    clientesFiltrados.map((cliente) => (
      <tr key={cliente.id}>
        <td>{cliente.id}</td>
        <td>
          {cliente?.name?.firstname ?? ""} {cliente?.name?.lastname ?? ""}
        </td>
        <td>{cliente.email}</td>
        <td>{cliente.phone}</td>
        <td>{cliente.address?.city ?? "-"}</td>
        <td>
          <Link className="btn-ficha" to={`/clientes/${cliente.id}`}>
            Ver Ficha Completa
          </Link>
        </td>
      </tr>
    ))
  )}
</tbody>

      </table>

    </div>
  );
};

export default ListaClientes;