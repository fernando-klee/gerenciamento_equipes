import { LeaderProps } from "../../interfaces";

export function filterLeaderById(
    idLeader: number,
    leadersComplete: LeaderProps[],
    setSelectedLeader: React.Dispatch<React.SetStateAction<string>>
) {
    if (leadersComplete) {
        if (idLeader != null) {
            const filterLeader = leadersComplete.find(leader => leader.id === idLeader)
            if (filterLeader) {
                setSelectedLeader(filterLeader.name)
                return filterLeader.name
            }
        } else {
            setSelectedLeader("")
            return ""
        }
    }

    return null
}