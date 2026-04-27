import Sidebar from "@/components/Sidebar"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EyeIcon, Trash2Icon } from "lucide-react"
import { createProduto, deleteProduto, fetchProduto, updateProduto } from "@/fetchs/fetchProduto";
import { Button } from "@/components/ui/button";
import DialogNewProduto from "@/components/DialogNewProduto";
import DialogProdutoDetails from "@/components/DialogProdutoDetails";
import { toast } from "sonner";

const Produto = () => {

    //state para abrir dialog de new produto e produto details
    const [open, setOpen] = useState(false)
    const [openDetails, setOpenDetails] = useState(false)
    const [produtoSelecionado, setProdutoSelecionado] = useState(null)

    //state para receber a lista de produtos
    const [listaProduto, setListaProduto] = useState([])

    const getDados = async () => {
        try {
            const dados = await fetchProduto()
            setListaProduto(dados)
        } catch (error) {
            console.error("Erro ao buscar produtos:", error)
        }
    }

    const handleCreateNewProduto = async (nome, descricao, preco, categoria_produtoId, estoque) => {
        try {
            await createProduto(nome, descricao, preco, categoria_produtoId, estoque)
            toast.success("Produto criado com sucesso!")
            await getDados()
        } catch (error) {
            toast.error("Erro ao criar novo produto!")
            throw error
        }
    }

    const handleUpdateProduto = async (id, nome, descricao, preco, categoria_produtoId, estoque) => {
        try {
            await updateProduto(id, nome, descricao, preco, categoria_produtoId, estoque)
            await getDados()
        } catch (error) {
            console.error("Erro ao atualizar produto:", error)
            throw error
        }
    }

    const handleDeleteProduto = async (e, id) => {
        console.log("handleDeleteProduto clicado para ID:", id)
        e.stopPropagation()
        try {
            await deleteProduto(id)
            await getDados()
            toast.success("Produto deletado com sucesso!")
        } catch (error) {
            toast.error("Erro ao deletar produto!")
            console.error(error)
        }
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
                    <CardTitle>Produtos Cadastrados</CardTitle>
                    <Button variant="outline" className="ml-auto" onClick={() => setOpen(true)}>Novo produto</Button>
                </CardHeader>
                {listaProduto.map((produto) => (
                    <CardContent key={produto.id}>
                        <Card
                            className="p-4 hover:bg-gray-100 shadow flex flex-row items-center gap-4 cursor-pointer"
                        >
                            <div className="flex-1">{produto.nome}</div>
                            <div className="flex gap-2">
                                <EyeIcon
                                    size={25}
                                    className="text-gray-500 cursor-pointer hover:text-blue-500"
                                    onClick={() => {
                                        setProdutoSelecionado(produto)
                                        setOpenDetails(true)
                                    }}
                                />
                                <Trash2Icon
                                    size={23}
                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                    onClick={(e) => handleDeleteProduto(e, produto.id)}
                                />
                            </div>
                        </Card>
                    </CardContent>
                ))}
            </Card>
            <DialogNewProduto open={open} onOpenChange={setOpen} onCreateNewProduto={handleCreateNewProduto} />
            <DialogProdutoDetails open={openDetails} onOpenChange={setOpenDetails} produtoSelecionado={produtoSelecionado} onEditarProduto={handleUpdateProduto} />
        </div>
    );
};

export default Produto
