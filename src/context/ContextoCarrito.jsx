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
    //Contenido del carrito
    const [contenidoCarrito, setContenidoCarrito] = useState(cargarCarritoLocalStorage);

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
                                            setContenidoCarrito, 
                                            agregarProductoAlCarrito,
                                            eliminarProductoDelCarrito,
                                            vaciarCarrito
                                            }} >
            {children}
        </ContextoCarrito.Provider>
    );

}