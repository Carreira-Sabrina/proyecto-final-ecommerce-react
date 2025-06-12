import { useState, useEffect, useContext } from "react";
//Css
import "../styles/Productos.css"

//Componentes
import TarjetaProducto from "../components/TarjetaProducto";
import Cargando from "../components/Cargando";
import Error from "../components/Error";

//Contexto
import { ContextoProductos } from "../context/ContextoProductos";

function Productos(){
    const {productos, cargando, error, obtenerProductosAPI} = useContext(ContextoProductos);

    useEffect(()=>{

        obtenerProductosAPI()
        
    },[])

    //Estado de carga
    if(cargando){
        return(
            <>
                <Cargando/>
            </>
        )
    }

    //Estado de error
    if(error){
        return(
            <>
                <Error/>
            </>
        )
    }

    return(
        <main>

            <section className="grilla-productos">
                {/* Los productos se generan aqui */}

                {
                    productos.map((producto)=>(
                        <TarjetaProducto key={producto.id} producto={producto}/>
                    ))
                }
            </section>

        </main>
    )

}

export default Productos;