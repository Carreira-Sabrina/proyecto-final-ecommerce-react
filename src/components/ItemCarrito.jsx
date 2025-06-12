import { useState, useContext } from "react"

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
                <img src={producto.image} alt="" className="carrito__img"/>
            </div>
            
            <div>
                <h4>{producto.title}</h4>
                <p className="producto__data__precio">Precio unitario <span>${producto.price}</span></p>
                <button className="btn-producto btn-producto__eliminar" 
                                onClick={()=>eliminarProductoDelCarrito(datosProducto)}>
                            <FaTrashCan />
                </button>
            </div>
            
            <div className="producto__data__cantidad">
                <button className="btn-producto btn_producto_menos" 
                        onClick={disminuirCantidadProductoCarrito}>
                        <FaRegSquareMinus /> 
                </button>

                <span className="span-cantidad">{producto.cantidad}</span>
                        
                <button className="btn-producto btn_producto_mas" onClick={aumentarCantidadProductoCarrito}>
                    <FaRegSquarePlus />
                </button>
            </div>

            <div className="producto__data__subtotal">
                        <p>Subtotal <span>${producto.cantidad * producto.price}</span></p>
            </div>        
                    
        </article>
    )
}


export default ItemCarrito