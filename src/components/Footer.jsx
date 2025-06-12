import "../styles/Footer.css"

//React icons
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";


function Footer(){
    
    return(
        <footer>
            <h2 className="footer-titulo">Seguinos en nuestras redes sociales !</h2>

            <div className="container-redes">
                <FaFacebook className="redes-logo"/>
                <FaYoutube className="redes-logo"/>
                <FaInstagramSquare className="redes-logo"/>
                <FaTwitter className="redes-logo"/>
            </div>
        </footer>
    )
}

export default Footer;