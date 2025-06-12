import { useState,useContext } from "react";

//Css
import "../styles/CrearProducto.css"

//Contexto
import { ContextoProductos } from "../context/ContextoProductos";

function CrearProducto(){
    //Estados y funciones que vienen del contexto
    const {crearProducto} = useContext(ContextoProductos);

    const [nuevoProducto, setNuevoProducto] = useState({nombre:"",
                                                        precio:"",
                                                        imagen:"",
                                                        descripcion:""});

    //Errores de los input
    const [erroresCampoFormulario, setErroresCampoFormulario] = useState({})

    function onChangeCampoFormulario(e){
        const {name, value} = e.target;
        setNuevoProducto({...nuevoProducto, [name]:value});
    }

    function validarFormulario(){
        const erroresFormulario = {}

        //El nombre del producto tiene que tener al menos 3 letras
        if (nuevoProducto.nombre.trim().length < 3){
            erroresFormulario.nombre = "El nombre del producto debe tener al menos 3 letras"
            console.log(erroresFormulario.nombre)
        }
        //Tiene que haber un precio y debe ser un número > 0
        if(!nuevoProducto.precio || nuevoProducto.precio < 0){
            erroresFormulario.precio = "Debes ingresar un precio mayor a cero"
        }
        //Tiene que haber una URL de imagen. Por ahora sólo sabe Dios si es una URL válida 🦜🦜🦜🦜🦜🦜
        if(!nuevoProducto.imagen){
            erroresFormulario.imagen = "Debes ingresar la URL de una imagen"
        }
        //Tiene que haber una descripción de al menos 10 caracteres
        if(nuevoProducto.descripcion.trim().length < 10){
            erroresFormulario.descripcion = "La descripción del producto debe tener al menos 10 caracteres"
        }

        setErroresCampoFormulario(erroresFormulario)

        //Si el return da un objeto no vacío es que algo anda mal con el formulario

        return Object.keys(erroresFormulario).length === 0;
    }

    function onSubmitFormulario(e){
        e.preventDefault();

        if(validarFormulario()){
            crearProducto(nuevoProducto)

            //Limpiar formulario y errores
            setNuevoProducto({nombre:"", precio: "", imagen:"", descripcion:""})
            setErroresCampoFormulario({})
        }

        else{
            //ESTE ES UN BUEN LUGAR PARA UN SWEETALERT !!!!! 🦜🦜🦜🦜🦜🦜
            console.log("FALTAN DATOS EN EL FORMULARIO")
        }
        
    }

    return(
        <main>
            <h1>Completa los datos para crear un nuevo producto</h1>
            <form onSubmit={onSubmitFormulario} className="formulario-productos">

                <div className="campo-formulario">
                    <label htmlFor="nombre">Nombre del producto:</label>
                    <input  type="text" name="nombre" id="nombre" 
                            value={nuevoProducto.nombre} onChange={onChangeCampoFormulario}
                    />
                </div>

                <div className="campo-formulario">
                    <label htmlFor="precio">Precio del producto: $</label>
                    <input  type="text" name="precio" id="precio" 
                            value={nuevoProducto.precio} onChange={onChangeCampoFormulario} 
                    />
                </div>

                <div className="campo-formulario">
                    <label htmlFor="imagen">URL de la imagen:</label>
                    <input  type="text" name="imagen" id="imagen" 
                            value={nuevoProducto.imagen} onChange={onChangeCampoFormulario}
                    />
                </div>

                <div className="campo-formulario">
                    <label htmlFor="descripcion">Descripción del producto:</label>
                    <textarea   name="descripcion" id="descripcion" 
                                value={nuevoProducto.descripcion} onChange={onChangeCampoFormulario} 
                    />
                </div>
                <div className="botones-formulario">
                    <button className="btn-crear-producto">Cancelar</button>
                    <button className="btn-cancelar-creacion" type="submit">Crear nuevo producto</button>
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
    )

}

export default CrearProducto;