import { apiClient } from "../api/apiClient";

export const fetchPedido = async (page: number = 1, limit: number = 7) => {
    return apiClient<{ data: any[]; page: number; total: number; totalPages: number }>(
        `/pedido?page=${page}&limit=${limit}`
    )
};

export const createPedido = async (data: { clienteId: number, funcionarioId: number, items: { produtoId: number, quantidade: number, preco_unitario: number }[] }) => {
    return apiClient(`/pedido`, {
        method: "POST",
        body: JSON.stringify(data)
    })
};

export const deletePedido = async (id: number) => {
    return apiClient(`/pedido/${id}`, {method: "DELETE"})
};

