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
                            onChange={(e)=> {console.log(e.target.value) ;setTerminoBusqueda(e.target.value)}}
                    />
                </form>
                
                

            </section>

            <section className="grilla-productos">
                {/* Los productos se generan aqui */}

                {
                    productos.length >0     ?   productos.map((producto)=>(
                                                        <TarjetaProducto key={producto.id} producto={producto}/>
                                                        ))
                                            :   <StyledBusquedaVacia>
                                                    No hay productos que cumplan con el criterio
                                                </StyledBusquedaVacia>    


                    
                }
            </section>

        </main>
    )

}

export default Productos;