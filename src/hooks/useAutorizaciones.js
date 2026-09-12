import { useContext } from 'react'
import { AutorizacionesContext } from '../context/autorizacionesContextInstance'

const useAutorizaciones = () => {
  return useContext(AutorizacionesContext)
}

export default useAutorizaciones