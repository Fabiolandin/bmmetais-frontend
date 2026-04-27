import Sidebar from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchCompras } from "@/fetchs/fetchCompra"
import { EyeIcon, Trash2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import DialogNewCompra from "@/components/DialogNewCompra"
import { DialogCompraDetails } from "@/components/DialogCompraDetails"

const Compra = () => {
    //state para receber a lisca de compras
    const [listaCompras, setListaCompras] = useState([])

    //states para abrir dialogs
    const [openNewCompra, setOpenNewCompra] = useState(false)
    const [openCompraDetails, setOpenCompraDetails] = useState(false)

    const getDados = async () => {
        try {
            const dados = await fetchCompras()
            setListaCompras(dados)
        } catch (error) {
            console.log("Erro ao buscar compras", error)
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getDados()
    }, [])

    return (
        <div className="flex">
            <Sidebar />
            <Card className=" flex-1 mb-4 mt-4 mr-4 ml-4 rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Compras Cadastradas</CardTitle>
                    <Button variant="outline" className="ml-auto" onClick={() => setOpenNewCompra(true)}>Nova Compra</Button>
                </CardHeader>
                {listaCompras.map((compras) => (
                    <CardContent key={compras.id}>
                        <Card className="p-4 hover:bg-gray-50 shadow-sm border flex flex-row items-center gap-4 cursor-pointer transition-colors">
                            <div className="font-bold text-blue-600 w-12">#{compras.id}</div>
                            <div className="flex-1">
                                <div className="font-medium">{compras.fornecedor?.nome}</div>
                                <div className="text-sm text-gray-600">{compras.funcionario?.nome}</div>
                            </div>
                            <div className="text-right mr-4">
                                <div className="font-semibold text-gray-900">R$ 1000,00</div>
                                <div className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Total</div>
                            </div>
                            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                <EyeIcon
                                    size={22}
                                    className="text-gray-400 hover:text-blue-500 transition-colors"
                                    onClick={() => setOpenCompraDetails(true)}
                                />
                                <Trash2Icon
                                    size={20}
                                    className="text-red-300 hover:text-red-600 transition-colors"
                                />
                            </div>
                        </Card>
                    </CardContent>
                ))}
            </Card>
            {/* Dialogs */}
            <DialogNewCompra
                open={openNewCompra}
                onOpenChange={setOpenNewCompra}
            />
            <DialogCompraDetails
                open={openCompraDetails}
                onOpenChange={setOpenCompraDetails}
            />
        </div>
    )
}

export default Compra