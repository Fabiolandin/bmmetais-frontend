import Sidebar from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import { createCategoria, deleteCategoria, editarCategoria, fetchCategoria } from "@/fetchs/fetchCategoria"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"
import DialogCategoriaProduto from "@/components/DialogCategoriaNewProduto"
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon, Trash2Icon } from "lucide-react"
import DialogCategoriaProdutoDetails from "@/components/DialogCategoriaProdutoDetails"
import { toast } from "sonner"
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog"

const LIMIT = 7;

const CategoriaProduto = () => {
    //state para receber a lista de categoria de produtos
    const [listaCategoria, setListaCategoria] = useState([])

    //states para paginação
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [total, setTotal] = useState(0)

    //State para loading
    const [isLoading, setIsLoading] = useState(false)

    //states para setar abrie e fechar de dialogs
    const [open, setOpen] = useState(false)
    const [openDetails, setOpenDetails] = useState(false)

    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null)

    const getDados = async (page = currentPage) => {
        setIsLoading(true)
        try{
            const dados = await fetchCategoria(page, LIMIT)
            setListaCategoria(dados.data)
            setCurrentPage(dados.page)
            setTotalPages(dados.totalPages)
            setTotal(dados.total)
        } catch (error){
            console.log("Erro ao buscar categoria de produtos:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const criarCategoriaProduto = async (nome) => {
        try {
            await createCategoria(nome)
            toast.success("Categoria criada com sucesso!")
            await getDados(currentPage)
        } catch (error) {
            toast.error("Erro ao criar categoria!")
            throw error
        }
    }

    const editarCategoriaProduto = async (id, nome) => {
        try {
            await editarCategoria(id, nome)
            toast.success("Categoria editada com sucesso!")
            await getDados(currentPage)
        } catch (error) {
            toast.error("Erro ao editar categoria!")
            throw error
        }
    }

    const deleteCategoriaProduto = async (id) => {
        try {
            await deleteCategoria(id)
            await getDados(currentPage)
            toast.success("Categoria deletada com sucesso!")
        } catch (error) {
            toast.error("Erro ao deletar categoria!")
            throw error
        }
    }

    //função para abrir dialog e ja mandar a categoria selecionada
    const handleDialogOpen = (categoria) => {
        setCategoriaSelecionada(categoria)
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
                    <CardTitle>Categoria de produtos cadastradas</CardTitle>
                    <Button variant="outline" className="ml-auto" onClick={() => setOpen(true)}>Nova categoria</Button>
                </CardHeader>
                {/* Loading */}
                {isLoading ? (
                    <p className="text-center text-muted-foreground py-8">Carregando Categoria de produtos...</p>
                ) : listaCategoria.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Nenhuma Categoria de produto cadastrado...</p>
                ) : (
                    listaCategoria.map((categoria) => (
                        <CardContent key={categoria.id}>
                            <Card
                                className="p-4 hover:bg-gray-100 shadow flex-row"
                            >
                                {categoria.nome}
                                <EyeIcon
                                    size={25}
                                    className="ml-auto text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                                    onClick={() => handleDialogOpen(categoria)}
                                />
                                <ConfirmDeleteDialog
                                    trigger={<Trash2Icon size={23} className="text-red-400 hover:text-red-600 transition-colors cursor-pointer" />}
                                    titulo={categoria.nome}
                                    descricao="Categoria de produto"
                                    funcao={() => deleteCategoriaProduto(categoria.id)}
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
            <DialogCategoriaProduto open={open} onOpenChange={setOpen} onCreateCategoriaProduto={criarCategoriaProduto} />
            <DialogCategoriaProdutoDetails open={openDetails} onOpenChange={setOpenDetails} categoriaSelecionada={categoriaSelecionada} onEditarCategoriaProduto={editarCategoriaProduto} />
        </div>
    )
}

export default CategoriaProduto