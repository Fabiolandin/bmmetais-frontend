export const formatarTelefone = (telefone: string): string => {
    if(telefone.length === 11) {
        return telefone.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    } else if(telefone.length === 10) {
        return telefone.replace(/\D/g, '').replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
    } else {
        return telefone
    }
}