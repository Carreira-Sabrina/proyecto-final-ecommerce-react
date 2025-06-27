import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";


//Contexto Autenticacion
import { ContextoAutenticacion } from "../context/ContextoAutenticacion";

function Login(){
    //Estados y funciones que vienen del contexto de Autenticacion
    const {iniciarSesion,usuarioEsAdmin,cargandoAuth,usuarioActual} = useContext(ContextoAutenticacion);
    //Estados locales (inputs y errores formulario)
    const [credencialesUsuario, setCredencialesUsuario] = useState({email:"", password:""})
    const [errorFormulario, setErrorFormulario] = useState({})

    //Navigate
    const navigate = useNavigate()


    //El useEffect es quien debe manejar la redireccion segun el estado de admin o no
    useEffect(() => {
        //Si la autenticación ya cargó y si hay un usuario
        if (!cargandoAuth && usuarioActual) {
            if (usuarioEsAdmin) {
                //TODO: REDIRIGIR A UN DASHBOARD (ADMIN) 🦜🦜🦜🦜🦜🦜
                console.log("Redirigiendo a /crearproducto (USUARIO ES ADMIN)");
                navigate("/crearproducto");
            } else {
                //TODO: REDIRIGIR A UN DASHBOARD (NO ADMIN)🦜🦜🦜🦜🦜🦜
                console.log("Redirigiendo a /productos (USUARIO NO ES ADMIN)");
                navigate("/productos");
            }
        }
        // Si no hay usuario (es decir, después de un logout o si no se ha iniciado sesión)
        // y ya no está cargando, podemos redirigir a una página de inicio de sesión
        // o dejarlo en la página actual si ya está en ella.
        if (!cargandoAuth && !usuarioActual) {
            console.log("Condición de no usuario (no cargando y NO hay usuario)");
            // Opcional: podrías redirigir a "/" o alguna otra página si el usuario no está logueado
            // if (window.location.pathname !== "/") {
            //     navigate("/");
            // }

        }
    }, [usuarioActual, usuarioEsAdmin, cargandoAuth, navigate]); // Dependencias del useEffect


    function onChangeCamposFormulario(e){
        const {name, value} = e.target;
        setCredencialesUsuario({...credencialesUsuario, [name]: value})
    }

    async function onSubmitFormularioRegistro(e){
        e.preventDefault();

        try{
            //Funcion del contexto de autenticación
            await iniciarSesion(credencialesUsuario.email,credencialesUsuario.password)
            //Limpiar formulario
            setCredencialesUsuario({email:"", password:""})
        }catch (error) {
            //Los alerts se disparan en iniciarSesion
            console.error("Error al intentar iniciar sesión en el componente Login:", error);
        }
    }

    return(
        <main>
            <h1>Inicia sesión</h1>
            <h3>
                No estás registrado? <Link to="/registrarse">Registrate aquí</Link>
            </h3>

            <div>
                <p> NOTA: a los efectos de prueba, y al no contar base de datos, se aceptarán como administradores los usuarios 
                    creados con los siguientes emails:
                </p>
                <ul>
                    <li>admin@admin.com</li>
                    <li>optimus@admin.com</li>
                    <li>holmes@admin.com</li>
                    <li>ghost@admin.com</li>
                </ul>
            </div>

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

                <button type="submit">Iniciar sesión</button>


            </form>
        </main>
    )

}


export default Login;