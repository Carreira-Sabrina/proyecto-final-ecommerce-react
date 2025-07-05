import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const ContextoProductos = createContext();

export function ProveedorContextoProductos({children}){
    const [productosApi, setProductosApi] = useState([]); // Para llamar a la API una sola vez
    const [productos, setProductos] = useState([]);
    const [terminoBusqueda, setTerminoBusqueda] = useState(""); //Para controlar el input de filtrado
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    //Producto individual para pagina producto etc
    const [producto, setProducto] = useState({})

    const navigate = useNavigate()

    //URL de API (base)
    const API_BASE_URL = "https://67ef9ab42a80b06b8894eeea.mockapi.io/api/Ecommerce"

    useEffect(()=>{

        obtenerProductosAPI()
        
    },[])

    //Para filtrar productos con un imput (productosApi no deberia estar en la array de dependencias?)🦜🦜🦜
    useEffect(()=>{
        filtrarProductosPorNombre(terminoBusqueda)
    },[terminoBusqueda])

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
                setProductosApi(productosApi); //Esto no se toca hasta que algo cambie en la API
                setProductos(productosApi);
                setCargando(false)
            } catch (error) {
                setCargando(false)
                setError(error.message)
            }
    }

    //filtrar productos por nombre con lo que viene de barra de busqueda 🦜🦜🦜🦜 HARÁ FALTA PASAR UN PARAMETRO?
    function filtrarProductosPorNombre(termino){
        if(termino.trim()===""){
            setProductos(productosApi)
            return;
        }
        const terminoBusquedaMinusculas = termino.toLowerCase();
        const resultadoFiltro = productosApi.filter((producto)=> producto.nombre.toLowerCase().includes(terminoBusquedaMinusculas))
        setProductos(resultadoFiltro);
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
            } catch (err) {
                setCargando(false)
                console.log(err.message)
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
            

            //Actualizar la lista de productos
            const listaActualizada = [...productos, data]
            setProductos(listaActualizada)
            //Ahora si la api cambió !
            setProductosApi(listaActualizada)

            Swal.fire({text:"Producto agregado correctamente", icon:"success"})

            //Redirect
            navigate('/productos',{ replace: true })

        } catch (error) {
            Swal.fire({text:"Hubo un problema con la creación del producto", icon:"error"})
        }
    }

    //Modificar un producto de la API
    async function modificarProducto(producto){
        const API_URL = `${API_BASE_URL}/${producto.id}`;
        console.log(`La url del producto a modificar es ${API_URL}`)

        try {
            const respuesta = await fetch(API_URL, {
                method: "PUT",
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
            
            //Actualizar la lista de productos
            const listaActualizada = productos.map((item)=> item.id === producto.id ? producto : item)
            setProductos(listaActualizada)

            Swal.fire({text:"Producto modificado correctamente", icon:"success"})

            navigate('/productos',{ replace: true })

        } catch (error) {
            
            Swal.fire({text:"Hubo un problema al modificar producto", icon:"error"})
        }
    }

    //Eliminar un producto de la API
    async function eliminarProducto(id) {
        const API_URL = `${API_BASE_URL}/${id}`;
        console.log(API_URL)

        try {
            const respuesta = await fetch(API_URL, {
                method: "DELETE",
            });
            if(!respuesta.ok){
                console.log(`El error ha sido ${respuesta.status}`)
                throw new Error(`Error al eliminar el producto ${respuesta.status}`)      
            }
            Swal.fire({text:"Producto eliminado correctamente", icon:"success"})

            //Actualizar la lista de productos
            const listaActualizada = productos.filter((item)=>item.id !== id)
            setProductos(listaActualizada)

            //redireccionar a la pagina de productos
            navigate('/productos',{ replace: true })

        } catch (err) {
            Swal.fire({text:"Hubo un problema al intentar eliminar el producto", icon:"error"})
            console.log(err.message)
            }
    }



    const value =   {   productos, productosApi, setProductos, producto, cargando, error, terminoBusqueda,setTerminoBusqueda, filtrarProductosPorNombre,
                        obtenerProductosAPI,obtenerProducto,crearProducto,eliminarProducto,modificarProducto}

    return(
        <ContextoProductos.Provider value = {value}>
            {children}
        </ContextoProductos.Provider>
    )

}