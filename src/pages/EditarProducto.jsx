import { useParams, Link } from "react-router-dom";
import { useContext, useEffect,useState } from "react";
import { Helmet } from "react-helmet";

//Contextos
import { ContextoProductos } from "../context/ContextoProductos";

//Css
import "../styles/CrearProducto.css"


function EditarProducto(){
    const {id} = useParams();

    const {producto,obtenerProducto, modificarProducto} = useContext(ContextoProductos);

    //El producto modificado es un obhjeto
    const [productoModificado, setProductoModificado] = useState({id: producto.id,
                                                        nombre:producto.nombre,
                                                        precio:producto.precio,
                                                        imagen:producto.imagen,
                                                        descripcion:producto.descripcion})


    useEffect(()=>{
            obtenerProducto(id);
        },[])
    
    //Errores de los input
    const [erroresCampoFormulario, setErroresCampoFormulario] = useState({})
    
    function onChangeCampoFormulario(e){
            const {name, value} = e.target;
            setProductoModificado({...productoModificado, [name]:value});
    }
    
    function validarFormulario(){
        const erroresFormulario = {}
    
        //El nombre del producto tiene que tener al menos 3 letras
        if (productoModificado.nombre.trim().length < 3){
            erroresFormulario.nombre = "El nombre del producto debe tener al menos 3 letras"
            console.log(erroresFormulario.nombre)
        }
        //Tiene que haber un precio y debe ser un número > 0
        if(!productoModificado.precio || productoModificado.precio < 0){
            erroresFormulario.precio = "Debes ingresar un precio mayor a cero"
        }
        //Tiene que haber una URL de imagen. Por ahora sólo sabe Dios si es una URL válida 🦜🦜🦜🦜🦜🦜
        if(!productoModificado.imagen){
            erroresFormulario.imagen = "Debes ingresar la URL de una imagen"
        }
        //Tiene que haber una descripción de al menos 10 caracteres
        if(productoModificado.descripcion.trim().length < 10){
            erroresFormulario.descripcion = "La descripción del producto debe tener al menos 10 caracteres"
        }
    
        setErroresCampoFormulario(erroresFormulario)
    
        //Si el return da un objeto no vacío es que algo anda mal con el formulario  
        return Object.keys(erroresFormulario).length === 0;
    }
    
    function onSubmitFormulario(e){
        e.preventDefault();
    
        if(validarFormulario()){
            modificarProducto(productoModificado)
    
            //Limpiar formulario y errores
            setProductoModificado({nombre:"", precio: "", imagen:"", descripcion:""})
            setErroresCampoFormulario({})
        }
    
        else{
            //ESTE ES UN BUEN LUGAR PARA UN SWEETALERT !!!!! 🦜🦜🦜🦜🦜🦜
            console.log("FALTAN DATOS EN EL FORMULARIO")
            }
    }
    
        return(
                <>
                    <Helmet>
                        <title>Sección sólo para administradores | TalentoTesch Store</title>
                        <meta   name="description"
                                content="Aquí puedes editar los productos en la tienda"
                        />
                    </Helmet>
                    <main>
                        <h1>Modifica los datos del producto aquí</h1>
                        <form onSubmit={onSubmitFormulario} className="formulario-productos">
            
                            <div className="campo-formulario">
                                <label htmlFor="nombre">Nombre del producto:</label>
                                <input  type="text" name="nombre" id="nombre" 
                                        value={productoModificado.nombre} onChange={onChangeCampoFormulario}
                                />
                            </div>
            
                            <div className="campo-formulario">
                                <label htmlFor="precio">Precio del producto: $</label>
                                <input  type="text" name="precio" id="precio" 
                                        value={productoModificado.precio} onChange={onChangeCampoFormulario} 
                                />
                            </div>
            
                            <div className="campo-formulario">
                                <label htmlFor="imagen">URL de la imagen:</label>
                                <input  type="text" name="imagen" id="imagen" 
                                        value={productoModificado.imagen} onChange={onChangeCampoFormulario}
                                />
                            </div>
            
                            <div className="campo-formulario">
                                <label htmlFor="descripcion">Descripción del producto:</label>
                                <textarea   name="descripcion" id="descripcion" 
                                            value={productoModificado.descripcion} onChange={onChangeCampoFormulario} 
                                />
                            </div>
                            <div className="botones-formulario">
                                <Link  to={`/productos/${id}`} className="btn-cancelar-creacion">Cancelar</Link>
                                <button className="btn-crear-producto" type="submit">Modificar Producto</button>
                            </div>
            
                            {/* Render condicional de los errores del formulario */}
                            
                            <div className="contenedor-errores-formulario">
                                {
                                    Object.keys(erroresCampoFormulario).length > 0 &&
                                    
                                    Object.values(erroresCampoFormulario).map((value,index)=>(
                                        <p className="errores-formulario" key={index}>{value}</p>
                                    ))
                                    
            
                                
                                }
                            </div>
                            
                        </form>
            
                    </main>
                </>      
        )

}


export default EditarProducto;