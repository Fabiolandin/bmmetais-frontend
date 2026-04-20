import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { useState } from "react"

const DialogCategoriaProduto = ({ open, onOpenChange, onCreateCategoriaProduto }) => {
    const [nome, setNome] = useState("")

    const handleSubmit = async () => {
        if (!nome.trim()) return
        try {
            await onCreateCategoriaProduto(nome)
            setNome("")
            onOpenChange(false)
        } catch (error) {
            console.log("Erro ao criar categoria de produto: ", error)
        }
    }

    const handleClose = () => {
        setNome("")
        onOpenChange(false)
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Cadastro de Categoria de Produto</DialogTitle>
                        <DialogDescription>Preencha os campos abaixo para cadastrar uma categoria de produto</DialogDescription>
                    </DialogHeader>
                    <form className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <label htmlFor="nome" className="text-sm font-medium">Nome</label>
                            <Input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Digite o nome da categoria de produto"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
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
                                disabled={!nome.trim()}
                            >
                                Cadastrar
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DialogCategoriaProduto