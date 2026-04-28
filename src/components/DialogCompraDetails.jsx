import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"

export const DialogCompraDetails = ({ open, onOpenChange, compra }) => {
    if (!compra) return null

    const totalCompra = compra.items?.reduce((acc, item) => acc + (item.quantidade * item.preco_unitario), 0)

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Detalhes da Compra #{compra.id}</DialogTitle>
                    <DialogDescription>
                        Confira os detalhes da compra.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-6 py-4">
                    <div className="space-y-1">
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Fornecedor</p>
                        <p className="font-medium">{compra.fornecedor?.nome}</p>
                        <p className="text-sm text-gray-600">{compra.fornecedor?.telefone}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Funcionário Responsável</p>
                        <p className="font-medium">{compra.funcionario?.nome}</p>
                        <p className="text-sm text-gray-600">{compra.funcionario?.telefone}</p>
                    </div>
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-3 border-b pb-2">Itens da Compra</h3>
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
                                {compra.items?.map((item) => (
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
            </DialogContent>
        </Dialog>
    )
}