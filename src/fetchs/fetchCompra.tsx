export const fetchCompras = async () => {
    const res = await fetch('http://localhost:3000/compra', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao buscar compra")
    }
    return await res.json()
};

export const createCompra = async (data: { fornecedorId: number, funcionarioId: number, items: { produtoId: number, quantidade: number, preco_unitario: number }[] }) => {
    const res = await fetch('http://localhost:3000/compra', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao criar compra")
    }
    return await res.json()
};

export const deleteCompra = async (id: number) => {
    const res = await fetch(`http://localhost:3000/compra/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao deletar compra")
    }
    return await res.json()
};
