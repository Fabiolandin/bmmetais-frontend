export const fetchCliente = async (page: number = 1, limit: number = 7) => {
    const res = await fetch(`http://localhost:3000/cliente?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao buscar cliente")
    }
    return await res.json() as { data: any[]; total: number; page: number; totalPages: number }
};

export const createCliente = async (nome: string, cpf: string, telefone: string, email: string) => {
    const res = await fetch("http://localhost:3000/cliente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, cpf, telefone, email }),
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao criar cliente")
    }
    return await res.json()
};

export const deleteClientes = async (id: number) => {
    const res = await fetch(`http://localhost:3000/cliente/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao deletar cliente")
    }
    return await res.json()
};

export const editarCliente = async (id: number, nome: string, cpf: string, telefone: string, email: string) => {
    const res = await fetch(`http://localhost:3000/cliente/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, cpf, telefone, email }),
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao editar cliente")
    }
    return await res.json()
};