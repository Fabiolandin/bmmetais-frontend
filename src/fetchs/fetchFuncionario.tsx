import { apiClient } from "../api/apiClient";

export const fetchFuncionario = async (page: number = 1, limit: number = 7) => {
    return apiClient<{ data: any[]; total: number; page: number; totalPages: number }>(
        `/funcionario?page=${page}&limit=${limit}`
    )
};

export const createFuncionario = async (nome: string, cpf: string) => {
    return apiClient(`/funcionario/`, {
        method: "POST",
        body: JSON.stringify({ nome, cpf}),
    })
};

export const deleteFuncionario = async (id: number) => {
    return apiClient(`/funcionario/${id}`, {method: "DELETE" })
};

export const editarFuncionario = async (id: number, nome: string, cpf: string) => {
    return apiClient(`/funcionario/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ nome, cpf })
    })
};