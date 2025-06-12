import "../styles/Error.css"

//React-icons
import { TbFaceIdError } from "react-icons/tb"; //<TbFaceIdError />


function Error(){

    return(
        <section className="error-section">

            <div>
                <TbFaceIdError className="error-icon"/>
            </div>

            <p className="error-msg">Algo salió mal 😥</p>

        </section>
    )

}


export default Error;