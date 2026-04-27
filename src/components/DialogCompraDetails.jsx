import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"

export const DialogCompraDetails = ({ open, onOpenChange }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Detalhes da Compra</DialogTitle>
                    <DialogDescription>
                        Confira os detalhes da compra.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}