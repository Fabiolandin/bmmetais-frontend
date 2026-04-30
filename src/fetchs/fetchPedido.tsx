export const fetchPedido = async (page: number = 1, limit: number = 7) => {
    const res = await fetch(`http://localhost:3000/pedido?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao buscar pedido")
    }
    return await res.json() as { data: any[]; page: number; total: number; totalPages: number }
};

export const createPedido = async (data: { clienteId: number, funcionarioId: number, items: { produtoId: number, quantidade: number, preco_unitario: number }[] }) => {
    const res = await fetch("http://localhost:3000/pedido", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao criar pedido")
    }
    return await res.json()
};

export const deletePedido = async (id: number) => {
    const res = await fetch(`http://localhost:3000/pedido/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (res.status !== 200 && res.status !== 201 && res.status !== 204) {
        throw new Error("Erro ao deletar pedido")
    }
    return res.status === 204 ? null : await res.json()
};

