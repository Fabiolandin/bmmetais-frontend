import { apiClient } from "../api/apiClient";

export const fetchCliente = async (page: number = 1, limit: number = 7) => {
    return apiClient<{ data: any[]; total: number; page: number; totalPages: number }>(
        `/cliente?page=${page}&limit=${limit}`
    )
};

export const createCliente = async (nome: string, cpf: string, telefone: string, email: string) => {
    return apiClient(`/cliente/`, {
        method: "POST",
        body: JSON.stringify({ nome, cpf, telefone, email })
    })
};

export const deleteClientes = async (id: number) => {
    return apiClient(`/cliente/${id}`, {method: "DELETE"})
};

export const editarCliente = async (id: number, nome: string, cpf: string, telefone: string, email: string) => {
    return apiClient(`/cliente/${id}`, {
        method: "PATCH",
        body: JSON.stringify({nome, cpf, telefone, email})
    })
};