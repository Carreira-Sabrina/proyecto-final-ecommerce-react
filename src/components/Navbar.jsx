import { useState, useContext } from "react"
import { Link } from "react-router-dom";

//Css
import "../styles/Navbar.css"

//Contexto
import { ContextoCarrito } from "../context/ContextoCarrito";

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

    const {contenidoCarrito, usuarioLoggeado} = useContext(ContextoCarrito)

    function cambiarMenuMovil(){
        setMostrarMenuMovil(!mostrarMenuMovil);
    }

    //Cuando haga click en un link si estoy en el menu movil, lo tengo que cerrar
    function cerrarMenuMovil(){
        if(mostrarMenuMovil){
            setMostrarMenuMovil(false);
        }
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
                            <span className="numero-carrito">{contenidoCarrito.length}</span>
                    </Link>
                </li>

                {/*El botón de login */}
                <Link   to="/login"
                        onClick={cerrarMenuMovil}
                        className = "btn-login"
                        >

                            <span>
                                {
                                    usuarioLoggeado ?  <span> Usuario loggeado <FaUserCheck/></span>
                                                    :  <span> Login <FaUserXmark /></span>
                                }
                            </span>
                            
                </Link>

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

