import Sidebar from "@/components/Sidebar"
import { Card, CardContent } from "@/components/ui/card"

const Main = () => {

    const getPedidos = async
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col h-screen w-screen">
                <div className="flex p-4 gap-10">

                    <Card className="flex-1 h-40 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="flex h-full flex-col justify-between p-6">
                            <div>
                                <p className="text-sm text-muted-foreground">Total de Pedidos</p>
                                <h2 className="text-4xl font-bold mt-2"> 1.000 </h2>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="flex-1 h-40 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="flex h-full flex-col justify-between p-6">
                            <div>
                                <p className="text-sm text-muted-foreground">Total de Compras</p>
                                <h2 className="text-4xl font-bold mt-2"> 1.000 </h2>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="flex-1 h-40 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="flex h-full flex-col justify-between p-6">
                            <div>
                                <p className="text-sm text-muted-foreground">Lucro Total</p>
                                <h2 className="text-4xl font-bold mt-2"> 1.000 </h2>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    )
}

export default Main