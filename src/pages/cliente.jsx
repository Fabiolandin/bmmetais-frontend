import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EyeIcon, Trash2Icon } from "lucide-react"
import { createCliente, deleteClientes, editarCliente, fetchCliente } from "@/fetchs/fetchCliente"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import DialogNewCliente from "@/components/DialogNewCliente";
import DialogClienteDetails from "@/components/DialogClienteDetails";

const Cliente = () => {
    //state para receber a lista de clientes
    const [listaCliente, setListaCliente] = useState([])

    //state para abrir dialog de new cliente e cliente details
    const [open, setOpen] = useState(false)
    const [openDetails, setOpenDetails] = useState(false)

    //state para receber os dados do cliente selecionado dentro do dialog details
    const [clienteSelecionado, setClienteSelecionado] = useState(null)

    //função para buscar os dados (lista de clientes)
    const getDados = async () => {
        const dados = await fetchCliente()
        setListaCliente(dados)
    }

    const handleCreateNewCliente = async (nome, cpf, telefone, email) => {
        try {
            await createCliente(nome, cpf, telefone, email)
            toast.success("Cliente criado com sucesso!")
            await getDados()
        } catch (error) {
            toast.error("Erro ao criar cliente!")
            throw error
        }
    }

    const handleEditarCliente = async (id, nome, cpf, telefone, email) => {
        try {
            await editarCliente(id, nome, cpf, telefone, email)
            toast.success("Cliente editado com sucesso!")
            await getDados()
        } catch (error) {
            toast.error("Erro ao editar cliente!")
            throw error
        }
    }

    const deleteCliente = async (id) => {
        try {
            await deleteClientes(id)
            await getDados()
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
        getDados()
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
            </Card>
            <DialogNewCliente open={open} onOpenChange={setOpen} onCreateNewCliente={handleCreateNewCliente} />
            <DialogClienteDetails open={openDetails} onOpenChange={setOpenDetails} clienteSelecionado={clienteSelecionado} onEditarCliente={handleEditarCliente} />
        </div>
    );
};

export default Cliente;