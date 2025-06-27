import { createContext, useState, useEffect } from "react";

export const ContextoProductos = createContext();

export function ProveedorContextoProductos({children}){
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    //Producto individual para pagina producto etc
    const [producto, setProducto] = useState({})

    //URL de API (base)
    const API_BASE_URL = "https://67ef9ab42a80b06b8894eeea.mockapi.io/api/Ecommerce"

    //Los productos de la api ahora se obtienen en el contexto
    useEffect(()=>{

        obtenerProductosAPI()
        
    },[])

    //Obtener Productos API
    async function obtenerProductosAPI(){
        const API_URL = API_BASE_URL;

        try {
                const respuesta = await fetch(API_URL);
                if(!respuesta.ok){
                    console.log(`El error ha sido ${respuesta.status}`)
                    throw new Error(`Hubo un error ${respuesta.status}`)
                    
                }
                const productosApi = await respuesta.json()
                setProductos(productosApi);
                //Lo que se renderiza en el filtro es el resultado del filtro
                setProductosFiltrados(productosApi);
                setCargando(false)
            } catch (error) {
                setCargando(false)
                console.log("HAY UN BICHO FEO EN TU CODIGO")
                setError(error.message)
            }
    }

    //filtrar productos por nombre con lo que viene de barra de busqueda
    function filtrarProductosPorNombre(terminoBusqueda){
        if(!terminoBusqueda){
            setProductosFiltrados(productos)
            return;
        }
        const terminoBusquedaMinusculas = terminoBusqueda.toLowerCase();
        const resultadoFiltro = productos.filter((producto)=> producto.nombre.toLowerCase().includes(terminoBusquedaMinusculas))
        setProductosFiltrados(resultadoFiltro);
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
        const API_URL = API_BASE_URL;

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
    async function modificarProducto(producto){

    }

    //Eliminar un producto de la API
    async function eliminarProducto(producto) {
        
    }



    const value =   {   productos, setProductos, producto, cargando, error, productosFiltrados, filtrarProductosPorNombre,
                        obtenerProductosAPI,obtenerProducto,crearProducto}

    return(
        <ContextoProductos.Provider value = {value}>
            {children}
        </ContextoProductos.Provider>
    )

}