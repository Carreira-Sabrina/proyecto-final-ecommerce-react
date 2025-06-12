import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
//Css
import './index.css'
//Componentes
import App from './App.jsx'
//Contexto
import { ProveedorContextoCarrito } from './context/ContextoCarrito.jsx'
import { ProveedorContextoProductos } from './context/ContextoProductos.jsx'
import { ProveedorContextoAutenticacion } from './context/ContextoAutenticacion.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <ProveedorContextoAutenticacion>
          <ProveedorContextoProductos>
            <ProveedorContextoCarrito>
              <App />
            </ProveedorContextoCarrito>
          </ProveedorContextoProductos>
        </ProveedorContextoAutenticacion>
    </BrowserRouter>
    
  </StrictMode>,
)
