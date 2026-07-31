import Sidebar from "@/components/Sidebar"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BoxIcon, ChevronLeftIcon, ChevronRightIcon, DollarSignIcon, EyeIcon, Trash2Icon } from "lucide-react"
import { createProduto, deleteProduto, fetchProduto, updateProduto } from "@/fetchs/fetchProduto";
import { Button } from "@/components/ui/button";
import DialogNewProduto from "@/components/DialogNewProduto";
import DialogProdutoDetails from "@/components/DialogProdutoDetails";
import { toast } from "sonner";
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog";

const LIMIT = 7;

const Produto = () => {
    //state para receber a lista de produtos
    const [listaProduto, setListaProduto] = useState([])

    //state para paginação
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [total, setTotal] = useState(0)

    //State para loading
    const [isLoading, setIsLoading] = useState(false)

    //state para abrir dialog de new produto e produto details
    const [open, setOpen] = useState(false)
    const [openDetails, setOpenDetails] = useState(false)

    const [produtoSelecionado, setProdutoSelecionado] = useState(null)


    const getDados = async (page = currentPage) => {
        setIsLoading(true)
        try {
            const dados = await fetchProduto(page, LIMIT)
            setListaProduto(dados.data)
            setCurrentPage(dados.page)
            setTotalPages(dados.totalPages)
            setTotal(dados.total)
        } catch (error) {
            console.error("Erro ao buscar produtos:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleCreateNewProduto = async (nome, descricao, preco, categoria_produtoId, estoque) => {
        try {
            await createProduto(nome, descricao, preco, categoria_produtoId, estoque)
            toast.success("Produto criado com sucesso!")
            await getDados(currentPage)
        } catch (error) {
            toast.error("Erro ao criar novo produto!")
            throw error
        }
    }

    const handleUpdateProduto = async (id, nome, descricao, preco, categoria_produtoId, estoque) => {
        try {
            await updateProduto(id, nome, descricao, preco, categoria_produtoId, estoque)
            await getDados(currentPage)
        } catch (error) {
            console.error("Erro ao atualizar produto:", error)
            throw error
        }
    }

    const handleDeleteProduto = async (id) => {
        try {
            await deleteProduto(id)
            await getDados(currentPage)
            toast.success("Produto deletado com sucesso!")
        } catch (error) {
            toast.error("Erro ao deletar produto!")
            console.error(error)
        }
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
                    <CardTitle>Produtos Cadastrados</CardTitle>
                    <Button variant="outline" className="ml-auto" onClick={() => setOpen(true)}>Novo produto</Button>
                </CardHeader>
                {/* Loading */}
                {isLoading ? (
                    <p className="text-center text-muted-foreground py-8">Carregando produtos...</p>
                ) : listaProduto.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Nenhum produto cadastrado...</p>
                ) : (
                    listaProduto.map((produto) => (
                        <CardContent key={produto.id}>
                            <Card
                                className="p-4 hover:bg-gray-100 shadow flex flex-row items-center gap-4"
                            >
                                <div className="flex-1">{produto.nome}
                                    <div className="flex gap-1 items-center">
                                        <BoxIcon size={15} className="text-gray-500 " />
                                        <p className="text-xs text-muted-foreground">Estoque: {produto.estoque}</p>
                                    </div>
                                </div>

                                <div className="text-right mr-4">
                                    <div className="font-semibold text-gray-900">R$ {produto.preco.toFixed(2)}</div>
                                    <div className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Valor unitário</div>
                                </div>

                                <div className="flex gap-2 items-center justify-center align-center">
                                    <EyeIcon
                                        size={25}
                                        className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                                        onClick={() => {
                                            setProdutoSelecionado(produto)
                                            setOpenDetails(true)
                                        }}
                                    />
                                    <ConfirmDeleteDialog
                                        trigger={<Trash2Icon size={23} className="text-red-400 hover:text-red-600 transition-colors cursor-pointer" />}
                                        titulo={produto.nome}
                                        descricao="Produto"
                                        funcao={() => handleDeleteProduto(produto.id)}
                                    />

                                </div>
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
            <DialogNewProduto open={open} onOpenChange={setOpen} onCreateNewProduto={handleCreateNewProduto} />
            <DialogProdutoDetails open={openDetails} onOpenChange={setOpenDetails} produtoSelecionado={produtoSelecionado} onEditarProduto={handleUpdateProduto} />
        </div>
    );
};

export default Produto
