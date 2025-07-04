import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";


//Contexto Autenticacion
import { ContextoAutenticacion } from "../context/ContextoAutenticacion";

//Styled-components
import { AuthButton, AuthLink, AuthLinkContainer, NoteContainer } from "../components/styled-components/AuthStyledComponents";


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
                navigate("/dashboardadmin");
            } else {
                navigate("/productos");
            }
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
            <>
                <Helmet>
                        <title>TalentoTesch Store | Iniciar sesión</title>
                        <meta   name="description"
                                content="Inicia sesión para ver tu carrito"
                        />
                </Helmet>
                <main>
                    <h1>Inicia sesión</h1>
                    <AuthLinkContainer>
                        No estás registrado? <span><AuthLink to="/registrarse">Registrate aquí</AuthLink></span>
                    </AuthLinkContainer>

                    <NoteContainer>
                        <p> NOTA: a los efectos de prueba, y al no contar base de datos, se aceptarán como administradores los usuarios 
                            creados con los siguientes emails:
                        </p>
                        <ul>
                            <li>admin@admin.com</li>
                            <li>optimus@admin.com</li>
                            <li>holmes@admin.com</li>
                            <li>ghost@admin.com</li>
                        </ul>
                    </NoteContainer>

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

                        <AuthButton type="submit">
                            Iniciar sesión
                        </AuthButton>
                    </form>
                </main>
            </>
                
    )

}

export default Login;