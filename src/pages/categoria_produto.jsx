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
        getDados()
    }, [])

    return (
        <div className="flex bg-gray-300">
            <Sidebar />
            <Card className=" shadow flex-1 mb-4 mt-4 mr-4 ml-4 rounded-xl">
                <CardHeader className="flex">
                    <CardTitle>Categoria de produtos cadastradas</CardTitle>
                    <Button className="ml-auto">Olá</Button>
                </CardHeader>
                {listaCategoria.map((categoria) => (
                    <CardContent key={categoria.id}>
                        <CardDescription>{categoria.nome}</CardDescription>
                    </CardContent>
                ))}
            </Card>
        </div>
    )
}

export default CategoriaProduto