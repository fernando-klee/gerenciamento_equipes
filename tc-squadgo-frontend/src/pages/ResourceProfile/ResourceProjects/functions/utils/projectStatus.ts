export function projectStatus(status: string): string {
        if (status === 'EM_ANDAMENTO') return 'O projeto segue em andamento.'
        else if (status === 'A_INICIAR') return 'O projeto ainda não iniciou.'
        else return 'O projeto foi finalizado.'
    }