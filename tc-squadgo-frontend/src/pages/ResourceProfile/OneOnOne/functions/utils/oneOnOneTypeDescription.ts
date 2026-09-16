import { OneOnOneProps } from "../../interfaces"

export function oneOnOneTypeDescription(oneOnOne: OneOnOneProps): string {
        if (oneOnOne.type === 'LEADER') return 'Anotações do Líder'
        else return 'Anotações do Liderado'
    }