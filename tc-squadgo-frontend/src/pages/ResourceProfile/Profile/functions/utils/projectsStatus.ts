export function projectStatus (status: string) {
        switch (status) {
            case 'A_INICIAR':
                return 'A Iniciar'
            case 'EM_ANDAMENTO':
                return 'Em Andamento'
            case 'CONCLUIDO':
                return 'Concluído'
        }
    }
