import { apiClient } from "@/api/apiClient"

export interface DashboardData {
    totalPedidos: number
    totalCompras: number
    totalProdutos: number
}

export const fetchDashboard = async (): Promise<DashboardData> => {
    return apiClient<DashboardData>(`/dashboard`)
}