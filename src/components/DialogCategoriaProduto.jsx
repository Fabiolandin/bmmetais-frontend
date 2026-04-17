import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"

const DialogCategoriaProduto = () => {
    return (
        <div>
            <Dialog className="w-[600px]">
                <DialogHeader>
                    <DialogTitle>Cadastro de Categoria de Produto</DialogTitle>
                    <DialogDescription>Preencha os campos abaixo para cadastrar uma categoria de produto</DialogDescription>
                </DialogHeader>

                <DialogContent>
                    <form className="flex flex-col gap-4">
                        <label htmlFor="nome">Nome</label>
                        <Input type="text" id="nome" name="nome" />

                        <DialogFooter>
                            <Button type="submit">Cadastrar</Button>
                            <Button type="reset">Cancelar</Button>
                        </DialogFooter>
                    </form>

                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DialogCategoriaProduto