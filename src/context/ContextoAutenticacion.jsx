import { createContext, useState, useEffect } from "react";

//Firebase
import {auth} from "../firebase";

//Funciones de Firebase
import {    createUserWithEmailAndPassword, 
            signInWithEmailAndPassword, 
            signOut, 
            onAuthStateChanged, 
            AuthErrorCodes} from "firebase/auth";

export const ContextoAutenticacion = createContext()

export function ProveedorContextoAutenticacion({children}){

    //Una array de objetos de usuarios ADMIN, bajo presupuesto, no hay DB ;)
    const admins = [
        {email: "admin@admin.com", password: "admin1234"},
        {email: "optimus@admin.com", password: "optimusprime"},
        {email: "holmes@admin.com", password: "holmes1234"},
        {email: "ghost@admin.com", password: "ghost1234"},
    ]

    const [usuarioActual, setUsuarioActual] = useState(null); //Va a null porque en JS {} es true 
    const [usuarioEsAdmin, setUsuarioEsAdmin] = useState(false);
    const [cargandoAuth ,setCargandoAuth] = useState(true); //al montarse el comp. siempre se comprueba el estado de auth

    //onAuthStateChanges es el observador oficial de Firebase para cambios de estado de autenticación
    //Hay que usar ésto en vez de tratar de setear los estados desde las funciones de login/signup/logout

    useEffect(()=> {
        const cancelarSuscripcion = onAuthStateChanged(auth, (user)=>{
            //El cambio de estado se realiza aquí
            setUsuarioActual(user) //Será null si no hay un usuario
            if (user){
                setUsuarioEsAdmin(usuarioEsAdministrador(user));
            }else{
                setUsuarioEsAdmin(false) // Si no hay usuario, no puede ser administrador
            }
            setCargandoAuth(false); // Una vez que se resuelve el estado inicial, la carga termina
        })
        //Esto se ejecuta cuando el componente se desmonta ("función de limpieza")
        return ()=> cancelarSuscripcion();
    },[])

    //Crear usuario
    async function crearUsuario(email, password){

        try {
            const respuestaCreacionUsuario = await createUserWithEmailAndPassword(auth, email, password)
            //EL ESTADO GLOBAL NO SE SETEA AQUÍ SINO EN EL USE EFFECT MEDIANTE onAuthStateChanged

            //SWEET ALERT 🦜🦜🦜🦜🦜
            alert("USUARIO CREADO CORRECTAMENTE 😊")

            //EL ESTADO DE ADMINISTRADOR TAMPOCO SE SETEA AQUÍ POR EL MISMO MOTIVO

            //probamos, si, con lanzar un alert 🦜🦜🦜
            if(usuarioEsAdmin){
                alert("EL USUARIO ES ADMIN 🤖")
            }else{
                alert("NO ADMIN 👻")
            }
            //vamos a ver que sale de aca  HAY QUE HACER RETURN O SETEAR EL ESTADO? 🦜🦜🦜🦜❓❓❓❓❓
            return respuestaCreacionUsuario

        } catch (error) {
            //PROVISORIO 🦜🦜🦜🦜🦜🦜🦜
            alert("HUBO UN ERROR EN LA CREACION DEL USUARIO")

            if (error.code == AuthErrorCodes.EMAIL_EXISTS){
                alert("ESE MAIL YA FUE USADO 🐭")
            }
            if(error.code == AuthErrorCodes.WEAK_PASSWORD){
                alert("pass muy corto 🐭")
            }
        }
    }

    //Iniciar sesion
    async function iniciarSesion(email, password) {
        try {
            const respuestaInicioSesion = await signInWithEmailAndPassword(auth,email, password);
            
             //onAuthStateChanged se encargará de actualizar usuarioActual y usuarioEsAdmin
            // No es necesario setear usuarioActual aquí o comprobar si es admin aquí directamente
            // después de la respuesta, porque el listener de onAuthStateChanged se disparará
            // y actualizará el estado global de forma reactiva.
            

            //SWEET ALERT 🦜🦜🦜🦜🦜
            alert("SESION INICIADA CORRECTAMENTE 😊")

            

        } catch (error) {
            //PROVISORIO 🦜🦜🦜🦜🦜🦜🦜
            alert("HUBO UN ERROR EN EL INICIO DE SESION")
            console.log(error.message)
            console.log(error.code)
            if (error.code == AuthErrorCodes.INVALID_EMAIL){
                alert("ESE MAIL NO ESTÁ REGISTRADO 🤡")
            }
            if(error.code == AuthErrorCodes.INVALID_PASSWORD){
                alert("EL PASSWORD ES INCORRECTO 🤦‍♀️")
            }
            //Los dos if anteriores no se disparan porque el error es auth/invalid-credential 🦜🦜🦜🦜🦜🦜🦜
            if(error.code == AuthErrorCodes.INVALID_LOGIN_CREDENTIALS){
                alert("EL MAIL O LA CONTRASEÑA SON INCORRECTOS 😫")
            }
        }
    }


    async function cerrarSesion(auth) {
        try {
                await signOut(auth);
                // onAuthStateChanged se encargará de setear usuarioActual a null
                // y usuarioEsAdmin a false.
                alert("SESION CERRADA CORRECTAMENTE 👋");
            } catch (error) {
            alert("Hubo un error al cerrar la sesión");
            console.log(error.message);
            }
    }

    //AUXILIAR => VERIFICAR SI EL USUARIO ES ADMIN
    function usuarioEsAdministrador(usuarioAComprobar){
        if(!usuarioAComprobar) return false; //Si no hay usuario, nunca puede ser admin
        //Usuario es un objeto del tipo UserCrential que tiene una propiedad user.email
        
        const test = admins.some((admin) => admin.email === usuarioAComprobar.email); //usar some para booleanos
        return test
    }
    

    const value ={usuarioActual,usuarioEsAdmin, cargandoAuth, crearUsuario, iniciarSesion, cerrarSesion}

    return (
        <ContextoAutenticacion.Provider value={value}>
            {children}
        </ContextoAutenticacion.Provider>
    )

}