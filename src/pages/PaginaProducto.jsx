import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
//Css
import "../styles/PaginaProducto.css"

//Contextos
import { ContextoCarrito } from "../context/ContextoCarrito";
import { ContextoProductos } from "../context/ContextoProductos";
import { ContextoAutenticacion } from "../context/ContextoAutenticacion";

//React icons
import { FaCartPlus } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

//Componentes
import Cargando from "../components/Cargando";
import Error from "../components/Error";


function PaginaProducto(){
    //Detalle de un producto por id
    const {id} = useParams()

    const {cargando, error, producto, obtenerProducto, eliminarProducto, modificarProducto} = useContext(ContextoProductos);

    const {contenidoCarrito,agregarProductoAlCarrito} = useContext(ContextoCarrito);

    const{usuarioEsAdmin} = useContext(ContextoAutenticacion);


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
            <>
                <Helmet>
                        <title>TalentoTesch Store | Detalle de producto</title>
                        <meta   name="description"
                                content="Aquí puedes ver un producto en detalle"
                        />
                </Helmet>
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
                                        onClick={()=>{enviarProductoAlCarrito(producto); toast.success("Producto agregado al carrito") }}>
                                        Agregar al carrito <span><FaCartPlus /></span>
                                </button>
                                <div className="contenerdor-navegacion">
                                <Link to="/productos" className="btn-navegacion">Volver al listado de productos</Link>
                                </div>
                                {/*Botones que sólo se renderizan si el usuario es admin */}
                                {
                                    usuarioEsAdmin&&
                                        <div className="botones-admin">
                                            <h3>Sección solo para Administradores</h3>
                                            <button onClick={()=>eliminarProducto(id)}
                                                    className="btn-tarjeta-producto btn-admin-eliminar"
                                            >
                                                Eliminar <span><FaTrashCan/></span> 
                                            </button>
                                            <Link   to={`/editarproducto/${id}`}
                                                    className="btn-navegacion btn-admin-editar"
                                            >
                                                Editar
                                                <span> <FaRegEdit/> </span>
                                            </Link>
                                        </div>
                                }

                            </div>

                        </article>
                    }
                <ToastContainer/>    
                </main>
            </>
                
    )

}
export default PaginaProducto;