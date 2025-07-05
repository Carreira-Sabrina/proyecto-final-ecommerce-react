import styled from "styled-components";


const StyledBotonPaginacion = styled.button`
    font-size: 1.25rem;
    background-color: #141414;
    color: #F0EFFB;
    padding: 0.75rem;
    border-radius: 0.5rem;
    margin-left: 1.25rem;
    cursor:pointer;
    transition: all 0.3s ease-in-out;

    &:hover{
        color: #141414;
        background-color: #F0EFFB;
    }
`

function PaginacionProductos({cantidadProductos,productosPorPagina,setPaginaActual}){

    let paginas = [];

    for(let i=1; i<= Math.ceil(cantidadProductos / productosPorPagina); i++ ){
        paginas.push(i)
    }

    return(
        <div className="contenedorPaginacion">
            {
                paginas.map((pagina, index)=>
                    <StyledBotonPaginacion key={index} onClick={()=>setPaginaActual(pagina)}>
                        {pagina}
                    </StyledBotonPaginacion>
                )
            }
        </div>
    )


}


export default PaginacionProductos;