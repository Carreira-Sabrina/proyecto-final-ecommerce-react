import { createContext, useState, useEffect } from "react";

// ------ Funciones auxiliares localStorage -------

function cargarCarritoLocalStorage(){
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    if (carrito){
        return carrito
    }
    return []
}

function guardarCarritoLocalStorage(carrito){
    localStorage.setItem("carrito", JSON.stringify(carrito))
}


export const ContextoCarrito = createContext();

export function ProveedorContextoCarrito({children}){

    //Simulacion login de muy bajo presupuesto, se pone acá porque el carrito es la
    //unica ruta protegida por el momento
    const [usuarioLoggeado,setUsuarioLoggeado] = useState(false);


    //Contenido del carrito
    const [contenidoCarrito, setContenidoCarrito] = useState(cargarCarritoLocalStorage);

    //Hay que contar los productos del carrito etc para actualizar el numerito del nav 🔍🦜
    //SE HACE CON contenidoCarrito.lenght y se renderiza en forma condicional

    useEffect(()=>{
        guardarCarritoLocalStorage(contenidoCarrito)
    },[contenidoCarrito])


    // ======= Funciones carrito =============

    function agregarProductoAlCarrito(producto){
        //Buscamos el producto en los productos del carrito

        let productoFiltrado = contenidoCarrito.find((item)=> item.id === producto.id)
        
        if(productoFiltrado){
            //Saco temporalmente el producto
            let tempContenidoCarrito = contenidoCarrito.filter((item)=> item.id !== productoFiltrado.id)

            producto.cantidad = producto.cantidad + 1;
            setContenidoCarrito([...tempContenidoCarrito, producto])

        }
        else{
            producto.cantidad = 1;
            //Actualizar contenidoCarrito //🦜🦜🦜🦜🦜🦜🦜
            setContenidoCarrito([...contenidoCarrito,producto])
        }    
    }

    function eliminarProductoDelCarrito(producto){

        let carritoActualizado = contenidoCarrito.filter((item)=>item.id !== producto.id)
        setContenidoCarrito(carritoActualizado)
        
        //El localStorage se actualiza mediante el useEffect con contenidoCarrito en la array de dependencias
    }


    function vaciarCarrito(){
        setContenidoCarrito([])
        //El localStorage se actualiza mediante el useEffect con contenidoCarrito en la array de dependencias
    }


    return(
        <ContextoCarrito.Provider   value={{contenidoCarrito,
                                            usuarioLoggeado,
                                            setUsuarioLoggeado,
                                            setContenidoCarrito, 
                                            agregarProductoAlCarrito,
                                            eliminarProductoDelCarrito,
                                            vaciarCarrito
                                            }} >
            {children}
        </ContextoCarrito.Provider>
    );

}