import { toast } from "sonner"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Input } from "./ui/input"
import { useEffect, useState } from "react"

const DialogFuncionarioDetails = ({ open, setOpen, funcionarioSelecionado, onEditarFuncionario }) => {

    //state para receber os dados de edição
    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = async () => {
        try {
            await onEditarFuncionario(funcionarioSelecionado.id, nome, cpf)
            toast.success("Funcionário editado com sucesso!")
            setOpen(false)
        } catch (error) {
            toast.error("Erro ao editar funcionário!")
            throw error
        }
    }

    useEffect(() => {
        if (funcionarioSelecionado) {
            setNome(funcionarioSelecionado.nome)
            setCpf(funcionarioSelecionado.cpf)
        }
    }, [funcionarioSelecionado])


    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Detalhes</DialogTitle>
                        <DialogDescription>Preencha todos os campos abaixo</DialogDescription>
                    </DialogHeader>
                    <form className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <label htmlFor="nome">Nome</label>
                            <Input type="text" id="nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                            <label htmlFor="cpf">CPF</label>
                            <Input type="text" id="cpf" name="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} />
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

export default DialogFuncionarioDetails
