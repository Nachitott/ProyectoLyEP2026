import api from './api';

const getClientes = async () => {
    const response = await api.get('/users');
    return response.data;
};

const getClienteById = async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
};

const crearCliente = async (cliente) => {
    const response = await api.post('/users', cliente);
    return response.data;
};

const eliminarCliente = async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
};

export default { getClientes, getClienteById, crearCliente, eliminarCliente };