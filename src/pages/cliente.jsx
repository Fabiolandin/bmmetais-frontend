import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon, Phone, Trash2Icon, UserIcon } from "lucide-react"
import { createCliente, deleteClientes, editarCliente, fetchCliente } from "@/fetchs/fetchCliente"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import DialogNewCliente from "@/components/DialogNewCliente";
import DialogClienteDetails from "@/components/DialogClienteDetails";
import { formatarTelefone } from "@/utils/formaters/telefone";
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog";

const LIMIT = 7;

const Cliente = () => {
    //state para receber a lista de clientes
    const [listaCliente, setListaCliente] = useState([])

    //states para receber os dados de paginação
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [total, setTotal] = useState(0)

    //State para loading
    const [isLoading, setIsLoading] = useState(false)

    //state para abrir dialog de new cliente e cliente details
    const [open, setOpen] = useState(false)
    const [openDetails, setOpenDetails] = useState(false)

    //state para receber os dados do cliente selecionado dentro do dialog details
    const [clienteSelecionado, setClienteSelecionado] = useState(null)

    //função para buscar os dados (lista de clientes)
    const getDados = async (page = currentPage) => {
        setIsLoading(true)
        try {
            const resposta = await fetchCliente(page, LIMIT)
            setListaCliente(resposta.data)
            setCurrentPage(resposta.page)
            setTotalPages(resposta.totalPages)
            setTotal(resposta.total)
        } catch (error) {
            console.log("Erro ao buscar clientes:", error)
        } finally {
            setIsLoading(false)
        }
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
        getDados(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <Card className="shadow flex-1 mb-4 mt-4 mr-4 ml-4 rounded-xl">
                <CardHeader className="flex">
                    <CardTitle>Clientes Cadastrados</CardTitle>
                    <Button variant="outline" className="ml-auto" onClick={() => setOpen(true)}>Novo cliente</Button>
                </CardHeader>
                {/* Loading */}
                {isLoading ? (
                    <p className="text-center text-muted-foreground py-8">Carregando clientes...</p>
                ) : listaCliente.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Nenhum cliente cadastrado...</p>
                ) : (
                    listaCliente.map((cliente) => (
                        <CardContent key={cliente.id}>
                            <Card className="p-4 hover:bg-gray-100 shadow-sm border flex flex-row items-center gap-4 cursor-pointer transition-colors">
                                <div className="flex-1">{cliente.nome}
                                    <div className="flex gap-1 items-center">
                                        <UserIcon size={15} className="text-gray-500 " />
                                        <p className="text-xs text-muted-foreground">Email: {cliente.email}</p>
                                        <Phone size={15} className="text-gray-500 ml-3" />
                                        <p className="text-xs text-muted-foreground">Telefone: {formatarTelefone(cliente.telefone)}</p>
                                    </div>
                                </div>
                                <EyeIcon
                                    size={25}
                                    className="ml-auto text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                                    onClick={() => handleDialogDetailsOpen(cliente)}
                                />
                                <ConfirmDeleteDialog
                                    trigger={<Trash2Icon size={23} className="text-red-400 hover:text-red-600 transition-colors cursor-pointer" />}
                                    titulo={cliente.nome}
                                    descricao="Cliente"
                                    funcao={() => deleteCliente(cliente.id)}
                                />
                            </Card>
                        </CardContent>
                    ))
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
            <DialogNewCliente open={open} onOpenChange={setOpen} onCreateNewCliente={handleCreateNewCliente} />
            <DialogClienteDetails open={openDetails} onOpenChange={setOpenDetails} clienteSelecionado={clienteSelecionado} onEditarCliente={handleEditarCliente} />
        </div>
    );
};

export default Cliente;