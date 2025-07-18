import { useState, useContext } from "react"
import { toast } from "react-toastify";

//Css
import "../styles/ItemCarrito.css"

//Contexto
import { ContextoCarrito } from "../context/ContextoCarrito";

//React icons
import { FaRegSquareMinus } from "react-icons/fa6";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6"; 


function ItemCarrito({producto}){
    //Contexto
    const {     contenidoCarrito,
                setContenidoCarrito,
                eliminarProductoDelCarrito,
                } = useContext(ContextoCarrito)


    const [datosProducto, setDatosProducto] = useState(producto)

    //Handlers de los botones
    function aumentarCantidadProductoCarrito(){
        const nuevoContenidoCarrito = contenidoCarrito.map((item)=>{
            if(item.id === datosProducto.id){
                const productoModificado = {...item, cantidad: item.cantidad + 1}
                //Actualizar el estado del producto
                setDatosProducto(productoModificado)
                return productoModificado
            }else{
                return item
            }
        })
        //Actualizar el estado del carrito
        setContenidoCarrito(nuevoContenidoCarrito)
    }

    function disminuirCantidadProductoCarrito(){    
        if(producto.cantidad >1){
            const nuevoContenidoCarrito = contenidoCarrito.map((item)=>{
                if(item.id === datosProducto.id){
                    const productoModificado = {...item, cantidad: item.cantidad - 1}
                    //Actualizar el estado del producto
                    setDatosProducto(productoModificado)
                    return productoModificado
                }else{
                    return item
                }
            })
            setContenidoCarrito(nuevoContenidoCarrito)
        }
        else{
            //Se elimina el producto del carrito !
            eliminarProductoDelCarrito(datosProducto)
        }
    }
    
    return(
        <article className="item-carrito">
            <div className="center">
                <img src={producto.imagen} alt={producto.nombre} className="carrito__img"/>
            </div>
            
            <div>
                <h4>{producto.nombre}</h4>
                <p className="producto__data__precio">Precio unitario <span>${producto.precio}</span></p>
                <button aria-label="Eliminar producto del carrito"
                        className="btn-producto btn-producto__eliminar" 
                        onClick={()=>{{eliminarProductoDelCarrito(datosProducto); 
                            toast.warning("Producto eliminado del carrito")}} 
                        }>
                            <FaTrashCan aria-hidden="true" />
                </button>
            </div>
            
            <div className="producto__data__cantidad">
                <button aria-label="Quitar una unidad del producto"
                        className="btn-producto btn_producto_menos" 
                        onClick={disminuirCantidadProductoCarrito}>
                        <FaRegSquareMinus aria-hidden="true" /> 
                </button>

                <span className="span-cantidad">{producto.cantidad}</span>
                        
                <button aria-label="Aumentar una unidad del producto"
                        className="btn-producto btn_producto_mas" 
                        onClick={aumentarCantidadProductoCarrito}>
                    <FaRegSquarePlus aria-hidden="true" />
                </button>
            </div>

            <div className="producto__data__subtotal">
                        <p>Subtotal <span>${producto.cantidad * producto.precio}</span></p>
            </div>        
        </article>
    )
}


export default ItemCarrito