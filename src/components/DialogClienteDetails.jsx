import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { useEffect, useState } from "react"

const DialogClienteDetails = ({ open, onOpenChange, clienteSelecionado, onEditarCliente }) => {

    //states para editar os dados do cliente
    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")
    const [telefone, setTelefone] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmit = async () => {
        try {
            await onEditarCliente(clienteSelecionado.id, nome, cpf, telefone, email)
            toast.success("Cliente editado com sucesso!")
            onOpenChange(false)
        } catch (error) {
            toast.error("Erro ao editar cliente!")
            throw error
        }
    }

    useEffect(() => {
        if (clienteSelecionado) {
            setNome(clienteSelecionado.nome)
            setCpf(clienteSelecionado.cpf)
            setTelefone(clienteSelecionado.telefone)
            setEmail(clienteSelecionado.email)
        }
    }, [clienteSelecionado])

    return (
        <div>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{clienteSelecionado?.nome}</DialogTitle>
                        <DialogDescription>
                            ID: {clienteSelecionado?.id}
                        </DialogDescription>
                    </DialogHeader>
                    <form className="flex flex-col gap-2">
                        <div className="grid gap-2">
                            <label htmlFor="nome">Nome</label>
                            <Input type="text" id="nome" name="nome" placeholder="Digite o nome do cliente" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="cpf">CPF</label>
                            <Input type="text" id="cpf" name="cpf" placeholder="Digite o CPF do cliente" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="telefone">Telefone</label>
                            <Input type="text" id="telefone" name="telefone" placeholder="Digite o telefone do cliente" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="email">Email</label>
                            <Input type="text" id="email" name="email" placeholder="Digite o email do cliente" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                            <Button type="button" onClick={handleSubmit}>Salvar</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DialogClienteDetails