import { OneOnOneProps } from "../../interfaces"

export function handleFilterOneOnOne(
    text: string,
    oneOnOnes: OneOnOneProps[],
    setOneOnOnesFiltered: React.Dispatch<React.SetStateAction<OneOnOneProps[]>>
) {
        text = text.toLowerCase()
        if (text !== '' || !text.match(/\s\s+/g)) {
            setTimeout(() => {
                const filtered = oneOnOnes.filter((o) =>
                    o.description.toLowerCase().includes(text)
                )
                setOneOnOnesFiltered(filtered)
            }, 1000)
        } else {
            setOneOnOnesFiltered(oneOnOnes)
        }
    }