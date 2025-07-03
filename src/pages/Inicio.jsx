import { Helmet } from "react-helmet";

//Componentes
import Hero from "../components/Hero";


function Inicio(){
    return(
        <>  
            <Helmet>
                        <title>TalentoTesch Store</title>
                        <meta   name="description"
                                content="Bienvenido a nuestra tienda online"
                        />
            </Helmet>
            <h1>Bienvenido a <span>TalentoTech Store </span></h1>

            <Hero/>
        
        </>
        
    )
}

export default Inicio;