import { useContext } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";


//==========================================================================
//  *** Styled components   ***

const StyledLink = styled(Link)`
    display: inline-block;
    margin-top: 1.25rem;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    text-decoration: none;
    color: #F0EFFB;
    background-color: #00AFB5;
    font-size: 1.25rem;
    font-weight: bold;
    border: 2px solid transparent;
    transition: all 0.3s ease-in-out;

    &:hover{
        color: #00AFB5;
        background-color: #F0EFFB;
        border: 2px solid #00AFB5;
    }
`




//==========================================================================

import { ContextoAutenticacion } from "../context/ContextoAutenticacion";


function AdminDashboard(){

    //Del contexto de autenticacion
    const {usuarioActual,usuarioEsAdmin} = useContext(ContextoAutenticacion)


    return(
        <>
            <Helmet>
                <title>Sección sólo para administradores | TalentoTesch Store</title>
                <meta   name="description"
                        content="Aquí puedes agregar productos a la tienda"
                />
            </Helmet>

            <h1>Bienvenido <span>{usuarioActual.email}</span></h1>
            <main>
                <h2>Desde aquí puedes:</h2>
                <div>
                    <StyledLink to="/crearproducto"> Agregar un producto</StyledLink>

                </div>   
            </main>
        </>
        

        
    )

}


export default AdminDashboard;