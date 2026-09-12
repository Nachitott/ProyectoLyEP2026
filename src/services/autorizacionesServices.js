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
  return usuarios.find(
    usuario =>
      usuario.email === email &&
      usuario.password === password &&
      usuario.sector === sector
  )
}
export default {
  login
}