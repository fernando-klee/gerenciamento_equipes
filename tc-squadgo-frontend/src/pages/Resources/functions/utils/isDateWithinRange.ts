export function isDateWithinRange(startDate: Date, endDate: Date, currentDate: Date): boolean {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const current = new Date(currentDate)

    start.setHours(0, 0, 0, 0)
    end.setHours(0, 0, 0, 0)
    current.setHours(0, 0, 0, 0)

    return start <= current && current <= end
}