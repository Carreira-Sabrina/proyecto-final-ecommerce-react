import { useState, useContext } from "react";
import { Helmet } from "react-helmet";


//Contexto Autenticación
import { ContextoAutenticacion } from "../context/ContextoAutenticacion";

//Styled-components
import { AuthButton, AuthLink, AuthLinkContainer, NoteContainer } from "../components/styled-components/AuthStyledComponents";


function RegistrarUsuario(){
    const [credencialesUsuario, setCredencialesUsuario] = useState({email:"", password:""})
    const [errorFormulario, setErrorFormulario] = useState({})

    //Estados y funciones que vienen del contexto de Autenticacion
    const {crearUsuario} = useContext(ContextoAutenticacion)

    function onChangeCamposFormulario(e){
        const {name, value} = e.target;
        setCredencialesUsuario({...credencialesUsuario, [name]: value})
    }

    async function onSubmitFormularioRegistro(e){
        e.preventDefault();
        //Funcion del contexto de autenticación
        crearUsuario(credencialesUsuario.email, credencialesUsuario.password)

        //Limpiar formulario
        setCredencialesUsuario({email:"", password:""})
    }

    return(
            <>
                <Helmet>
                        <title>TalentoTesch Store | Registro de usuarios</title>
                        <meta   name="description"
                                content="Crea tu cuenta para disfrutar más funciones en nuestra tienda online"
                        />
                </Helmet>

                <main>
                    <h1>Crea tu usuario</h1>
                    <AuthLinkContainer>
                        Ya estás registado? <span><AuthLink to="/login">Inicia sesión</AuthLink></span>
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

                        <AuthButton type="submit">Crear usuario</AuthButton>



                    </form>
                </main>
            </>
    )
}


export default RegistrarUsuario;