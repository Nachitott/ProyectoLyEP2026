import "../css/listaclientes.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormCliente from "../components/FormCliente";
import useDebounce from "../hooks/useDebounce";

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const busquedaDebounced = useDebounce(busqueda, 300);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const handleClienteCreado = (nuevoCliente) => {
  setClientes((prevClientes) => [nuevoCliente, ...prevClientes]);
};

  useEffect(() => {
    fetch("https://fakestoreapi.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener clientes");
        }
        return res.json();
      })
      .then((data) => {
        setClientes(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
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
    return <h2>Cargando clientes...</h2>;
  }

  if (error) {
    return <h2>Error al cargar los clientes.</h2>;
  }

  return (
    <div className="clientes-container">

      <h1>Clientes</h1>
      <FormCliente onClienteCreado={handleClienteCreado} />

      <hr />

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

          {clientesFiltrados.map((cliente) => (
            <tr key={cliente.id}>

              <td>{cliente.id}</td>

              <td>
                {cliente.name.firstname} {cliente.name.lastname}
              </td>

              <td>{cliente.email}</td>

              <td>{cliente.phone}</td>

              <td>{cliente.address.city}</td>

              <td>
                <Link
                  className="btn-ficha"
                  to={`/clientes/${cliente.id}`}
                >
                  Ver Ficha Completa
                </Link>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default ListaClientes;