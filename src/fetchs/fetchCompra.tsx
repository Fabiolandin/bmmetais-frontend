import { apiClient } from "../api/apiClient";

export const fetchCompras = async (page: number = 1, limit: number = 7) => {
    return apiClient<{ data: any[]; total: number; page: number; totalPages: number }>(
        `/compra?page=${page}&limit=${limit}`
    )
};

export const createCompra = async (data: { fornecedorId: number, funcionarioId: number, items: { produtoId: number, quantidade: number, preco_unitario: number }[] }) => {
    return apiClient(`/compra/`, {
        method: "POST",
        body: JSON.stringify(data)
    })
};

export const deleteCompra = async (id: number) => {
    return apiClient(`/compra/${id}`, {method: "DELETE" })
};
