import { useState, useContext } from "react"
import { Link } from "react-router-dom";

//Css
import "../styles/Navbar.css"

//Contexto
import { ContextoCarrito } from "../context/ContextoCarrito";
import { ContextoAutenticacion } from "../context/ContextoAutenticacion";

//React icons
import { GiHamburgerMenu } from "react-icons/gi"; //menu hamburguesa
import { FaTimes } from "react-icons/fa"; // boton X
import { FaHouseChimney } from "react-icons/fa6";
import { FaGift } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa6"; //<FaUserCheck /> login ok
import { FaUserXmark } from "react-icons/fa6"; // <FaUserXmark /> login no

function Navbar(){

    const [mostrarMenuMovil, setMostrarMenuMovil] = useState(false);

    const {contenidoCarrito} = useContext(ContextoCarrito)
    const {auth,usuarioActual,usuarioEsAdmin,cerrarSesion} = useContext(ContextoAutenticacion)

    function cambiarMenuMovil(){
        setMostrarMenuMovil(!mostrarMenuMovil);
    }

    //Cuando haga click en un link si estoy en el menu movil, lo tengo que cerrar
    function cerrarMenuMovil(){
        if(mostrarMenuMovil){
            setMostrarMenuMovil(false);
        }
    }

    //Manejador del botón de cierre de sesion
    function manejardorCerrarSesion(){
        //DEBUG 🦜🦜🦜🦜
        alert("SE VA A CERRAR LA SESION")
        cerrarSesion(auth);
    }

    return(
        <nav>
            <div>
                <Link to="/" className="logo">
                    <h3>TalentoTech Store</h3>
                </Link>
            </div>
            <ul className={mostrarMenuMovil? "active" : ""}>
                <li>
                    <Link   to="/"
                            onClick={cerrarMenuMovil} 
                            className="nav-link">
                            Inicio <span><FaHouseChimney /></span>
                            
                    </Link>
                </li>
                <li>
                    <Link   to="/productos"
                            onClick={cerrarMenuMovil} 
                            className="nav-link">
                            Productos <span><FaGift /></span>
                    </Link>
                </li>
                <li>
                    <Link   to="/carrito" 
                            onClick={cerrarMenuMovil}
                            className="nav-link">
                            Carrito <span><FaCartShopping /></span>
                            {
                                contenidoCarrito.length > 0 && 
                                    <span className="numero-carrito">{contenidoCarrito.length}</span>
                                

                            }
                            
                    </Link>
                </li>

                {
                    usuarioEsAdmin && 
                                        <li>
                                            <Link to='/dashboardadmin' className="nav-link">Dashboard Admin</Link>
                                        </li>
                    
                }

                {/*El botón de login */}
                <li>
                    <Link   to="/login"
                        onClick={cerrarMenuMovil}
                        className = "btn-login"
                        >
                
                            <span>
                                {
                                    usuarioActual   ?  
                                                        (usuarioEsAdmin ? <span> Admin loggeado <FaUserCheck/></span> 
                                                                        : <span> Usuario loggeado <FaUserCheck/></span> )    
                                                    :  <span aria-label="Inicia sesion aqui"> Login <FaUserXmark /></span>
                                }
                            </span>
                            
                    </Link> 
                </li>

                <li>
                    {/* El boton de logout */}
                    {
                        usuarioActual&& 
                                        <button aria-label="Cerrar sesión" 
                                                className="btn-logout" 
                                                onClick={manejardorCerrarSesion}>
                                                    Cerrar sesión
                                        </button>
                    }

                </li>
                


            </ul>

            {/* Para mostar o no el menu movil*/}
            <div>
                {/*El ícono cambia según el menu está abierto o cerrado*/}
                {
                    mostrarMenuMovil    ? < FaTimes className="btn-menu-movil" onClick={cambiarMenuMovil}/>
                                        : <GiHamburgerMenu className="btn-menu-movil" onClick={cambiarMenuMovil}/>
                }
            </div>
        </nav>
    )

}
export default Navbar

