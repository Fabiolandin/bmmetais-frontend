import { apiClient } from "../api/apiClient";

export const fetchCategoria = async (page: number = 1, limit: number = 7) => {
    return apiClient<{ data: any[]; total: number; page: number; totalPages: number }>(
        `/categoria?=page${page}&limit=${limit}`
    )
};

export const createCategoria = async (nome: string) => {
    return apiClient(`/categoria/`, {
        method: "POST",
        body: JSON.stringify({nome})
    })
};

export const deleteCategoria = async (id: number) => {
    return apiClient(`/categoria/${id}`, {method: "DELETE"})
};

export const editarCategoria = async (id: number, nome: string) => {
    return apiClient(`/categoria/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ nome })
    })
};