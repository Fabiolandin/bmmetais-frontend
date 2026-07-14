import Sidebar from "@/components/Sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { fetchDashboard } from "@/fetchs/fetchDashboard"
import { fetchPedidosGrafico } from "@/fetchs/fetchPedidosGrafico";
import { useEffect, useState } from "react"

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const Main = () => {

    //states para receber os dados para a dash
    const [tPedidos, settPedidos] = useState()
    const [tCompras, settCompras] = useState()
    const [tProdutos, settProdutos] = useState()

    //states para receber os dados dos graficos
    const [graficoDados, setgraficoDados] = useState()

    const getDados = async () => {
        const lista = await fetchDashboard()
        const grafico = await fetchPedidosGrafico()
        settPedidos(lista.totalPedidos)
        settCompras(lista.totalCompras)
        settProdutos(lista.totalProdutos)
        setgraficoDados(grafico)
    }

    useEffect(() => {
        getDados()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(graficoDados)

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col h-screen w-screen">
                <div className="flex p-4 gap-10">

                    <Card className="flex-1 h-40 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="flex h-full flex-col justify-between p-6">
                            <div>
                                <p className="text-sm text-muted-foreground">Total de Pedidos</p>
                                <h2 className="text-4xl font-bold mt-2"> {tPedidos} </h2>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="flex-1 h-40 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="flex h-full flex-col justify-between p-6">
                            <div>
                                <p className="text-sm text-muted-foreground">Total de Compras</p>
                                <h2 className="text-4xl font-bold mt-2"> {tCompras} </h2>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="flex-1 h-40 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="flex h-full flex-col justify-between p-6">
                            <div>
                                <p className="text-sm text-muted-foreground">Total de Produtos</p>
                                <h2 className="text-4xl font-bold mt-2"> {tProdutos} </h2>
                            </div>
                        </CardContent>
                    </Card>

                </div>

                <ResponsiveContainer
                    width="95%"
                    height={450}
                    className="p-2"
                >

                {/* gráfico de pedidos */}
                <LineChart data={graficoDados} className="mt-10">
                    <CartesianGrid strokeDasharray="3 3" />

                    {/* eixo Horizontal */}
                    <XAxis dataKey="mes" />

                    {/* eixo Vertical */}
                    <YAxis />

                    <Tooltip />

                    <Line
                        type="linear"
                        dataKey="total_pedidos"
                        stroke="red"
                    />
                    <Line
                        dataKey="total_faturamento"
                        stroke="#26a641"
                    />
                </LineChart>
                </ResponsiveContainer>

            </div>
        </div>
    )
}

export default Main