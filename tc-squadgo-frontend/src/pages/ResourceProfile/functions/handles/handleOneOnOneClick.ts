export function handleOneOnOneClick(
    e: React.MouseEvent,
    isLeader: boolean
) {
        if (!isLeader) {
            e.preventDefault()
        }
    }