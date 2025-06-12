
import { useLocation } from 'react-router-dom';

export function TestUseLocation(){

    const location = useLocation()

    const admins = [
        {email: "admin@admin.com", password: "admin1234"},
        {email: "optimus@admin.com", password: "optimusprime"},
        {email: "holmes@admin.com", password: "holmes1234"},
        {email: "ghost@admin.com", password: "ghost1234"},
    ];

    const usuario = "g@admin.com";

    return(

        <>
            <p>
                {
                    location.pathname === "/test" ? "Esto es test 🦜" : "Esto no es test"

                }
            </p>

            <p>
                {
                    admins.find((user)=>user.email === usuario) ? "El que está loggeado es admin" : "No es admin, andá pa'alla bobo"
                }
            </p>

        </>
        
    )


}


export default TestUseLocation;