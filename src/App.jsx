import { Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'

//Css
import "./App.css"
//Contexto
import { ContextoCarrito } from './context/ContextoCarrito'

//Componentes
import Bento from './components/Bento'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

//Paginas
import Productos from './pages/Productos'
import Inicio from './pages/Inicio'
import Carrito from './pages/Carrito'
import PaginaProducto from './pages/PaginaProducto'
import Login from './pages/Login'
import CrearProducto from './pages/CrearProducto'
import RegistrarUsuario from './pages/ResgistrarUsuario'


import TestUseLocation from './pages/TestUseLocation'

//Contexto


function App() {

  const {usuarioLoggeado} = useContext(ContextoCarrito)
  
  return (
    <>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Inicio/>}/>
            <Route path='/productos' element={<Productos/>}/>
            <Route path='/productos/:id' element={<PaginaProducto/>}/>
            <Route path='login' element={<Login />}/>
            <Route path='/carrito' element={usuarioLoggeado ? <Carrito/> : <Navigate to="/login" replace /> } />
            {/*FALTA LA LOGICA DE LOGGEADO ADMIN  */}
            <Route path='/crearproducto' element={<CrearProducto />}/>
            <Route path='/test' element={<TestUseLocation/>}/>
            <Route path='/registrarse' element={<RegistrarUsuario/>}/>

        </Routes>
        <Footer />
    </>
  )
}

export default App
