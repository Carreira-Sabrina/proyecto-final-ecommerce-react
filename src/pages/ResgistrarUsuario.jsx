import { useState, useContext } from "react";
import { Link } from "react-router-dom";


//Contexto Autenticación
import { ContextoAutenticacion } from "../context/ContextoAutenticacion";


function RegistrarUsuario(){

    const [credencialesUsuario, setCredencialesUsuario] = useState({email:"", password:""})
    const [errorFormulario, setErrorFormulario] = useState({})

    //Estados y funciones que vienen del contexto de Autenticacion
    const {usuario, crearUsuario} = useContext(ContextoAutenticacion)

    function onChangeCamposFormulario(e){
        const {name, value} = e.target;
        setCredencialesUsuario({...credencialesUsuario, [name]: value})
    }

    async function onSubmitFormularioRegistro(e){
        e.preventDefault();
        //Funcion del contexto de autenticación
        crearUsuario(credencialesUsuario.email, credencialesUsuario.password)

        //SWEET ALERT 🦜🦜🦜🦜🦜
        alert("USUARIO CREADO CORRECTAMENTE 😊")

        //Limpiar formulario 🦜🦜🦜🦜🦜
        setCredencialesUsuario({email:"", password:""})

        //Redirect 🦜🦜🦜❓❓❓❓❓❓❓
        //ANTES DEL REDIRECT HABRIA QUE VER SI EL USUARIO ES ADMIN ???

    }

    return(
        <main>
            <h1>Crea tu usuario</h1>
            <h3>Ya estás registado? Inicia sesión</h3>

            <form onSubmit={onSubmitFormularioRegistro}>
                <div className="campo-formulario">
                    <label htmlFor="email">Ingresa tu email</label>
                    <input  type="email" name="email" id="email" required 
                            placeholder="email@host.com"
                            value={credencialesUsuario.email}
                            onChange={onChangeCamposFormulario} 
                    />
                </div>

                <div className="campo-formulario">
                    <label htmlFor="password">Ingresa tu password</label>
                    <input  type="password" name="password" id="password" required 
                            value={credencialesUsuario.password}
                            onChange={onChangeCamposFormulario} 
                    />
                </div>

                <button type="submit">Crear usuario</button>

                <div>
                    <p>Debug</p>
                    {
                        usuario && <p>{usuario.email}</p>
                    }
                </div>

            </form>
        </main>
    )
}


export default RegistrarUsuario;