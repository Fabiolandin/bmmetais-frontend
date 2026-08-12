# 🏗️ BM Metais — Frontend

Interface web do sistema de gestão da BM Metais. Aqui é onde tudo fica bonito e faz sentido pro usuário final — cadastros, pedidos, compras, tudo numa tela só, sem dor de cabeça.

> Esse projeto é o front-end do ERP da BM Metais e precisa do [back-end](https://github.com/Fabiolandin/bmmetais-erp-back) rodando pra funcionar de verdade.

---

## 🚀 Tecnologias usadas

| Tecnologia | Pra que serve aqui |
|---|---|
| **React 19** | Base de tudo — componentes, estado, o arroz com feijão |
| **Vite** | Build tool ultra-rápida, dev server que não trava |
| **React Router DOM v7** | Navegação entre as páginas sem recarregar |
| **Context API** | Estado global de autenticação (token, login, logout) |
| **Tailwind CSS v4** | Estilização toda por classes, rápido e consistente |
| **shadcn/ui + Radix UI** | Componentes prontos e acessíveis (Dialog, Button, Input...) |
| **Recharts** | Gráfico de pedidos e faturamento no dashboard |
| **Lucide React** | Ícones vetoriais leves e bonitos |
| **Sonner** | Aquelas notificações de sucesso/erro que aparecem no canto |
| **Geist Font** | Fonte do projeto — limpa e moderna |

---

## 📁 Estrutura do projeto

```
src/
├── api/
│   └── apiClient.ts    # Fetch centralizado — injeta o token JWT e trata sessão expirada (401)
├── context/
│   └── AuthContext.jsx # Estado global de autenticação (token, login, logout, isAuthenticated)
├── components/          # Componentes reutilizáveis
│   ├── ui/              # Botões, inputs, dialogs (base do shadcn)
│   ├── Sidebar.jsx      # Navegação lateral colapsável (com botão de logout)
│   ├── ProtectedRoute.jsx  # Bloqueia acesso às páginas se não tiver login
│   ├── Dialog*New*.jsx     # Formulários de criação
│   └── Dialog*Details.jsx  # Visualização/edição de registros
├── pages/               # Cada módulo do sistema vira uma página
│   ├── login.jsx        # Tela de login
│   ├── page.jsx         # Dashboard (cards de totais + gráfico)
│   ├── produto.jsx
│   ├── categoria_produto.jsx
│   ├── cliente.jsx
│   ├── fornecedor.jsx
│   ├── funcionario.jsx
│   ├── pedido.jsx
│   └── compra.jsx
├── fetchs/               # Funções de chamada pra API (um arquivo por módulo)
└── lib/
    └── utils.js          # Helpers gerais (cn para merge de classes)
```

---

## 🗺️ Páginas / Rotas

| Rota | Acesso | O que você encontra lá |
|---|---|---|
| `/login` | Público | Tela de login (email + senha) |
| `/` | Protegida | Dashboard com totais de pedidos, compras, produtos e gráfico de faturamento |
| `/categoria-produto` | Protegida | Gerenciamento de categorias dos produtos |
| `/produtos` | Protegida | Listagem e cadastro de produtos com estoque |
| `/fornecedores` | Protegida | Cadastro e gestão dos fornecedores |
| `/compras` | Protegida | Registro de compras feitas com fornecedores |
| `/pedidos` | Protegida | Pedidos realizados pelos clientes |
| `/funcionarios` | Protegida | Gestão dos funcionários da empresa (criação/exclusão exige usuário admin no back) |
| `/clientes` | Protegida | Cadastro e consulta de clientes |

Rotas "Protegida" redirecionam pra `/login` automaticamente se não houver um token válido (`ProtectedRoute`), e o `apiClient` derruba a sessão sozinho se o back responder `401`.

---

## ⚙️ Como rodar

Precisa ter o **Node.js** instalado. Antes de tudo, crie um arquivo `.env` na raiz do projeto com a URL da API:

```env
VITE_API_URL=http://localhost:3000
```

Depois:

```bash
# Instala as dependências
npm install

# Sobe o servidor de desenvolvimento
npm run dev
```

O projeto vai abrir em `http://localhost:5173` por padrão.

> ⚠️ Lembra de ter o back-end no ar antes de usar o sistema. Sem ele, as chamadas de API (inclusive o login) não vão funcionar.

---

## 🔗 Projeto relacionado

Esse front se conecta com a API do **BM Metais ERP Back** — vai lá dar uma olhada também:
👉 [bmmetais-erp-back](https://github.com/Fabiolandin/bmmetais-erp-back)