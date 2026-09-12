import '../css/login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import useAutorizaciones from '../hooks/useAutorizaciones'
import AutorizacionesService from '../services/autorizacionesServices'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errores, setErrores] = useState({})
  const [loginInvalido, setLoginInvalido] = useState(false)
  const { setAdmin } = useAutorizaciones()
  const navigate = useNavigate()

  const validar = () => {
    const nuevosErrores = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      nuevosErrores.email = 'El email es obligatorio'
    } else if (!emailRegex.test(email)) {
      nuevosErrores.email = 'Email inválido'
    }
    if (!password) {
      nuevosErrores.password = 'La contraseña es obligatoria'
    } else {
      if (password.length < 8) {
        nuevosErrores.password = 'Mínimo 8 caracteres'
      } else if (!/[A-Z]/.test(password)) {
        nuevosErrores.password = 'Debe tener una mayúscula'
      } else if (!/[0-9]/.test(password)) {
        nuevosErrores.password = 'Debe tener un número'
      }
    }
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const manejarSubmit = (e) => {
    e.preventDefault()
    setLoginInvalido(false)
    if (!validar()) return

    const usuario = AutorizacionesService.login(email, password)

    if (!usuario) {
      setLoginInvalido(true)
      return
    }

    setAdmin({
      nombre: usuario.nombre,
      email: usuario.email,
      sector: usuario.sector
    })
    navigate('/')
  }

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>

      {loginInvalido && (
        <Alert variant="danger">
          Verifique los datos ingresados
        </Alert>
      )}

      <form onSubmit={manejarSubmit}>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <p style={{ color: 'red', minHeight: '18px' }}>
          {errores.email || ' '}
        </p>
        <label>Contraseña:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <p style={{ color: 'red', minHeight: '18px' }}>
          {errores.password || ' '}
        </p>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  )
}
export default Login