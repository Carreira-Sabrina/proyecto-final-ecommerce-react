import "../styles/Hero.css"

//Importar imagenes
import heroImgColumnaIzq from "../assets/hero-img/pexels-kindelmedia-7007187.jpg"
import heroImgColumnaDer from "../assets/hero-img/pexels-kindelmedia-6868178.jpg"
//import heroImgColumnaCtro1 from "../assets/hero-img/pexels-kampus-7289723.jpg"
//import heroImgColumnaCtro2 from "../assets/hero-img/pexels-max-fischer-5872177.jpg"



function Hero(){

    return(
        <main className="hero-container">

            <div className="hero-columna-izquierda">
                <img src={heroImgColumnaIzq} alt="" />
            </div>

            <div className="hero-columna-centro">
                
                <h2>Todas las ofertas al alcance de un click !</h2>

            </div>

            <div className="hero-columna-derecha">
                <img src={heroImgColumnaDer} alt="" />
            </div>

        </main>
    )
}


export default Hero;