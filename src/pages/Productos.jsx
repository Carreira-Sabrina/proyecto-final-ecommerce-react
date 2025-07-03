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

    const { productos, cargando, error,terminoBusqueda,setTerminoBusqueda } = useContext(ContextoProductos);

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
            <section className="seccion-busqueda">
                <form>
                    <input  type="text" name="buscarProductos" id="buscarProductos"
                            placeholder="Busca un producto" 
                            value={terminoBusqueda}
                            onChange={(e)=> {console.log(e.target.value) ;setTerminoBusqueda(e.target.value)}}
                            
                    />
                </form>

            </section>

            <section className="grilla-productos">
                {/* Los productos se generan aqui */}

                {
                    productos.length >0    ?   productos.map((producto)=>(
                                                        <TarjetaProducto key={producto.id} producto={producto}/>
                                                        ))
                                                    : <p>No hay productos que cumplan con el criterio</p>    


                    
                }
            </section>

        </main>
    )

}

export default Productos;