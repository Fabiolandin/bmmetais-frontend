export const fetchCategoria = async () => {
    const res = await fetch("http://localhost:3000/categoria", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao buscar categoria")
    }
    return await res.json()
};

export const createCategoria = async (nome: string) => {
    const res = await fetch("http://localhost:3000/categoria", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome }),
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao criar categoria")
    }
    return await res.json()
};

export const deleteCategoria = async (id: number) => {
    const res = await fetch(`http://localhost:3000/categoria/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("Erro ao deletar categoria")
    }
    return await res.json()
};