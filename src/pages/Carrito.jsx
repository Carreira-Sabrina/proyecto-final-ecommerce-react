import { useContext,useState,useEffect } from "react";
import { Helmet } from "react-helmet";
//Css
import "../styles/Carrito.css"

//SweetAlert
import Swal from 'sweetalert2'        
//Toastify
import { ToastContainer } from "react-toastify";
//Contexto 
import { ContextoCarrito } from "../context/ContextoCarrito";

//Componentes
import ItemCarrito from "../components/ItemCarrito";

//React icons
import { FaCircleCheck } from "react-icons/fa6"; //<FaCircleCheck />
import { FaCircleXmark } from "react-icons/fa6"; //<FaCircleXmark />



function Carrito(){
    //Functiones y estado que vinen del contexto
    const { contenidoCarrito, vaciarCarrito} = useContext(ContextoCarrito)
    
    //Funcion auxiliar para calcular el total del carrito
    function calcularTotalCarrito(){
        const total = contenidoCarrito.reduce((suma, item)=>{
            return suma + (item.cantidad*item.precio)
        },0)
        return total.toFixed(2)
    }
    //El total del carrito es reactivo, depende de la cantidad de productos que se van agregando
    const [totalCarrito, setTotalCarrito] = useState(calcularTotalCarrito)

    //Manejador del botón finalizar compra
    function handleFinalizarCompra(){
        //Sólo se puede comprar si hay algo en el carrito !
        if(contenidoCarrito.length >0){
            //Disparar sweetAlert
            Swal.fire({
                title: "Estás listo para finalizar tu compra?",
                text: `Total a pagar $ ${totalCarrito}`,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Pagar",
                denyButtonText: `Volver al carrito`,
                customClass:{
                    title:"custom-swal-title",
                    htmlContainer: "custom-swal-text",
                    confirmButton: "custom-swal-confirm-btn",
                }
        }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        text:"Muchas gracias por tu compra !",
                        icon: "success",
                        customClass:{
                            htmlContainer: "custom-swal-text",
                            confirmButton: "custom-swal-confirm-btn",
                        }
                    });
                    //El carro se vacía acá
                    vaciarCarrito()
                } else if (result.isDenied) {
                    Swal.fire({
                        text:"Volvés al carrito",
                        icon: "info",
                        customClass:{
                            htmlContainer: "custom-swal-text",
                            confirmButton: "custom-swal-confirm-btn",
                        }
                });
            }});
        }else{
            Swal.fire({
                title: "Tu carrito está vacío",
                text: "Por qué no eliges algunos productos?",
                icon: "info",
                customClass:{
                    title:"custom-swal-title",
                    htmlContainer: "custom-swal-text",
                    confirmButton: "custom-swal-confirm-btn",
                }
                });
        }
        
    }

    //Manejador del botón de vaciar carrito
    function handleVaciarCarrito(){
        if(contenidoCarrito.length >0){
            Swal.fire({
                icon: "question",
                title: "Estas seguro que quieres vaciar el carrito?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Vaciar el carrito",
                denyButtonText: `No vaciar el carrito`,
                customClass:{
                    title:"custom-swal-title",
                    htmlContainer: "custom-swal-text",
                    confirmButton: "custom-swal-confirm-btn",
                }
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Tu carrito ha sido vaciado",
                    icon: "success",
                    customClass:{
                        title:"custom-swal-title",
                        confirmButton: "custom-swal-confirm-btn",
                    }
                });
                //Acá se vacía el carrito
                vaciarCarrito()
            } else if (result.isDenied) {
                Swal.fire({
                    title: "Volvés al carrito",
                    icon: "info",
                    customClass:{
                        title:"custom-swal-title",
                        confirmButton: "custom-swal-confirm-btn",
                    }
                });
            }
            });
        }else{
            Swal.fire({
                title: "Carrito vacío",
                text: "No puedes vaciar algo que ya está vacío ;)",
                icon: "info",
                customClass:{
                    title:"custom-swal-title",
                    htmlContainer: "custom-swal-text",
                    confirmButton: "custom-swal-confirm-btn",
                }
            });
        }  
    }

    //Disparar el cambio de total en carrito
    useEffect(()=>{
        setTotalCarrito(calcularTotalCarrito)
    },[contenidoCarrito])

    return(
        <>
            <Helmet>
                <title>Carrito de compras | TalentoTesch Store</title>
                <meta   name="description"
                        content="Estás a un paso de realizar tu compra"
                />
            </Helmet>

            <main>
                <h1>Tu carrito</h1>

                <div className="contenedor_carrito">

                    <section className="display-productos-carrito">
                    
                        {
                            contenidoCarrito.length > 0 ?
                                contenidoCarrito.map((item)=>(
                                <ItemCarrito key={item.id} producto={item} />
                                )   )
                        : <p className="contenedor_carrito_vacio">Tu carrito está vacio</p>
                        }
                    </section>
                    
                    {/*Sólo muestro el checkout si hay algo en el carrito */}
                    {
                        contenidoCarrito.length > 0 &&

                        <section className="display-checkout-carrito">
                            <h3>Resumen de tu compra</h3>
                            <p>Total $ <span>{totalCarrito}</span></p>
                            <button 
                                onClick={handleFinalizarCompra}>
                                    Finalizar compra <span className="icono-btn-carrito icono-btn__comprar"><FaCircleCheck /></span>
                            </button>
                            <button 
                                onClick={handleVaciarCarrito}>Vaciar carrito <span className="icono-btn-carrito icono-btn__cancelar"><FaCircleXmark/></span>
                            </button>
                    </section>

                    }
                    
                    
                </div>
            <ToastContainer/>
            </main>
        </>
        
    )
}

export default Carrito;