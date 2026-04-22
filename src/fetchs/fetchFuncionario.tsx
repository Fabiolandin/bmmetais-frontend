export const fetchFuncionario = async () => {
    const res = await fetch("http://localhost:3000/funcionario", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao buscar funcionario")
    }
    return await res.json()
};

export const createFuncionario = async (nome: string, cpf: string) => {
    const res = await fetch("http://localhost:3000/funcionario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, cpf }),
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao criar funcionario")
    }
    return await res.json()
};

export const deleteFuncionario = async (id: number) => {
    const res = await fetch(`http://localhost:3000/funcionario/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao deletar funcionario")
    }
    return await res.json()
};

export const editarFuncionario = async (id: number, nome: string, cpf: string) => {
    const res = await fetch(`http://localhost:3000/funcionario/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, cpf }),
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao editar funcionario")
    }
    return await res.json()
};