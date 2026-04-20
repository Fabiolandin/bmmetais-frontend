import Sidebar from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import { createCategoria, fetchCategoria } from "@/fetchs/fetchCategoria"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"
import DialogCategoriaProduto from "@/components/DialogCategoriaProduto"

const CategoriaProduto = () => {
    const [listaCategoria, setListaCategoria] = useState([])

    const getDados = async () => {
        const dados = await fetchCategoria()
        setListaCategoria(dados)
    }

    const criarCategoriaProduto = async (nome) => {
        try {
            await createCategoria(nome)
            console.log("Categoria criada com sucesso!")
            await getDados()
        } catch (error) {
            console.error("Erro ao criar categoria: ", error)
            throw error
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getDados()
    }, [])

    const [open, setOpen] = useState(false)

    return (
        <div className="flex">
            <Sidebar />
            <Card className=" shadow flex-1 mb-4 mt-4 mr-4 ml-4 rounded-xl">
                <CardHeader className="flex">
                    <CardTitle>Categoria de produtos cadastradas</CardTitle>
                    <Button variant="outline" className="ml-auto" onClick={() => setOpen(true)}>Nova categoria</Button>
                </CardHeader>
                {listaCategoria.map((categoria) => (
                    <CardContent key={categoria.id}>
                        <Card
                            className="p-4 hover:bg-gray-100 shadow"
                        >
                            {categoria.nome}
                        </Card>
                    </CardContent>
                ))}
            </Card>
            <DialogCategoriaProduto open={open} onOpenChange={setOpen} onCreateCategoriaProduto={criarCategoriaProduto} />
        </div>
    )
}

export default CategoriaProduto