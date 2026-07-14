export const fetchPedidosGrafico = async () => {
    const res = await fetch(`http://localhost:3000/pedidosgrafico`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao buscar pedido")
    }
    return await res.json() as { mes: string; total_pedidos: number; total_faturamento: number;}
};