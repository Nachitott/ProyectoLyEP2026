import { Routes, Route } from 'react-router-dom'

import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import ListaClientes from '../pages/ListaClientes'
import DetalleCliente from '../pages/DetalleCliente'
import ErrorPage from '../pages/ErrorPage'
import RutaProtegida from '../components/RutaProtegida'
import MainLayout from '../layouts/MainLayout'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Ruta pública sin Header ni Nav */}
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas envueltas en MainLayout */}
      <Route
        element={
          <RutaProtegida>
            <MainLayout />
          </RutaProtegida>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/clientes" element={<ListaClientes />} />
        <Route path="/clientes/:id" element={<DetalleCliente />} />
      </Route>

      {/* Ruta 404 */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default AppRoutes