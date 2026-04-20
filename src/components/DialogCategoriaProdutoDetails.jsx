import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { useEffect, useState } from "react"

const DialogCategoriaProdutoDetails = ({ open, onOpenChange, categoriaSelecionada, onEditarCategoriaProduto }) => {

    const handleClose = () => {
        onOpenChange(false)
    }

    const handleSubmit = async () => {
        if (!nomeEditado.trim()) return
        try {
            await onEditarCategoriaProduto(categoriaSelecionada.id, nomeEditado)
            console.log("Categoria editada com sucesso!")
            onOpenChange(false)
        } catch (error) {
            console.error("Erro ao editar categoria: ", error)
            throw error
        }
    }

    const [nomeEditado, setNomeEditado] = useState("")

    useEffect(() => {
        if (categoriaSelecionada) {
            setNomeEditado(categoriaSelecionada.nome)
        }
    }, [categoriaSelecionada])

    return (
        <div>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>{categoriaSelecionada?.nome}</DialogTitle>
                        <DialogDescription>ID: {categoriaSelecionada?.id}</DialogDescription>
                    </DialogHeader>
                    <form className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <Input
                                type="text"
                                id="nome"
                                value={nomeEditado}
                                placeholder="Digite o nome da categoria de produto"
                                onChange={(e) => setNomeEditado(e.target.value)}
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleClose()}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="button"
                                onClick={handleSubmit}
                                disabled={!categoriaSelecionada?.nome.trim()}
                            >
                                Salvar
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DialogCategoriaProdutoDetails