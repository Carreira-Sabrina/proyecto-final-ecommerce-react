import { useContext } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";

//Imágenes
import cardAdmin from "../assets/site/CardAdmin.jpg"
import pagProdAdmin from "../assets/site/PaginaProductoAdminEdit.jpg"


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
const DivFlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
`
const StyledParagrapgh = styled.p`
    font-size: 1.25rem;
    margin-top:1.5rem;
`

const StyledImage = styled.img`
    max-width: 550px;
`

const StyledStrong = styled.strong`
    color: #F72585;
    font-style: italic;
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
                <DivFlexColumn>

                    <StyledLink to="/crearproducto"> Agregar un producto</StyledLink>

                    <StyledParagrapgh>Para eliminar o editar productos puedes hacerlo desde el <StyledStrong>botón de la tarjeta del producto </StyledStrong> 
                        o desde su página individual en la <StyledStrong>Sección sólo para administradores</StyledStrong> :
                    </StyledParagrapgh>

                    <StyledImage src={cardAdmin} alt="Tarjeta de producto en la tienda" />

                    <StyledImage src={pagProdAdmin} alt="Detalle página individual del producto" />

                    <Link to="/productos" className="btn-navegacion">Volver al listado de productos</Link>
                    
                </DivFlexColumn>   
            </main>
        </>
        

        
    )

}


export default AdminDashboard;