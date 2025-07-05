import { useState, useEffect, useContext } from "react";
//Css
import "../styles/Productos.css"

//Componentes
import TarjetaProducto from "../components/TarjetaProducto";
import Cargando from "../components/Cargando";
import Error from "../components/Error";

//Contexto
import { ContextoProductos } from "../context/ContextoProductos";

/*===================================================================================================== */
//Styled-components
import styled from "styled-components";
import PaginacionProductos from "../components/PaginacionProductos";

const StyledInput = styled.input`
    font-size: 1.25rem;
    border: 2px solid #B5179E;
    padding: 0.5rem;
    border-radius: 0.5rem;
`
const StyledBusquedaVacia = styled.p`
    font-size: 2rem;
    text-align: center;
    color: #F72585;
    font-weight: bold;
`

/*===================================================================================================== */

function Productos(){

    const { productos, cargando, error,terminoBusqueda,setTerminoBusqueda } = useContext(ContextoProductos);

    //Para la paginación
    const [paginaActual, setPaginaActual] = useState(1);
    const cantidadProductos = productos.length;
    const productosPorPagina = 6;
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosEnPagina = productos.slice(indicePrimerProducto,indiceUltimoProducto);

    //Para eliminar conflicto entre paginacion y filtro
    useEffect(() => {
        setPaginaActual(1);
    }, [productos, terminoBusqueda]);

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
                    <StyledInput
                            type="text" name="buscarProductos" id="buscarProductos"
                            placeholder="Busca un producto" 
                            value={terminoBusqueda}
                            onChange={(e)=> setTerminoBusqueda(e.target.value)}
                    />
                </form>
                
                

            </section>

            <section className="grilla-productos">
                {/* Los productos se generan aqui */}

                {
                    productos.length >0     ?   productosEnPagina.map((producto)=>(
                                                        <TarjetaProducto key={producto.id} producto={producto}/>
                                                        ))
                                            :   <StyledBusquedaVacia>
                                                    No hay productos que cumplan con el criterio
                                                </StyledBusquedaVacia>    


                    
                }
                
            </section>
            <section>
                <PaginacionProductos 
                    cantidadProductos={cantidadProductos} 
                    productosPorPagina={productosPorPagina}
                    setPaginaActual={setPaginaActual}
                />
            </section>

        </main>
    )

}

export default Productos;