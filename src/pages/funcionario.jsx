import DialogFuncionarioDetails from "@/components/DialogFuncionarioDetails";
import DialogNewFuncionario from "@/components/DialogNewFuncionario";
import Sidebar from "@/components/Sidebar"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFuncionario, deleteFuncionario, editarFuncionario, fetchFuncionario } from "@/fetchs/fetchFuncionario";
import { EyeIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Funcionario = () => {
    //state para receber a lista de funcionarios
    const [listaFuncionario, setListaFuncionario] = useState([])

    //State para abrir dialogs
    const [open, setOpen] = useState()
    const [openDetails, setOpenDetails] = useState()

    const [funcionarioSelecionado, setfuncionarioSelecionado] = useState()

    const handleDialogDetailsOpen = (funcionario) => {
        setfuncionarioSelecionado(funcionario)
        setOpenDetails(true)
    }

    const getDados = async () => {
        const dados = await fetchFuncionario()
        setListaFuncionario(dados)
    }

    const handleEditarFuncionario = async (id, nome, cpf) => {
        try {
            await editarFuncionario(id, nome, cpf)
            toast.success("Funcionário editado com sucesso!")
            setOpenDetails(false)
            getDados()
        } catch (error) {
            toast.error("Erro ao editar funcionário!")
            throw error
        }
    }

    const criarFuncionario = async (nome, cpf) => {
        try {
            await createFuncionario(nome, cpf)
            toast.success("Funcionário criado com sucesso!")
            await getDados()
        } catch (error) {
            toast.error("Erro ao criar funcionário!")
            throw error
        }
    }

    const handleDeleteFuncionario = async (id) => {
        try {
            await deleteFuncionario(id)
            toast.success("Funcionário deletado com sucesso!")
            await getDados()
        } catch (error) {
            toast.error("Erro ao deletar funcionário!")
            throw error
        }
    }

    useEffect(() => {
        getDados()
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
            </Card>
            <DialogNewFuncionario open={open} setOpen={setOpen} onCreateFuncionario={criarFuncionario} />
            <DialogFuncionarioDetails open={openDetails} setOpen={setOpenDetails} onEditarFuncionario={handleEditarFuncionario} funcionarioSelecionado={funcionarioSelecionado} />
        </div>
    );
};

export default Funcionario