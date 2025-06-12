import "../styles/Cargando.css"


import loading from "../assets/loading.gif"

//Una especie de spinner 
function Cargando(){

    return(
        <div className="contenedor-spinner">
                <img src={loading} alt="" className="spinner-cargando"/>
                <p>Cargando</p>
        </div>
    )
}


export default Cargando