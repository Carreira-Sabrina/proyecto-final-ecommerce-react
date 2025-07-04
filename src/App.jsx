import { Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'

//Css
import "./App.css"
//Contexto
import { ContextoAutenticacion } from './context/ContextoAutenticacion'


//Componentes
import Navbar from './components/Navbar'
import Footer from './components/Footer'

//Paginas
import Productos from './pages/Productos'
import Inicio from './pages/Inicio'
import Carrito from './pages/Carrito'
import PaginaProducto from './pages/PaginaProducto'
import Login from './pages/Login'
import CrearProducto from './pages/CrearProducto'
import EditarProducto from './pages/EditarProducto'
import RegistrarUsuario from './pages/ResgistrarUsuario'
import AdminDashboard from './pages/AdminDashboard'


function App() {
  const {usuarioActual,usuarioEsAdmin} = useContext(ContextoAutenticacion)
  
  return (
    <>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Inicio/>}/>
            <Route path='/productos' element={<Productos/>}/>
            <Route path='/productos/:id' element={<PaginaProducto/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/carrito' element={usuarioActual ? <Carrito/> : <Navigate to="/login" replace /> } />   
            <Route path='/crearproducto' element={usuarioEsAdmin ? <CrearProducto/> : <Navigate to="/login" replace /> } />
            <Route path='/editarproducto/:id' element={usuarioEsAdmin ? <EditarProducto/> : <Navigate to="/login" replace /> } />
            <Route path='/registrarse' element={<RegistrarUsuario/>}/>
            <Route path='/dashboardadmin' element={usuarioEsAdmin ? <AdminDashboard/> : <Navigate to="/login" replace /> } />

        </Routes>
        <Footer />
    </>
  )
}

export default App
