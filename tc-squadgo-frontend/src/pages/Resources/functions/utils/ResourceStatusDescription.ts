export function resourceStatusDescription(
    status: string,
    hours_amount: number,
    classification?: string
): { description: string, color: string } {
    switch (status) {
        case 'ATIVO':
            return { description: 'Ativo', color: 'green' }
        case 'DISPONIVEL':
            return hours_amount > 0 || classification === 'Gestor'
                ? { description: 'Disponível', color: 'green' }
                : { description: 'Indisponível', color: 'orange' }
        case 'PARCIALMENTE':
            return { description: 'Parcialmente', color: 'blue' }
        case 'ALOCADO':
            return { description: 'Alocado', color: 'red' }
        case 'FERIAS':
            return { description: 'Férias', color: 'yellow' }
        case 'TREINAMENTO':
            return { description: 'Treinamento', color: 'yellow' }
        case 'INATIVO':
            return { description: 'Inativo', color: 'red' }
        default:
            return { description: 'Outros', color: 'gray' }
    }
}