import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { useState } from "react";

const DialogNewFornecedor = ({ open, onOpenChange, onCreateNewFornecedor }) => {

    const [nome, setNome] = useState("")
    const [cnpj, setCnpj] = useState("")
    const [telefone, setTelefone] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmit = async () => {
        try {
            await onCreateNewFornecedor(nome, cnpj, telefone, email)
            setNome("")
            setCnpj("")
            setTelefone("")
            setEmail("")
            onOpenChange(false)
        } catch (error) {
            console.error("Erro ao criar novo fornecedor: ", error)
            throw error
        }
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Novo Fornecedor</DialogTitle>
                        <DialogDescription>
                            Preencha os campos abaixo para cadastrar um novo fornecedor
                        </DialogDescription>
                    </DialogHeader>
                    <form className="flex flex-col gap-2">
                        <div className="grid gap-2">
                            <label htmlFor="nome">Nome</label>
                            <Input type="text" id="nome" name="nome" placeholder="Digite o nome do fornecedor" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="cnpj">CNPJ</label>
                            <Input type="text" id="cnpj" name="cnpj" placeholder="Digite o CNPJ do fornecedor" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="telefone">Telefone</label>
                            <Input type="text" id="telefone" name="telefone" placeholder="Digite o telefone do fornecedor" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="email">Email</label>
                            <Input type="text" id="email" name="email" placeholder="Digite o email do fornecedor" value={email} onChange={(e) => setEmail(e.target.value)} />
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

export default DialogNewFornecedor