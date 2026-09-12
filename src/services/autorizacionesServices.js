/**
 * MOCK TEMPORAL DE AUTENTICACIÓN
 * Se eliminaron las credenciales estáticas por seguridad (CWE-798).
 * Pendiente: Conectar con API real para validación segura mediante JWT.
 */
const usuarios = [
  {
    email: 'antonella@gmail.com',
    nombre: 'Antonella',
    sector: 'Soporte'
  },
  {
    email: 'jimena@gmail.com',
    nombre: 'Jimena',
    sector: 'Gerencia'
  },
  {
    email: 'maia@gmail.com',
    nombre: 'Maia',
    sector: 'Gerencia'
  },
  {
    email: 'abril@gmail.com',
    nombre: 'Abril',
    sector: 'Soporte'
  },
  {
    email: 'guadalupe@gmail.com',
    nombre: 'Guadalupe',
    sector: 'Soporte'
  },
  {
    email: 'lourdes@gmail.com',
    nombre: 'Lourdes',
    sector: 'Gerencia'
  }
]
const login = (email, password, sector) => {
  // Simula la llamada al backend que devuelve usuario y JWT
  const usuario = usuarios.find(u => u.email === email && u.sector === sector);
  
  if (usuario) {
    return { ...usuario, token: "eyJhbGciOiJIUzI1NiIsInR5c... (simulacion JWT)" };
  }
  return null;
}
export default {
  login
}