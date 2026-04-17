import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const CategoriaProduto = () => {
    return (
        <div>
            <div className="flex justify-center">
                <Card className="w-[600px]">
                    <CardHeader>
                        <CardTitle>Cadastro de Categoria de Produto</CardTitle>
                        <CardDescription>Preencha os campos abaixo para cadastrar uma categoria de produto</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form className="flex flex-col gap-4">
                            <label htmlFor="nome">Nome</label>
                            <Input type="text" id="nome" name="nome" />

                            <CardFooter>
                                <Button type="submit">Cadastrar</Button>
                                <Button type="reset">Cancelar</Button>
                            </CardFooter>
                        </form>

                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default CategoriaProduto