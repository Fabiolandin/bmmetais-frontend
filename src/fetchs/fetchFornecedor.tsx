export const fetchFornecedor = async (page: number = 1, limit: number = 7) => {
    const res = await fetch(`http://localhost:3000/fornecedor?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao buscar fornecedor")
    }
    return await res.json() as { data: any[]; total: number; page: number; totalPages: number; }
};

export const createFornecedor = async (nome: string, cnpj: string, telefone: string, email: string) => {
    const res = await fetch("http://localhost:3000/fornecedor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, cnpj, telefone, email }),
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao criar fornecedor")
    }
    return await res.json()
};

export const deleteFornecedor = async (id: number) => {
    const res = await fetch(`http://localhost:3000/fornecedor/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao deletar fornecedor")
    }
    return await res.json()
};

export const editarFornecedor = async (id: number, nome: string, cnpj: string, telefone: string, email: string) => {
    const res = await fetch(`http://localhost:3000/fornecedor/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, cnpj, telefone, email }),
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao editar fornecedor")
    }
    return await res.json()
};