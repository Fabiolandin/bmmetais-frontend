import { Button } from "./components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./components/ui/card"

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-red-500">Meu projeto</h1>
      <Button variant="destructive">Click me</Button>
      <Card>
        <CardContent>
          <CardHeader>
            Olá mundo
          </CardHeader>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button>Salvar</Button>
          <Button>Cancelar</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default App