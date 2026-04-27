import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Teste from './pages/page'
import CategoriaProduto from './pages/categoria_produto'
import { Toaster } from 'sonner'
import Produto from './pages/produto'
import Fornecedor from './pages/fornecedor'
import Compra from './pages/compra'
import Funcionario from './pages/funcionario'
import Cliente from './pages/cliente'
import Pedido from './pages/pedido'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/teste' element={<Teste />} />
        <Route path='/categoria-produto' element={<CategoriaProduto />} />
        <Route path='/produtos' element={<Produto />} />
        <Route path='/fornecedores' element={<Fornecedor />} />
        <Route path='/compras' element={<Compra />} />
        <Route path='/funcionarios' element={<Funcionario />} />
        <Route path='/clientes' element={<Cliente />} />
        <Route path='/pedidos' element={<Pedido />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
)
