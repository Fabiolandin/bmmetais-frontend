//Le a variavel da .env
const API_URL = import.meta.env.VITE_API_URL;

export async function apiClient<T>(
    //Só a parte que muda
    endpoint: string,

    //Method's body e etc
    options: RequestInit = {}

): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        //Header padrão dos fetchs
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `Erro na requisição: ${res.status}`);
    }

    if (res.status === 204) return null as T;

    const text = await res.text();
    return text ? JSON.parse(text) : (null as T);
}