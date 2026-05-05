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
| **Tailwind CSS v4** | Estilização toda por classes, rápido e consistente |
| **shadcn/ui + Radix UI** | Componentes prontos e acessíveis (Dialog, Button, Input...) |
| **Lucide React** | Ícones vetoriais leves e bonitos |
| **Sonner** | Aquelas notificações de sucesso/erro que aparecem no canto |
| **Geist Font** | Fonte do projeto — limpa e moderna |

---

## 📁 Estrutura do projeto

```
src/
├── components/         # Componentes reutilizáveis
│   ├── ui/             # Botões, inputs, dialogs (base do shadcn)
│   ├── Sidebar.jsx     # Navegação lateral colapsável
│   ├── Dialog*New*.jsx      # Formulários de criação
│   └── Dialog*Details.jsx   # Visualização/edição de registros
├── pages/              # Cada módulo do sistema vira uma página
│   ├── page.jsx        # Home
│   ├── produto.jsx
│   ├── categoria_produto.jsx
│   ├── cliente.jsx
│   ├── fornecedor.jsx
│   ├── funcionario.jsx
│   ├── pedido.jsx
│   └── compra.jsx
├── fetchs/             # Funções de chamada pra API (um arquivo por módulo)
└── lib/
    └── utils.js        # Helpers gerais (cn para merge de classes)
```

---

## 🗺️ Páginas / Rotas

| Rota | O que você encontra lá |
|---|---|
| `/` | Tela inicial de boas-vindas |
| `/categoria-produto` | Gerenciamento de categorias dos produtos |
| `/produtos` | Listagem e cadastro de produtos com estoque |
| `/fornecedores` | Cadastro e gestão dos fornecedores |
| `/compras` | Registro de compras feitas com fornecedores |
| `/pedidos` | Pedidos realizados pelos clientes |
| `/funcionarios` | Gestão dos funcionários da empresa |
| `/clientes` | Cadastro e consulta de clientes |

---

## ⚙️ Como rodar

Precisa ter o **Node.js** instalado. Depois é só:

```bash
# Instala as dependências
npm install

# Sobe o servidor de desenvolvimento
npm run dev
```

O projeto vai abrir em `http://localhost:5173` por padrão.

> ⚠️ Lembra de ter o back-end no ar antes de usar o sistema. Sem ele, as chamadas de API não vão funcionar.

---

## 🔗 Projeto relacionado

Esse front se conecta com a API do **BM Metais ERP Back** — vai lá dar uma olhada também:
👉 [bmmetais-erp-back](https://github.com/Fabiolandin/bmmetais-erp-back)
