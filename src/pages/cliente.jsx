import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon, Trash2Icon } from "lucide-react"
import { createCliente, deleteClientes, editarCliente, fetchCliente } from "@/fetchs/fetchCliente"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import DialogNewCliente from "@/components/DialogNewCliente";
import DialogClienteDetails from "@/components/DialogClienteDetails";

const LIMIT = 7;

const Cliente = () => {
    //state para receber a lista de clientes
    const [listaCliente, setListaCliente] = useState([])

    //states para receber os dados de paginação
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [total, setTotal] = useState(0)

    //state para abrir dialog de new cliente e cliente details
    const [open, setOpen] = useState(false)
    const [openDetails, setOpenDetails] = useState(false)

    //state para receber os dados do cliente selecionado dentro do dialog details
    const [clienteSelecionado, setClienteSelecionado] = useState(null)

    //função para buscar os dados (lista de clientes)
    const getDados = async (page = currentPage) => {
        const resposta = await fetchCliente(page, LIMIT)
        setListaCliente(resposta.data)
        setTotalPages(resposta.totalPages)
        setTotal(resposta.total)
        setCurrentPage(resposta.page)
    }

    const handleCreateNewCliente = async (nome, cpf, telefone, email) => {
        try {
            await createCliente(nome, cpf, telefone, email)
            toast.success("Cliente criado com sucesso!")
            await getDados(currentPage)
        } catch (error) {
            toast.error("Erro ao criar cliente!")
            throw error
        }
    }

    const handleEditarCliente = async (id, nome, cpf, telefone, email) => {
        try {
            await editarCliente(id, nome, cpf, telefone, email)
            toast.success("Cliente editado com sucesso!")
            await getDados(currentPage)
        } catch (error) {
            toast.error("Erro ao editar cliente!")
            throw error
        }
    }

    const deleteCliente = async (id) => {
        try {
            await deleteClientes(id)
            await getDados(currentPage)
            toast.success("Cliente deletado com sucesso!")
        } catch (error) {
            toast.error("Erro ao deletar cliente!")
            throw error
        }
    }

    const handleDialogDetailsOpen = (cliente) => {
        setClienteSelecionado(cliente)
        setOpenDetails(true)
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getDados(1)
    }, [])

    return (
        <div className="flex">
            <Sidebar />
            <Card className=" shadow flex-1 mb-4 mt-4 mr-4 ml-4 rounded-xl">
                <CardHeader className="flex">
                    <CardTitle>Clientes Cadastrados</CardTitle>
                    <Button variant="outline" className="ml-auto" onClick={() => setOpen(true)}>Novo cliente</Button>
                </CardHeader>
                {listaCliente.map((cliente) => (
                    <CardContent key={cliente.id}>
                        <Card
                            className="p-4 hover:bg-gray-100 shadow flex-row"
                        >
                            {cliente.nome}
                            <EyeIcon
                                size={25}
                                className="ml-auto text-gray-500"
                                onClick={() => handleDialogDetailsOpen(cliente)}
                            />
                            <Trash2Icon
                                size={23}
                                className="text-red-500"
                                onClick={() => deleteCliente(cliente.id)}
                            />
                        </Card>
                    </CardContent>
                ))}
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
            <DialogNewCliente open={open} onOpenChange={setOpen} onCreateNewCliente={handleCreateNewCliente} />
            <DialogClienteDetails open={openDetails} onOpenChange={setOpenDetails} clienteSelecionado={clienteSelecionado} onEditarCliente={handleEditarCliente} />
        </div>
    );
};

export default Cliente;