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

    const [terminoBusqueda, setTerminoBusqueda] = useState("")

    const { productos, setProductos, cargando, error, obtenerProductosAPI, filtrarProductosPorNombre,productosFiltrados
            } = useContext(ContextoProductos);


    useEffect(() => {
        filtrarProductosPorNombre(terminoBusqueda);
    }, [terminoBusqueda]); // Dependencias: el término y la función de filtrado.  [terminoBusqueda,filtrarProductosPorNombre]


    function buscarProductos(e){
        e.preventDefault();
        //setTerminoBusqueda(e.target.value)
        filtrarProductosPorNombre(terminoBusqueda)
    }

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
                            onChange={(e)=>setTerminoBusqueda(e.target.value)}
                            
                    />
                    <button  >
                        Buscar
                    </button>
                </form>

            </section>

            <section className="grilla-productos">
                {/* Los productos se generan aqui */}

                {
                    productosFiltrados.length >0    ?   productosFiltrados.map((producto)=>(
                                                        <TarjetaProducto key={producto.id} producto={producto}/>
                                                        ))
                                                    : <p>No hay productos que cumplan con el criterio</p>    


                    
                }
            </section>

        </main>
    )

}

export default Productos;