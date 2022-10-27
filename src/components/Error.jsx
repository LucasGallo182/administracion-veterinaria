const Error = ({ children }) => { //Children es lo que esta entre las etiquetas <Error>aca</Error> pueden ser multiples lineas HTML
    return (
        <div className="bg-red-800 text-white text-center p-3 uppercase font-bold mb-3 rounded-lg">
            {children}
        </div>
    )
}

export default Error