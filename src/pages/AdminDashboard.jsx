import { useContext } from "react";
import { Link } from "react-router-dom";


import { ContextoAutenticacion } from "../context/ContextoAutenticacion";


function AdminDashboard(){

    //Del contexto de autenticacion
    const {usuarioActual,usuarioEsAdmin} = useContext(ContextoAutenticacion)


    return(
        <>
            <h1>Bienvenido <span>{usuarioActual.email}</span></h1>
            <main>
                <h2>Desde aquí puedes:</h2>
                <div>
                    <Link to="/crearproducto"> Agregar un producto</Link>

                </div>   
            </main>
        </>
        

        
    )

}


export default AdminDashboard;