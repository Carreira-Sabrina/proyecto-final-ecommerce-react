import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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

    const navigate = useNavigate()

    //Una array de objetos de usuarios ADMIN, bajo presupuesto, no hay DB ;) 🦜🦜🦜🦜🦜🦜
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

    //CREAR USUARIO
    //=============
    async function crearUsuario(email, password){
        try {
            const respuestaCreacionUsuario = await createUserWithEmailAndPassword(auth, email, password)
            //EL ESTADO GLOBAL NO SE SETEA AQUÍ SINO EN EL USE EFFECT MEDIANTE onAuthStateChanged

            Swal.fire({text:"Usuario creado correctamente 😊", icon: "success", confirmButtonColor:"#560BAD"})
    
            //EL ESTADO DE ADMINISTRADOR TAMPOCO SE SETEA AQUÍ POR EL MISMO MOTIVO
            return respuestaCreacionUsuario

        } catch (error) {
            if (error.code == AuthErrorCodes.EMAIL_EXISTS){
                Swal.fire({
                    title:"Error en la creación del usuario",
                    text: "Ya hay una cuenta creada con ese mail",
                    icon: "error"
                })
            }
            if(error.code == AuthErrorCodes.WEAK_PASSWORD){
                Swal.fire({
                    title:"Error en la creación del usuario",
                    text: "La contraseña debe contener al menos 8 caracteres",
                    icon: "error"
                })
            }
        }
    }

    //INICIAR SESION
    //===============
    async function iniciarSesion(email, password) {
        try {
            const respuestaInicioSesion = await signInWithEmailAndPassword(auth,email, password);
            
             //onAuthStateChanged se encargará de actualizar usuarioActual y usuarioEsAdmin
            // No es necesario setear usuarioActual aquí o comprobar si es admin aquí directamente
            // después de la respuesta, porque el listener de onAuthStateChanged se disparará
            // y actualizará el estado global de forma reactiva.
            

            //SWEET ALERT 🦜🦜🦜🦜🦜 Y EL REDIRECT? 🦜🦜🦜❓❓❓
            Swal.fire({text:"Sesión iniciada correctamente 😊", icon: "success", confirmButtonColor:"#560BAD"})

        } catch (error) {
            Swal.fire({text:"Problemas con el inicio de sesión", icon: "error", confirmButtonColor:"#F72585"})
            if (error.code == AuthErrorCodes.INVALID_EMAIL){
                Swal.fire({text:"No hay un usuario con ese email registrado", icon: "error", confirmButtonColor:"#F72585"})
            }
            if(error.code == AuthErrorCodes.INVALID_PASSWORD){
                Swal.fire({text:"Password incorrecto", icon: "error", confirmButtonColor:"#F72585"})
            }
            //Los dos if anteriores no se disparan porque el error es auth/invalid-credential 🦜🦜🦜🦜🦜🦜🦜
            if(error.code == AuthErrorCodes.INVALID_LOGIN_CREDENTIALS){
                Swal.fire({text:"El email o la contraseña son incorrectos", icon: "error", confirmButtonColor:"#F72585"})
                
            }
        }
    }

    //CERRAR SESION
    //==============
    async function cerrarSesion(auth) {
        try {
                await signOut(auth);
                // onAuthStateChanged se encargará de setear usuarioActual a null
                // y usuarioEsAdmin a false.
                Swal.fire({text:"Sesión cerrada correctamente 😊", icon: "success", confirmButtonColor:"#560BAD"})
            } catch (error) {
            Swal.fire({text:"Error al cerrar sesión", icon: "error", confirmButtonColor:"#F72585"})
            }
    }

    //AUXILIAR => VERIFICAR SI EL USUARIO ES ADMIN
    //===============================================
    function usuarioEsAdministrador(usuarioAComprobar){
        if(!usuarioAComprobar) return false; //Si no hay usuario, nunca puede ser admin
        //Usuario es un objeto del tipo UserCrential que tiene una propiedad user.email
        const test = admins.some((admin) => admin.email === usuarioAComprobar.email); //usar some para booleanos
        return test
    }
    

    const value ={auth,usuarioActual,usuarioEsAdmin, cargandoAuth, crearUsuario, iniciarSesion, cerrarSesion}

    return (
        <ContextoAutenticacion.Provider value={value}>
            {children}
        </ContextoAutenticacion.Provider>
    )

}