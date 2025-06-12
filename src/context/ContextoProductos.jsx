import { createContext, useState, useEffect } from "react";

export const ContextoProductos = createContext();

export function ProveedorContextoProductos({children}){

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    //Producto individual para pagina producto etc
    const [producto, setProducto] = useState({})

    //Obtener Productos API
    async function obtenerProductosAPI(){
        const API_URL = "https://67ef9ab42a80b06b8894eeea.mockapi.io/api/Ecommerce"

        try {
                const respuesta = await fetch(API_URL);
                if(!respuesta.ok){
                    console.log(`El error ha sido ${respuesta.status}`)
                    throw new Error(`Hubo un error ${respuesta.status}`)
                    
                }
                const productosApi = await respuesta.json()
                setProductos(productosApi);
                setCargando(false)
            } catch (error) {
                setCargando(false)
                console.log("HAY UN BICHO FEO EN TU CODIGO")
                setError(error.message)
            }
    }

    //Encontrar producto por ID
    async function obtenerProducto(id){
        const API_URL = `https://67ef9ab42a80b06b8894eeea.mockapi.io/api/Ecommerce/${id}`

        try {
                const respuesta = await fetch(API_URL);
                if(!respuesta.ok){
                    console.log(`El error ha sido ${respuesta.status}`)
                    throw new Error(`Hubo un error ${respuesta.status}`)
                    
                }
                const productoApi = await respuesta.json()
                setProducto(productoApi);
                setCargando(false)
            } catch (error) {
                setCargando(false)
                console.log("HAY UN BICHO FEO EN TU CODIGO")
                setError(error.message)
            }

    }

    //Agregar un producto a la API
    async function crearProducto(producto){
        const API_URL = "https://67ef9ab42a80b06b8894eeea.mockapi.io/api/Ecommerce";

        try {
            const respuesta = await fetch(API_URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    },
                body: JSON.stringify(producto)
            });
            if(!respuesta.ok){
                console.log(`El error ha sido ${respuesta.status}`)
                throw new Error(`Error al crear el producto ${respuesta.status}`)      
            }
            const data = await respuesta.json();
            console.log('Producto agregado:', data);
            alert('Producto agregado correctamente');

            //NO HAY QUE HACER UN REDIRECT? 🦜🦜🦜🦜🦜🦜🦜

        } catch (error) {
            alert('HUBO UN PROBLEMA AL AGREGAR EL PRODUCTO');
        }
    }

    //Modificar un producto de la API

    //Eliminar un producto de la API

    

    const value ={productos,producto, cargando, error, obtenerProductosAPI,obtenerProducto,crearProducto}

    return(
        <ContextoProductos.Provider value = {value}>
            {children}
        </ContextoProductos.Provider>
    )

}