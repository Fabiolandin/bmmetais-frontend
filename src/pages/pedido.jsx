import Sidebar from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchPedido, createPedido, deletePedido } from "@/fetchs/fetchPedido"
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon, Trash2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import DialogNewPedido from "@/components/DialogNewPedido"
import DialogPedidoDetails from "@/components/DialogPedidoDetails"
import { toast } from "sonner"
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog"

const LIMIT = 7

const Pedido = () => {
    //state para receber a lista de pedidos
    const [listaPedido, setListaPedido] = useState([])

    //states para paginação
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [total, setTotal] = useState(0)

    //State para loading
    const [isLoading, setIsLoading] = useState(false)

    //state para abrir dialog's
    const [open, setOpen] = useState(false)
    const [openDetails, setOpenDetails] = useState(false)

    const [pedidoSelecionado, setPedidoSelecionado] = useState(null)


    const getDados = async (page = currentPage) => {
        setIsLoading(true)
        try {
            const dados = await fetchPedido(page, LIMIT)
            setListaPedido(dados.data)
            setCurrentPage(dados.page)
            setTotalPages(dados.totalPages)
            setTotal(dados.total)
        } catch (error) {
            console.error("Erro ao buscar dados:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleCreatePedido = async (data) => {
        try {
            await createPedido(data)
            await getDados(currentPage)
            toast.success("Pedido criado com sucesso!")
        } catch (error) {
            toast.error("Erro ao criar pedido")
            console.error("Erro ao criar pedido:", error)
        }
    }

    const handleDeletePedido = async (id) => {
        try {
            await deletePedido(id)
            toast.success("Pedido deletado com sucesso!")
            await getDados(currentPage)
        } catch (error) {
            toast.error("Erro ao deletar pedido")
        }
    }

    useEffect(() => {
        getDados(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <Card className="shadow flex-1 mb-4 mt-4 mr-4 ml-4 rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Pedidos Cadastrados</CardTitle>
                    <Button variant="outline" className="ml-auto" onClick={() => setOpen(true)}>Novo Pedido</Button>
                </CardHeader>
                {/* Loading */}
                {isLoading ? (
                    <p className="text-center text-muted-foreground py-8">Carregando pedidos...</p>
                ) : listaPedido.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Nenhum pedido cadastrado...</p>
                ) : (
                    listaPedido.map((pedido) => {
                        const total = pedido.items.reduce((acc, item) => acc + (item.quantidade * item.preco_unitario), 0)
                        return (
                            <CardContent key={pedido.id}>
                                <Card className="p-4 hover:bg-gray-100 shadow-sm border flex flex-row items-center gap-4 cursor-pointer transition-colors">
                                    <div className="font-bold text-blue-600 w-12">#{pedido.id}</div>
                                    <div className="flex-1">
                                        <div className="font-medium">{pedido.cliente?.nome}</div>
                                        <div className="text-xs text-gray-500">
                                            {pedido.items.length} {pedido.items.length === 1 ? 'item' : 'itens'}
                                        </div>
                                    </div>
                                    <div className="text-right mr-4">
                                        <div className="font-semibold text-gray-900">R$ {total.toFixed(2)}</div>
                                        <div className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Total</div>
                                    </div>
                                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                        <EyeIcon
                                            size={25}
                                            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                                            onClick={() => {
                                                setPedidoSelecionado(pedido)
                                                setOpenDetails(true)
                                            }}
                                        />
                                        <ConfirmDeleteDialog
                                            trigger={<Trash2Icon size={23} className="text-red-400 hover:text-red-600 transition-colors cursor-pointer" />}
                                            titulo={pedido.nome}
                                            descricao="Cliente"
                                            funcao={() => handleDeletePedido(pedido.id)}
                                        />
                                    </div>
                                </Card>
                            </CardContent>
                        )
                    })
                )}

                {/* Controles de paginação */}
                <div className="flex items-center justify-center gap-4 py-4">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage <= 1}
                        onClick={() => getDados(currentPage - 1)}
                    >
                        <ChevronLeftIcon size={16} />Anterior</Button>

                    <span className="text-sm text-muted-foreground">
                        Página {currentPage} de {totalPages}
                    </span>

                    <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage >= totalPages}
                        onClick={() => getDados(currentPage + 1)}
                    >
                        Próxima<ChevronRightIcon size={16} /></Button>
                </div>
            </Card>
            <DialogNewPedido open={open} onOpenChange={setOpen} onCreateNewPedido={handleCreatePedido} />
            <DialogPedidoDetails open={openDetails} onOpenChange={setOpenDetails} pedido={pedidoSelecionado} />
        </div>
    )
}

export default Pedido