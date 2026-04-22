import { toast } from "sonner"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Input } from "./ui/input"
import { useState } from "react"

const DialogNewFuncionario = ({ open, setOpen, onCreateFuncionario }) => {
    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")

    const handleSubmit = async () => {
        try {
            await onCreateFuncionario(nome, cpf)
            setNome("")
            setCpf("")
            setOpen(false)
        } catch (error) {
            toast.error("Erro ao cadastrar funcionário!", error)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Novo funcionário</DialogTitle>
                        <DialogDescription>Preencha todos os campos abaixo</DialogDescription>
                    </DialogHeader>
                    <form className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <label htmlFor="nome">Nome</label>
                            <Input value={nome} onChange={(e) => setNome(e.target.value)} type="text" id="nome" name="nome" />
                            <label htmlFor="cpf">CPF</label>
                            <Input value={cpf} onChange={(e) => setCpf(e.target.value)} type="text" id="cpf" name="cpf" />
                        </div>

                    </form>
                    <DialogFooter>
                        <Button variant="outline" onClick={handleClose}>Cancelar</Button>
                        <Button type="button" onClick={handleSubmit}>Salvar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DialogNewFuncionario
