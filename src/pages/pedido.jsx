import Sidebar from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchPedido, createPedido, deletePedido } from "@/fetchs/fetchPedido"
import { EyeIcon, Trash2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import DialogNewPedido from "@/components/DialogNewPedido"
import DialogPedidoDetails from "@/components/DialogPedidoDetails"

const Pedido = () => {

    //state para abrir dialog's
    const [open, setOpen] = useState(false)
    const [openDetails, setOpenDetails] = useState(false)
    const [pedidoSelecionado, setPedidoSelecionado] = useState(null)

    //state para receber a lista de pedidos
    const [listaPedido, setListaPedido] = useState([])

    const getDados = async () => {
        try {
            const dados = await fetchPedido()
            setListaPedido(dados)
        } catch (error) {
            console.error("Erro ao buscar dados:", error)
        }
    }

    const handleCreatePedido = async (data) => {
        try {
            await createPedido(data)
            await getDados()
        } catch (error) {
            console.error("Erro ao criar pedido:", error)
        }
    }

    const handleDeletePedido = async (id) => {
        try {
            await deletePedido(id)
            await getDados()
        } catch (error) {
            console.error("Erro ao deletar pedido:", error)
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getDados()
    }, [])

    return (
        <div className="flex">
            <Sidebar />
            <Card className=" shadow flex-1 mb-4 mt-4 mr-4 ml-4 rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Pedidos Cadastrados</CardTitle>
                    <Button variant="outline" className="ml-auto" onClick={() => setOpen(true)}>Novo Pedido</Button>
                </CardHeader>
                {listaPedido.map((pedido) => {
                    const total = pedido.items.reduce((acc, item) => acc + (item.quantidade * item.preco_unitario), 0)
                    return (
                        <CardContent key={pedido.id}>
                            <Card className="p-4 hover:bg-gray-50 shadow-sm border flex flex-row items-center gap-4 cursor-pointer transition-colors">
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
                                        size={22}
                                        className="text-gray-400 hover:text-blue-500 transition-colors"
                                        onClick={() => {
                                            setPedidoSelecionado(pedido)
                                            setOpenDetails(true)
                                        }}
                                    />
                                    <Trash2Icon
                                        size={20}
                                        className="text-red-300 hover:text-red-600 transition-colors"
                                        onClick={() => handleDeletePedido(pedido.id)}
                                    />
                                </div>
                            </Card>
                        </CardContent>
                    )
                })}
            </Card>
            <DialogNewPedido open={open} onOpenChange={setOpen} onCreateNewPedido={handleCreatePedido} />
            <DialogPedidoDetails open={openDetails} onOpenChange={setOpenDetails} pedido={pedidoSelecionado} />
        </div>
    )
}

export default Pedido