import { useContext } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";


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
                    <Link to="/crearproducto"> Agregar un producto</Link>

                </div>   
            </main>
        </>
        

        
    )

}


export default AdminDashboard;