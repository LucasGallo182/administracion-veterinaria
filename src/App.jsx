import { useState, useEffect } from "react"
import Form from "./components/Form"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {
  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})

  //Verifico si el arreglo estaba vacio en localStorage, si no esta vacio no resetea
  useEffect(() => {
    const pacientesLS = JSON.parse(localStorage.getItem('pacientes'))
    pacientesLS?.length > 0 && setPacientes(pacientesLS) //En vez de dar error pacientesLS.length, es undefined con el ?
  }, [])

  //Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])

  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id)
    setPacientes(pacientesActualizados)
  }

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex justify-center">
        <Form
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
