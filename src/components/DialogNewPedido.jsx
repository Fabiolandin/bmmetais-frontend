import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { fetchCliente } from "@/fetchs/fetchCliente"
import { fetchFuncionario } from "@/fetchs/fetchFuncionario"
import { fetchProduto } from "@/fetchs/fetchProduto"
import { Trash2Icon, PlusIcon } from "lucide-react"

const DialogNewPedido = ({ open, onOpenChange, onCreateNewPedido }) => {
    const [clienteId, setClienteId] = useState("")
    const [funcionarioId, setFuncionarioId] = useState("")
    const [items, setItems] = useState([])

    //States para adicionar os produtos no pedido
    const [selectedProdutoId, setSelectedProdutoId] = useState("")
    const [quantidade, setQuantidade] = useState(1)
    const [precoUnitario, setPrecoUnitario] = useState(0)

    //States para carregar os dados
    const [clientes, setClientes] = useState([])
    const [funcionarios, setFuncionarios] = useState([])
    const [produtos, setProdutos] = useState([])


    //função para carregar os dados iniciais
    const loadInitialData = async () => {
        try {
            const [clientesData, funcionariosData, produtosData] = await Promise.all([
                fetchCliente(),
                fetchFuncionario(),
                fetchProduto()
            ])
            setClientes(clientesData)
            setFuncionarios(funcionariosData)
            setProdutos(produtosData)
        } catch (error) {
            console.error("Erro ao carregar dados iniciais:", error)
        }
    }

    //função para adicionar os produtos no pedido
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
        if (!clienteId || !funcionarioId || items.length === 0) {
            alert("Preencha todos os campos e adicione pelo menos um item.")
            return
        }

        try {
            const pedidoData = {
                clienteId: parseInt(clienteId),
                funcionarioId: parseInt(funcionarioId),
                items: items.map(({ produtoId, quantidade, preco_unitario }) => ({
                    produtoId,
                    quantidade,
                    preco_unitario
                }))
            }

            await onCreateNewPedido(pedidoData)

            // Reset fields
            setClienteId("")
            setFuncionarioId("")
            setItems([])
            onOpenChange(false)
        } catch (error) {
            console.error("Erro ao criar pedido:", error)
        }
    }

    const handleProdutoChange = (id) => {
        setSelectedProdutoId(id)
        const produto = produtos.find(p => p.id === parseInt(id))
        if (produto) {
            setPrecoUnitario(produto.preco)
        }
    }

    useEffect(() => {
        if (open) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            loadInitialData()
        }
    }, [open])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Novo Pedido</DialogTitle>
                    <DialogDescription>
                        Preencha as informações abaixo para criar um novo pedido.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <label htmlFor="cliente" className="text-sm font-medium">Cliente</label>
                            <select
                                id="cliente"
                                value={clienteId}
                                onChange={(e) => setClienteId(e.target.value)}
                                className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            >
                                <option value="">Selecione um cliente</option>
                                {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
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
                        <h3 className="text-sm font-semibold mb-3">Adicionar Itens</h3>
                        <div className="grid grid-cols-12 gap-2 items-end">
                            <div className="col-span-5 grid gap-1">
                                <label className="text-xs font-medium">Produto</label>
                                <select
                                    value={selectedProdutoId}
                                    onChange={(e) => handleProdutoChange(e.target.value)}
                                    className="h-8 w-full rounded-md border border-input bg-white px-2 py-1 text-xs shadow-sm outline-none"
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
                    <Button onClick={handleSubmit}>Finalizar Pedido</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogNewPedido