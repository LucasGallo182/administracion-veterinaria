import { useState, useEffect } from "react"
import Error from "./Error"

const Form = ({ pacientes, setPacientes, paciente, setPaciente }) => {
    const [nombre, setNombre] = useState('')
    const [duenio, setDuenio] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')

    //Mensaje de error
    const [error, setError] = useState(false)
        
    useEffect( () => {
        if (Object.entries(paciente).length > 0) { //Object.entries, ver si el objeto esta vacio o no
            setNombre(paciente.nombre)
            setDuenio(paciente.duenio)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    }, [paciente])

    const generarId = () => {
        const random = Math.random().toString(36).substr(2)
        const fecha = Date.now().toString(36)

        return random + fecha
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //Validacion del formulario
        if( [ nombre, duenio, email, fecha, sintomas ].includes('') ) {
            setError(true)
            return
        }
        setError(false)

        //Objeto de paciente con la props
        const objetoPaciente = {
            nombre, 
            duenio, 
            email, 
            fecha, 
            sintomas
        }

        if (paciente.id) {
            //Editando el registro
            objetoPaciente.id = paciente.id

            const pacientesActualizados = pacientes.map((pacienteState) => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
        
            setPacientes(pacientesActualizados)
            setPaciente({})
        } else {
            //Nuevo registro
            objetoPaciente.id = generarId()
            setPacientes([...pacientes, objetoPaciente])
        }

        //Reiniciar el form
        setNombre('')
        setDuenio('')
        setEmail('')
        setFecha('')
        setSintomas('')
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
            <p className="text-xl mt-5 text-center mb-10">
                Añade {''}
                <span className="text-indigo-600 font-bold">pacientes y administralos</span>
            </p>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
                {error && <Error><p>Todos los campos son obligatorios</p></Error>} {/* Esto es el CHILDREN para pasar multiple codigo HTML */}
                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
                        Nombre mascota
                    </label> {/* block hace que tome todo el espacio disponible la linea label */}
                    <input
                        id="mascota"
                        type="text"
                        placeholder="Nombre de la mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="duenio" className="block text-gray-700 uppercase font-bold">
                        Nombre dueño
                    </label>
                    <input
                        id="duenio"
                        type="text"
                        placeholder="Nombre del dueño"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={duenio}
                        onChange={(e) => setDuenio(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email contacto del dueño"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
                        Alta
                    </label>
                    <input
                        id="alta"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
                        Sintomas
                    </label>
                    <textarea
                        id="sintomas"
                        placeholder="Describe los sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all rounded-md"
                    value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente' }
                />
            </form>
        </div>
    )
}

export default Form
