import { useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
//Css
import "../styles/TarjetaProducto.css"

//Contexto 
import { ContextoCarrito } from "../context/ContextoCarrito";
import { ContextoAutenticacion } from "../context/ContextoAutenticacion";
import { ContextoProductos } from "../context/ContextoProductos";

//React icons
import { FaCartPlus } from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";
import { FaRegEdit } from "react-icons/fa";


function TarjetaProducto({producto}){

    //Functiones y estados que vinen del contexto
    const {agregarProductoAlCarrito} = useContext(ContextoCarrito)
    const {eliminarProducto} = useContext(ContextoProductos)
    const {usuarioEsAdmin} = useContext(ContextoAutenticacion);

    const {id, nombre, precio, descripcion, imagen} = producto;


    return(
        <article className="tarjeta-producto">
            <div className="tarjeta-producto__img">
                <img src={imagen} alt={nombre} />
            </div>
            <div className="tarjeta-producto__datos">
                <h3>{nombre}</h3>
                <p>${precio}</p>
                <div className="tarjeta-producto__botones">
                    {/* Hay algunos cambios en los botones dependiendo si el usuario es admin o no */}
                    <button    className="btn-tarjeta-producto btn-agregar-carrito" 
                                onClick={()=>{
                                agregarProductoAlCarrito(producto);
                                toast.success("Producto agregado al carrito")
                                }}>
                                Agregar al carrito <span><FaCartPlus /></span>
                    </button>

                    <Link to={`/productos/${id}`} className="btn-tarjeta-producto btn-pagina-dinamica">
                        {
                            usuarioEsAdmin  ?   (   
                                                    <>
                                                        Ver detalle y editar
                                                        <span><FaRegEdit /></span>
                                                    </>

                                                )
                                            :   (   
                                                    <>
                                                        Ver detalle
                                                        <span><CgWebsite /></span>
                                                    </>

                                                )
                        }
                                                    
                    </Link>

                </div>
            </div>
            <ToastContainer/>
        </article>
    ) 
}

export default TarjetaProducto;