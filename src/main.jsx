import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CategoriaProduto from './pages/categoria_produto'
import { Toaster } from 'sonner'
import Produto from './pages/produto'
import Fornecedor from './pages/fornecedor'
import Compra from './pages/compra'
import Funcionario from './pages/funcionario'
import Cliente from './pages/cliente'
import Pedido from './pages/pedido'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/login.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route path='/' element={
          <ProtectedRoute>
          <App />
          </ProtectedRoute>
          } />

        <Route path='/categoria-produto' element={
          <ProtectedRoute>
          <CategoriaProduto />
          </ProtectedRoute>
          } />

        <Route path='/produtos' element={
          <ProtectedRoute>
          <Produto />
          </ProtectedRoute>
          } />

        <Route path='/fornecedores' element={
          <ProtectedRoute>
          <Fornecedor />
          </ProtectedRoute>
          } />

        <Route path='/compras' element={
          <ProtectedRoute>
          <Compra />
          </ProtectedRoute>
          } />

        <Route path='/funcionarios' element={
          <ProtectedRoute>
          <Funcionario />
          </ProtectedRoute>
          } />

        <Route path='/clientes' element={
          <ProtectedRoute>
          <Cliente />
          </ProtectedRoute>
          } />

        <Route path='/pedidos' element={
          <ProtectedRoute>
          <Pedido />
          </ProtectedRoute>
          } />

      </Routes>
      <Toaster />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
