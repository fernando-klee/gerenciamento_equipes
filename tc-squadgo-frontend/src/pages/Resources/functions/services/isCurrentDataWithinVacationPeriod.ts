import { isDateWithinRange } from "../utils/IsDateWithinRange" 

export function isCurrentDateWithinVacationPeriod(vacationDate: string, backFromVacation: string): boolean {
    const currentDate = new Date()

    const startDate = new Date(vacationDate)
    const endDate = new Date(backFromVacation)

    return isDateWithinRange(startDate, endDate, currentDate)
}