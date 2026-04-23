import { toast } from "sonner"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { useEffect, useState } from "react"

const DialogFornecedorDetails = ({ open, onOpenChange, fornecedorSelecionado, onEditarFornecedor }) => {

    //state para receber os dados do formulario
    const [nome, setNome] = useState("")
    const [cnpj, setCnpj] = useState("")
    const [telefone, setTelefone] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmit = async () => {
        try {
            await onEditarFornecedor(fornecedorSelecionado.id, nome, cnpj, telefone, email)
            toast.success("Fornecedor editado com sucesso!")
            onOpenChange(false)
        } catch (error) {
            toast.error("Erro ao editar fornecedor!")
            throw error
        }
    }

    useEffect(() => {
        if (fornecedorSelecionado) {
            setNome(fornecedorSelecionado.nome)
            setCnpj(fornecedorSelecionado.cnpj)
            setTelefone(fornecedorSelecionado.telefone)
            setEmail(fornecedorSelecionado.email)
        }
    }, [fornecedorSelecionado])

    return (
        <div>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{fornecedorSelecionado?.nome}</DialogTitle>
                        <DialogDescription>
                            ID: {fornecedorSelecionado?.id}
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

export default DialogFornecedorDetails