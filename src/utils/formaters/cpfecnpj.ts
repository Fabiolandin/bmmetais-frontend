export const formatarCpfCnpj = (cpfCnpj: string): string => {
    if(cpfCnpj.length === 11) {
        return cpfCnpj.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    } else if(cpfCnpj.length === 14) {
        return cpfCnpj.replace(/\D/g, '').replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
    } else {
        return cpfCnpj
    }
}