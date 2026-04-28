
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { fetchFornecedor } from "@/fetchs/fetchFornecedor"
import { fetchFuncionario } from "@/fetchs/fetchFuncionario"
import { fetchProduto } from "@/fetchs/fetchProduto"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { PlusIcon, Trash2Icon } from "lucide-react"

const DialogNewCompra = ({ open, onOpenChange, onCreateNewCompra }) => {

    //states para receber fornecedores, funcionarios e produtos
    const [fornecedores, setFornecedores] = useState([])
    const [funcionarios, setFuncionarios] = useState([])
    const [produtos, setProdutos] = useState([])

    //state para o fornecedor, funcionario, items selecionados
    const [fornecedorId, setFornecedorId] = useState("")
    const [funcionarioId, setFuncionarioId] = useState("")
    const [items, setItems] = useState([])

    //states para adicionar os produtos no pedido
    const [selectedProdutoId, setSelectedProdutoId] = useState("")
    const [quantidade, setQuantidade] = useState(1)
    const [precoUnitario, setPrecoUnitario] = useState(0)

    const loadInicial = async () => {
        try {
            const [fornecedoresData, funcionariosData, produtosData] = await Promise.all([
                fetchFornecedor(),
                fetchFuncionario(),
                fetchProduto()
            ])
            setFornecedores(fornecedoresData)
            setFuncionarios(funcionariosData)
            setProdutos(produtosData)
        } catch (error) {
            console.error("Erro ao carregar dados iniciais:", error)
        }
    }

    const handleProdutoChange = (id) => {
        setSelectedProdutoId(id)
        const produto = produtos.find(p => p.id === parseInt(id))
        if (produto) {
            setPrecoUnitario(produto.preco)
        }
    }

    const handleAddItem = () => {
        if (!selectedProdutoId || quantidade <= 0) return

        const produto = produtos.find(p => p.id === parseInt(selectedProdutoId))
        if (!produto) return

        const newItem = {
            produtoId: parseInt(selectedProdutoId),
            nome: produto.nome,
            quantidade: parseInt(quantidade),
            preco_unitario: parseFloat(precoUnitario) || produto.preco
        }

        setItems([...items, newItem])
        setSelectedProdutoId("")
        setQuantidade(1)
        setPrecoUnitario(0)
    }

    const handleRemoveItem = (index) => {
        setItems(items.filter((_, i) => i !== index))
    }

    const handleSubmit = async () => {
        if (!fornecedorId || !funcionarioId || items.length === 0) {
            alert("Preencha todos os campos e adicione pelo menos um item.")
            return
        }

        try {
            const compraData = {
                fornecedorId: parseInt(fornecedorId),
                funcionarioId: parseInt(funcionarioId),
                items: items.map(({ produtoId, quantidade, preco_unitario }) => ({
                    produtoId,
                    quantidade,
                    preco_unitario
                }))
            }

            await onCreateNewCompra(compraData)

            // Reset fields
            setFornecedorId("")
            setFuncionarioId("")
            setItems([])
            onOpenChange(false)
        } catch (error) {
            console.error("Erro ao criar compra:", error)
        }
    }

    useEffect(() => {
        if (open) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            loadInicial()
        }
    }, [open])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nova Compra</DialogTitle>
                    <DialogDescription>
                        Preencha os dados abaixo para criar uma nova compra.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <label htmlFor="fornecedor" className="text-sm font-medium">Fornecedor</label>
                            <select
                                id="fornecedor"
                                value={fornecedorId}
                                onChange={(e) => setFornecedorId(e.target.value)}
                                className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            >
                                <option value="">Selecione um fornecedor</option>
                                {fornecedores.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
                            </select>
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="funcionario" className="text-sm font-medium">Funcionário</label>
                            <select
                                id="funcionario"
                                value={funcionarioId}
                                onChange={(e) => setFuncionarioId(e.target.value)}
                                className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            >
                                <option value="">Selecione um funcionário</option>
                                {funcionarios.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="border rounded-lg p-4 bg-gray-50/50">
                        <h3 className="text-sm font-medium mb-3">Adicionar Itens</h3>
                        <div className="grid grid-cols-12 gap-2 items-end">
                            <div className="grid gap-2 col-span-4">
                                <label htmlFor="produto" className="text-sm font-medium">Produto</label>
                                <select
                                    id="produto"
                                    value={selectedProdutoId}
                                    onChange={(e) => handleProdutoChange(e.target.value)}
                                    className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                >
                                    <option value="">Selecione</option>
                                    {produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                                </select>
                            </div>
                            <div className="col-span-2 grid gap-1">
                                <label className="text-xs font-medium">Qtd</label>
                                <Input
                                    type="number"
                                    value={quantidade}
                                    onChange={(e) => setQuantidade(e.target.value)}
                                    className="h-8 text-xs"
                                />
                            </div>
                            <div className="col-span-3 grid gap-1">
                                <label className="text-xs font-medium">Preço Unit.</label>
                                <Input
                                    type="number"
                                    value={precoUnitario}
                                    onChange={(e) => setPrecoUnitario(e.target.value)}
                                    className="h-8 text-xs"
                                />
                            </div>
                            <div className="col-span-2">
                                <Button type="button" onClick={handleAddItem} className="h-8 w-full" size="sm">
                                    <PlusIcon size={16} />
                                </Button>
                            </div>
                        </div>
                        {items.length > 0 && (
                            <div className="mt-4 border-t pt-3">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="text-left text-gray-500 border-b">
                                            <th className="pb-2 font-medium">Produto</th>
                                            <th className="pb-2 font-medium text-center">Qtd</th>
                                            <th className="pb-2 font-medium text-right">Preço</th>
                                            <th className="pb-2 font-medium text-right">Total</th>
                                            <th className="pb-2 w-8"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {items.map((item, index) => (
                                            <tr key={index}>
                                                <td className="py-2">{item.nome}</td>
                                                <td className="py-2 text-center">{item.quantidade}</td>
                                                <td className="py-2 text-right">R$ {item.preco_unitario.toFixed(2)}</td>
                                                <td className="py-2 text-right">R$ {(item.quantidade * item.preco_unitario).toFixed(2)}</td>
                                                <td className="py-2 text-right">
                                                    <button onClick={() => handleRemoveItem(index)} className="text-red-500 hover:text-red-700">
                                                        <Trash2Icon size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="font-semibold text-sm border-t">
                                            <td colSpan={3} className="pt-2 text-right">Total Pedido:</td>
                                            <td className="pt-2 text-right">
                                                R$ {items.reduce((acc, item) => acc + (item.quantidade * item.preco_unitario), 0).toFixed(2)}
                                            </td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleSubmit}>Criar Compra</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogNewCompra