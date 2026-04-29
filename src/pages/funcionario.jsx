import DialogFuncionarioDetails from "@/components/DialogFuncionarioDetails";
import DialogNewFuncionario from "@/components/DialogNewFuncionario";
import Sidebar from "@/components/Sidebar"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFuncionario, deleteFuncionario, editarFuncionario, fetchFuncionario } from "@/fetchs/fetchFuncionario";
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const LIMIT = 7;

const Funcionario = () => {
    //state para receber a lista de funcionarios
    const [listaFuncionario, setListaFuncionario] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [total, setTotal] = useState(0)

    //State para abrir dialogs
    const [open, setOpen] = useState()
    const [openDetails, setOpenDetails] = useState()

    const [funcionarioSelecionado, setfuncionarioSelecionado] = useState()

    const getDados = async (page = currentPage) => {
        const resposta = await fetchFuncionario(page, LIMIT)
        setListaFuncionario(resposta.data)
        setTotalPages(resposta.totalPages)
        setTotal(resposta.total)
        setCurrentPage(resposta.page)
    }

    const criarFuncionario = async (nome, cpf) => {
        try {
            await createFuncionario(nome, cpf)
            toast.success("Funcionário criado com sucesso!")
            await getDados(currentPage)
        } catch (error) {
            toast.error("Erro ao criar funcionário!")
            throw error
        }
    }

    const handleEditarFuncionario = async (id, nome, cpf) => {
        try {
            await editarFuncionario(id, nome, cpf)
            toast.success("Funcionário editado com sucesso!")
            setOpenDetails(false)
            getDados(currentPage)
        } catch (error) {
            toast.error("Erro ao editar funcionário!")
            throw error
        }
    }

    const handleDeleteFuncionario = async (id) => {
        try {
            await deleteFuncionario(id)
            toast.success("Funcionário deletado com sucesso!")
            // Se deletou o último item da página atual, volta uma página
            const novaPagina = listaFuncionario.length === 1 && currentPage > 1
                ? currentPage - 1
                : currentPage
            await getDados(novaPagina)
        } catch (error) {
            toast.error("Erro ao deletar funcionário!")
            throw error
        }
    }

    const handleDialogDetailsOpen = (funcionario) => {
        setfuncionarioSelecionado(funcionario)
        setOpenDetails(true)
    }

    useEffect(() => {
        getDados(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex">
            <Sidebar />
            <Card className=" shadow flex-1 mb-4 mt-4 mr-4 ml-4 rounded-xl">
                <CardHeader className="flex">
                    <CardTitle>Funcionários Cadastrados</CardTitle>
                    <Button variant="outline" className="ml-auto" onClick={() => setOpen(true)}>Novo funcionário</Button>
                </CardHeader>
                {listaFuncionario.map((funcionario) => (
                    <CardContent key={funcionario.id}>
                        <Card
                            className="p-4 hover:bg-gray-100 shadow flex-row"
                        >
                            {funcionario.nome}
                            <EyeIcon
                                size={25}
                                className="ml-auto text-gray-500"
                                onClick={() => handleDialogDetailsOpen(funcionario)}
                            />
                            <Trash2Icon
                                size={23}
                                className="text-red-500"
                                onClick={() => handleDeleteFuncionario(funcionario.id)}
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
            <DialogNewFuncionario open={open} setOpen={setOpen} onCreateFuncionario={criarFuncionario} />
            <DialogFuncionarioDetails open={openDetails} setOpen={setOpenDetails} onEditarFuncionario={handleEditarFuncionario} funcionarioSelecionado={funcionarioSelecionado} />
        </div>
    );
};

export default Funcionario