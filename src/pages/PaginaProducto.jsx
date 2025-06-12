import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

//Css
import "../styles/PaginaProducto.css"

//Contextos
import { ContextoCarrito } from "../context/ContextoCarrito";
import { ContextoProductos } from "../context/ContextoProductos";

//React icons
import { FaCartPlus } from "react-icons/fa6";

//Componentes
import Cargando from "../components/Cargando";
import Error from "../components/Error";


function PaginaProducto(){
    //Detalle de un producto por id
    const {id} = useParams()

    const {cargando, error, producto, obtenerProducto} = useContext(ContextoProductos);

    //Functiones que vinen del contexto
    const {contenidoCarrito,agregarProductoAlCarrito} = useContext(ContextoCarrito)

    function enviarProductoAlCarrito(producto){
        //Esta funcion es un auxiliar que localiza el producto a enviar en el contenidoCarrito
        //Si aun no está en el carrito, envía el item, si no, aumenta su cantidad
        const productoAEnviar = contenidoCarrito.find((item)=> item.id===producto.id)

        //Si el producto existe en el carrito, recupero la cantidad
        if(productoAEnviar){
            //El producto está en el carrito, ya tiene cantidad, mandarlo asi
            agregarProductoAlCarrito(productoAEnviar)
        }
        else{
            agregarProductoAlCarrito(producto)
        }
    }

    useEffect(()=>{
        obtenerProducto(id);
        console.log(producto)
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
        <main className="main">
            {
                producto && 
                <article className="contenedor-producto">

                    <div className="contenedor-producto__imagen">
                        <img src={producto.imagen} alt="" />
                    </div>

                    <div className="contenedor-producto__info">
                        <h2>{producto.nombre}</h2>

                        <p className="contenedor-producto__info-descripcion">{producto.descripcion}</p>

                        <p>Precio: <span>${producto.precio}</span></p>

                        {/*OJO ! SI AGREGO DESDE ACA NO TIENE LA CANTIDAD !  */}
                        {/*hay que llamar a una funcion que ubique al item en el carrito y si existe,*/}
                        {/*mandarlo con la cantidad*/}
                        <button className="btn-tarjeta-producto btn-agregar-carrito" 
                                onClick={()=>enviarProductoAlCarrito(producto)}>
                                Agregar al carrito <span><FaCartPlus /></span>
                        </button>
                        <div className="contenerdor-navegacion">
                        <Link to="/productos" className="btn-navegacion">Volver al listado de productos</Link>
                        </div>
                    </div>

                </article>
            }
            
        </main>
    )

}
export default PaginaProducto;