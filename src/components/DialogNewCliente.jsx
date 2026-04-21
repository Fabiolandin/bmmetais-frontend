import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { useState } from "react"

const DialogNewCliente = ({ open, onOpenChange, onCreateNewCliente }) => {

    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")
    const [telefone, setTelefone] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmit = async () => {
        try {
            await onCreateNewCliente(nome, cpf, telefone, email)
            setNome("")
            setCpf("")
            setTelefone("")
            setEmail("")
            onOpenChange(false)
        } catch (error) {
            console.error("Erro ao criar novo cliente: ", error)
            throw error
        }
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Novo Cliente</DialogTitle>
                        <DialogDescription>
                            Preencha os campos abaixo para cadastrar um novo cliente
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
                        <DialogFooter className="">
                            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                            <Button type="button" onClick={handleSubmit}>Salvar</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DialogNewCliente