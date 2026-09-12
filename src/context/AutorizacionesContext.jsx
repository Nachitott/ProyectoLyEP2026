import { useState, useEffect } from 'react'
import { AutorizacionesContext } from './autorizacionesContextInstance'

const leerAdminGuardado = () => {
  const adminGuardado = localStorage.getItem('admin')
  if (!adminGuardado) return null

  try {
    return JSON.parse(adminGuardado)
  } catch (error) {
    console.warn('Se encontró un valor corrupto en localStorage["admin"]. Se eliminará.', error)
    localStorage.removeItem('admin')
    return null
  }
}

const AutorizacionesProvider = ({ children }) => {
  const [admin, setAdmin] = useState(leerAdminGuardado)

  useEffect(() => {
    if (admin) {
      localStorage.setItem('admin', JSON.stringify(admin))
    } else {
      localStorage.removeItem('admin')
    }
  }, [admin])

  const cerrarSesion = () => {
    setAdmin(null)
    localStorage.removeItem('role')
  }

  return (
    <AutorizacionesContext.Provider
      value={{ admin, setAdmin, cerrarSesion }}
    >
      {children}
    </AutorizacionesContext.Provider>
  )
}

export default AutorizacionesProvider