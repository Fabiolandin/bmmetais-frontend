
import DialogFornecedorDetails from "@/components/DialogFornecedorDetails";
import DialogNewFornecedor from "@/components/DialogNewFornecedor";
import Sidebar from "@/components/Sidebar"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFornecedor, deleteFornecedor, editarFornecedor, fetchFornecedor } from "@/fetchs/fetchFornecedor";
import { EyeIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Fornecedor = () => {

    //state para abrir dialogs
    const [open, setOpen] = useState(false)
    const [openDetails, setOpenDetails] = useState(false)

    //state para receber a lista de fornecedores
    const [listaFornecedor, setListaFornecedor] = useState([])

    //state para receber o fornecedor selecionado
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null)

    const handleDialogDetailsOpen = (fornecedor) => {
        setFornecedorSelecionado(fornecedor)
        setOpenDetails(true)
    }

    const deleteCliente = () => {

    }

    const getDados = async () => {
        const dados = await fetchFornecedor()
        setListaFornecedor(dados)
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getDados()
    }, [])

    const handleCreateNewFornecedor = async (nome, cnpj, telefone, email) => {
        try {
            await createFornecedor(nome, cnpj, telefone, email)
            toast.success("Fornecedor criado com sucesso!")
            setOpen(false)
            await getDados()
        } catch (error) {
            toast.error("Erro ao criar fornecedor!")
            throw error
        }
    }

    const handleEditarFornecedor = async (id, nome, cnpj, telefone, email) => {
        try {
            await editarFornecedor(id, nome, cnpj, telefone, email)
            toast.success("Fornecedor editado com sucesso!")
            setOpenDetails(false)
            await getDados()
        } catch (error) {
            toast.error("Erro ao editar fornecedor!")
            throw error
        }
    }

    const handleDeleteFornecedor = async (id) => {
        try {
            await deleteFornecedor(id)
            toast.success("Fornecedor deletado com sucesso!")
            await getDados()
        } catch (error) {
            toast.error("Erro ao deletar fornecedor!")
            throw error
        }
    }

    return (
        <div className="flex">
            <Sidebar />
            <Card className=" shadow flex-1 mb-4 mt-4 mr-4 ml-4 rounded-xl">
                <CardHeader className="flex">
                    <CardTitle>Fornecedores Cadastrados</CardTitle>
                    <Button variant="outline" className="ml-auto" onClick={() => setOpen(true)}>Novo fornecedor</Button>
                </CardHeader>
                {listaFornecedor.map((fornecedor) => (
                    <CardContent key={fornecedor.id}>
                        <Card
                            className="p-4 hover:bg-gray-100 shadow flex-row"
                        >
                            {fornecedor.nome}
                            <EyeIcon
                                size={25}
                                className="ml-auto text-gray-500"
                                onClick={() => handleDialogDetailsOpen(fornecedor)}
                            />
                            <Trash2Icon
                                size={23}
                                className="text-red-500"
                                onClick={() => handleDeleteFornecedor(fornecedor.id)}
                            />
                        </Card>
                    </CardContent>
                ))}
            </Card>
            <DialogNewFornecedor open={open} onOpenChange={setOpen} onCreateNewFornecedor={handleCreateNewFornecedor} />
            <DialogFornecedorDetails open={openDetails} onOpenChange={setOpenDetails} fornecedorSelecionado={fornecedorSelecionado} onEditarFornecedor={handleEditarFornecedor} />
        </div>
    );
};

export default Fornecedor