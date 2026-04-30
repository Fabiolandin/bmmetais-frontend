export const fetchProduto = async (page: number = 1, limit: number = 7) => {
    const res = await fetch(`http://localhost:3000/produtos?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao buscar produto")
    }
    return await res.json() as { data: any[]; total: number; page: number; totalPages: number }
};

export const createProduto = async (nome: string, descricao: string, preco: number, categoria_produtoId: number, estoque: number,) => {
    const res = await fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, descricao, preco, categoria_produtoId, estoque }),
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao criar produto")
    }
    return await res.json()
};

export const deleteProduto = async (id: number) => {
    console.log("Chamando deleteProduto para ID:", id)
    const res = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log("Status da resposta de exclusão:", res.status)

    if (res.status === 204) return null

    if (!res.ok) {
        const errorMsg = await res.text()
        console.error("Erro detalhado do servidor:", errorMsg)
        throw new Error("Erro ao deletar produto")
    }

    const text = await res.text()
    return text ? JSON.parse(text) : null
};

export const updateProduto = async (id: number, nome: string, descricao: string, preco: number, categoria_produtoId: number, estoque: number) => {
    const res = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, descricao, preco, categoria_produtoId, estoque }),
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao atualizar produto")
    }
    return await res.json()
};
