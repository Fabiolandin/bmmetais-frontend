import Sidebar from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import { fetchCategoria } from "@/fetchs/fetchCategoria"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"

const CategoriaProduto = () => {
    const [listaCategoria, setListaCategoria] = useState([])

    const getDados = async () => {
        const dados = await fetchCategoria()
        setListaCategoria(dados)
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getDados()
    }, [])

    return (
        <div className="flex">
            <Sidebar />
            <Card className=" shadow flex-1 mb-4 mt-4 mr-4 ml-4 rounded-xl">
                <CardHeader className="flex">
                    <CardTitle>Categoria de produtos cadastradas</CardTitle>
                    <Button variant="outline" className="ml-auto">Nova categoria</Button>
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
        </div>
    )
}

export default CategoriaProduto