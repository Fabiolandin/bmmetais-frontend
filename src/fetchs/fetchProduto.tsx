import { apiClient } from "../api/apiClient";

export const fetchProduto = async (page: number = 1, limit: number = 7) => {
    return apiClient<{ data: any[]; total: number; page: number; totalPages: number }>(
        `/produtos?page=${page}&limit=${limit}`
    )
};

export const createProduto = async (nome: string, descricao: string, preco: number, categoria_produtoId: number, estoque: number,) => {
    return apiClient(`/produtos`, {
        method: "POST",
        body: JSON.stringify({ nome, descricao, preco, categoria_produtoId, estoque}),
    })
};

export const deleteProduto = async (id: number) => {
    return apiClient(`/produtos/${id}`, { method: "DELETE" })
};

export const updateProduto = async (id: number, nome: string, descricao: string, preco: number, categoria_produtoId: number, estoque: number) => {
    return apiClient(`/produtos/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ nome, descricao, preco, categoria_produtoId, estoque}),
    })
};
