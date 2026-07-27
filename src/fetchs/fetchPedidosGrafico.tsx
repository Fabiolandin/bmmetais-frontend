import { apiClient } from "../api/apiClient";

export const fetchPedidosGrafico = async () => {
    return apiClient< { mes: string; total_pedidos: number; total_faturamento: number;} >(
        `/pedidosgrafico`
    )
};

