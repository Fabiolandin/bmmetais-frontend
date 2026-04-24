import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { fetchCategoria } from "@/fetchs/fetchCategoria"
import { cn } from "@/lib/utils"

const DialogNewProduto = ({ open, onOpenChange, onCreateNewProduto }) => {

    //states para o novo produto
    const [nome, setNome] = useState("")
    const [descricao, setDescricao] = useState("")
    const [preco, setPreco] = useState("")
    const [categoria_produtoId, setCategoria_produtoId] = useState("")
    const [estoque, setEstoque] = useState("")

    //state para receber a lista de categorias
    const [categorias, setCategorias] = useState([])

    const handleSubmit = async () => {
        if (!categoria_produtoId) {
            alert("Por favor, selecione uma categoria.")
            return
        }
        try {
            // Conversão de tipos: preco, estoque e categoriaId devem ser números
            const precoNum = parseFloat(preco)
            const estoqueNum = parseInt(estoque)
            const categoriaIdNum = parseInt(categoria_produtoId)

            await onCreateNewProduto(nome, descricao, precoNum, categoriaIdNum, estoqueNum)

            // Limpa os campos após o sucesso
            setNome("")
            setDescricao("")
            setPreco("")
            setCategoria_produtoId("")
            setEstoque("")
            onOpenChange(false)
        } catch (error) {
            console.error("Erro ao criar novo produto: ", error)
        }
    }

    // Função para buscar as categorias
    const loadCategorias = async () => {
        try {
            const data = await fetchCategoria()
            setCategorias(data)
        } catch (error) {
            console.error("Erro ao carregar categorias:", error)
        }
    }

    // Busca as categorias ao abrir o dialog
    useEffect(() => {
        if (open) {
            loadCategorias()
        }
    }, [open])

    return (
        <div>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Novo Produto</DialogTitle>
                        <DialogDescription>
                            Preencha os campos abaixo para cadastrar um novo produto
                        </DialogDescription>
                    </DialogHeader>
                    <form className="flex flex-col gap-2">
                        <div className="grid gap-2">
                            <label htmlFor="nome">Nome</label>
                            <Input type="text" id="nome" name="nome" placeholder="Digite o nome do produto" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="descricao">Descrição</label>
                            <Input type="text" id="descricao" name="descricao" placeholder="Digite a descrição do produto" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="preco">Preço</label>
                            <Input type="number" id="preco" name="preco" placeholder="0.00" value={preco} onChange={(e) => setPreco(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="estoque">Estoque</label>
                            <Input type="number" id="estoque" name="estoque" placeholder="0" value={estoque} onChange={(e) => setEstoque(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="categoria_produtoId">Categoria</label>
                            <select
                                id="categoria_produtoId"
                                name="categoria_produtoId"
                                value={categoria_produtoId}
                                onChange={(e) => setCategoria_produtoId(e.target.value)}
                                className={cn(
                                    "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
                                )}
                            >
                                <option value="" disabled>Selecione uma categoria</option>
                                {categorias.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <DialogFooter className="mt-4">
                            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>Cancelar</Button>
                            <Button type="button" onClick={handleSubmit}>Salvar</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DialogNewProduto
