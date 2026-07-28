import { apiClient } from "../api/apiClient";

export const fetchFornecedor = async (page: number = 1, limit: number = 7) => {
    return apiClient<{ data: any[]; total: number; page: number; totalPages: number; }>(
        `/fornecedor?page=${page}&limit=${limit}`
    )
};

export const createFornecedor = async (nome: string, cnpj: string, telefone: string, email: string) => {
    return apiClient(`/fornecedor/` , {
        method: "POST",
        body: JSON.stringify({ nome, cnpj, telefone, email })
    })
};

export const deleteFornecedor = async (id: number) => {
    return apiClient(`/fornecedor/${id}`, { method: "DELETE" })
};

export const editarFornecedor = async (id: number, nome: string, cnpj: string, telefone: string, email: string) => {
    return apiClient(`/fornecedor/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ nome, cnpj, telefone, email })
    })
};