import Sidebar from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import { createCategoria, deleteCategoria, editarCategoria, fetchCategoria } from "@/fetchs/fetchCategoria"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"
import DialogCategoriaProduto from "@/components/DialogCategoriaNewProduto"
import { EyeIcon, Trash2Icon } from "lucide-react"
import DialogCategoriaProdutoDetails from "@/components/DialogCategoriaProdutoDetails"
import { toast } from "sonner"

const CategoriaProduto = () => {
    const [listaCategoria, setListaCategoria] = useState([])

    const getDados = async () => {
        const dados = await fetchCategoria()
        setListaCategoria(dados)
    }

    const criarCategoriaProduto = async (nome) => {
        try {
            await createCategoria(nome)
            toast.success("Categoria criada com sucesso!")
            await getDados()
        } catch (error) {
            toast.error("Erro ao criar categoria!")
            throw error
        }
    }

    const editarCategoriaProduto = async (id, nome) => {
        try {
            await editarCategoria(id, nome)
            toast.success("Categoria editada com sucesso!")
            await getDados()
        } catch (error) {
            toast.error("Erro ao editar categoria!")
            throw error
        }
    }


    const deleteCategoriaProduto = async (id) => {
        try {
            await deleteCategoria(id)
            await getDados()
            toast.success("Categoria deletada com sucesso!")
        } catch (error) {
            toast.error("Erro ao deletar categoria!")
            throw error
        }
    }


    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getDados()
    }, [])

    //states para setar abrie e fechar de dialogs
    const [open, setOpen] = useState(false)
    const [openDetails, setOpenDetails] = useState(false)

    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null)

    //função para abrir dialog e ja mandar a categoria selecionada
    const handleDialogOpen = (categoria) => {
        setCategoriaSelecionada(categoria)
        setOpenDetails(true)
    }

    return (
        <div className="flex">
            <Sidebar />
            <Card className=" shadow flex-1 mb-4 mt-4 mr-4 ml-4 rounded-xl">
                <CardHeader className="flex">
                    <CardTitle>Categoria de produtos cadastradas</CardTitle>
                    <Button variant="outline" className="ml-auto" onClick={() => setOpen(true)}>Nova categoria</Button>
                </CardHeader>
                {listaCategoria.map((categoria) => (
                    <CardContent key={categoria.id}>
                        <Card
                            className="p-4 hover:bg-gray-100 shadow flex-row"
                        >
                            {categoria.nome}
                            <EyeIcon
                                size={25}
                                className="ml-auto text-gray-500"
                                onClick={() => handleDialogOpen(categoria)}
                            />
                            <Trash2Icon
                                size={23}
                                className="text-red-500"
                                onClick={() => deleteCategoriaProduto(categoria.id)}
                            />
                        </Card>
                    </CardContent>
                ))}
            </Card>
            <DialogCategoriaProduto open={open} onOpenChange={setOpen} onCreateCategoriaProduto={criarCategoriaProduto} />
            <DialogCategoriaProdutoDetails open={openDetails} onOpenChange={setOpenDetails} categoriaSelecionada={categoriaSelecionada} onEditarCategoriaProduto={editarCategoriaProduto} />
        </div>
    )
}

export default CategoriaProduto