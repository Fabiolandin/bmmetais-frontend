import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

const DialogPedidoDetails = ({ open, onOpenChange, pedido }) => {
    if (!pedido) return null

    const totalPedido = pedido.items.reduce((acc, item) => acc + (item.quantidade * item.preco_unitario), 0)

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Detalhes do Pedido #{pedido.id}</DialogTitle>
                    <DialogDescription>
                        Informações completas do pedido e itens selecionados.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-6 py-4">
                    <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Cliente</p>
                        <p className="text-lg font-medium">{pedido.cliente?.nome}</p>
                        <p className="text-sm text-gray-600">{pedido.cliente?.telefone}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Funcionário Responsável</p>
                        <p className="text-lg font-medium">{pedido.funcionario?.nome}</p>
                    </div>
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-3 border-b pb-2">Itens do Pedido</h3>
                    <div className="rounded-md border">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50/50">
                                <tr className="text-left border-b">
                                    <th className="p-3 font-medium">Produto</th>
                                    <th className="p-3 font-medium text-center">Quantidade</th>
                                    <th className="p-3 font-medium text-right">Preço Unit.</th>
                                    <th className="p-3 font-medium text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {pedido.items?.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/30 transition-colors">
                                        <td className="p-3">{item.produto?.nome}</td>
                                        <td className="p-3 text-center font-medium">{item.quantidade}</td>
                                        <td className="p-3 text-right">R$ {item.preco_unitario.toFixed(2)}</td>
                                        <td className="p-3 text-right font-medium">
                                            R$ {(item.quantidade * item.preco_unitario).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <Card className="p-4 bg-gray-50 border-none shadow-none w-full max-w-xs">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">Total do Pedido:</span>
                            <span className="text-2xl font-bold text-blue-600">R$ {totalPedido.toFixed(2)}</span>
                        </div>
                    </Card>
                </div>

                <DialogFooter className="mt-6">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Fechar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogPedidoDetails
