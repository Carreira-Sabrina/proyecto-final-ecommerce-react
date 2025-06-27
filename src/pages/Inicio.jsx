//Componentes
import Hero from "../components/Hero";


//TEST ! 🦜🦜🦜🦜🦜🦜🦜🦜

//Contexto Autenticación
import { ContextoAutenticacion } from "../context/ContextoAutenticacion";
import { useContext } from "react";


function Inicio(){
    return(
        <>  
        
            <h1>Bienvenido a <span>TalentoTech Store </span></h1>

            <Hero/>
        
        </>
        
    )
}

export default Inicio;