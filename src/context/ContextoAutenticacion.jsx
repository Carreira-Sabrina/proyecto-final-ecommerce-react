import { createContext, useState } from "react";

//Firebase
import {auth} from "../firebase";

//Funciones de Firebase
import {    createUserWithEmailAndPassword, 
            signInWithEmailAndPassword, 
            signOut, 
            onAuthStateChanged } from "firebase/auth";

export const ContextoAutenticacion = createContext()

export function ProveedorContextoAutenticacion({children}){

    //Una array de objetos de usuarios ADMIN, bajo presupuesto, no hay DB ;)

    const admins = [
        {email: "admin@admin.com", password: "admin1234"},
        {email: "optimus@admin.com", password: "optimusprime"},
        {email: "holmes@admin.com", password: "holmes1234"},
        {email: "ghost@admin.com", password: "ghost1234"},
    ]

    const [usuario, setUsuario] = useState({});
    const [usuarioEsAdmin, setUsuarioEsAdmin] = useState(false);


    //Crear usuario
    async function crearUsuario(email, password){

        try {
            const respuestaCreacionUsuario = await createUserWithEmailAndPassword(auth, email, password)
            console.log("SE ACABA DE CREAR UN USUARIO")
            console.log(respuestaCreacionUsuario.user)
            console.log(" VER ESE EMAIL")
            console.log(respuestaCreacionUsuario.user.email)

            //YO CREO QUE HAY QUE SETEAR EL USUARIO DEL USESTATE ANTES DEL RETURN
            setUsuario(respuestaCreacionUsuario.user)

            //vamos a ver que sale de aca  HAY QUE HACER RETURN O SETEAR EL ESTADO? 🦜🦜🦜🦜❓❓❓❓❓
            return respuestaCreacionUsuario

        } catch (error) {
            //PROVISORIO 🦜🦜🦜🦜🦜🦜🦜
            console.log(error.message)
        }
    }

    //Iniciar sesion
    async function iniciarSesion(email, password) {
        
    }

    //Cerrar sesion NO SE QUE PARAMETROS PONER 🦜🦜🦜🦜
    async function cerrarSesion() {
        
    }

    //AUXILIAR => VERIFICAR SI EL USUARIO ES ADMIN es async? 🦜🦜🦜🦜🦜
    function usuarioEsAdministrador(){

    }
    

    const value ={usuario, crearUsuario, iniciarSesion, cerrarSesion, usuarioEsAdministrador
        
    }

    return (
        <ContextoAutenticacion.Provider value={value}>
            {children}
        </ContextoAutenticacion.Provider>
    )

}