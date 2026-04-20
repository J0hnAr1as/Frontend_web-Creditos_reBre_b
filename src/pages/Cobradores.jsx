import { useEffect, useState } from "react"
import api from "../services/api"

export default function Cobradores() {
  const [cobradores, setCobradores] = useState([])
  const [clientes, setClientes] = useState([])

  // Cargar usuarios con rol COBRADOR
  const cargarCobradores = async () => {
    try {
      const res = await api.get("/users")
      const solo = res.data.filter(u => u.rol === "COBRADOR")
      setCobradores(solo)
    } catch (error) {
      console.error("Error cargando cobradores", error)
    }
  }

  // 🔥 Ahora trae CLIENTES asignados al cobrador
  const verClientes = async (id) => {
    try {
      const res = await api.get("/clientes/cobrador/" + id)
      setClientes(res.data)
    } catch (error) {
      console.error("Error cargando clientes", error)
    }
  }

  useEffect(() => {
    cargarCobradores()
  }, [])

  return (
    <div>
      <h2>Cobradores</h2>

      <ul>
        {cobradores.map(c => (
          <li key={c._id}>
            {c.nombre}
            <button onClick={() => verClientes(c._id)}>
              Ver clientes
            </button>
          </li>
        ))}
      </ul>

      <hr />

      <h3>Clientes asignados</h3>

      <ul>
        {clientes.map(cl => (
          <li key={cl._id}>
            {cl.nombre} - {cl.cedula} - {cl.telefono}
          </li>
        ))}
      </ul>
    </div>
  )
}