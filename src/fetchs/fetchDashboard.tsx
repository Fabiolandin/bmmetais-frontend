export interface DashboardData {
    totalPedidos: number
    totalCompras: number
    totalProdutos: number
}

export const fetchDashboard = async (): Promise<DashboardData> => {
    const res = await fetch(`http://localhost:3000/dashboard`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao criar pedido")
    }
    return await res.json() as DashboardData
}