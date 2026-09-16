import { Resource } from "../Interface"
import { removeDiacritics } from "./RemoveDiacritics"

export const filterOptions = (inputText: string, {
    resources,
    setFilteredOptions
}: {
    resources: Resource[]
    setFilteredOptions: any
}) => {
    const filtered = resources.filter(resource =>
        removeDiacritics(resource.name.toLowerCase()).includes(
            removeDiacritics(inputText.toLowerCase())
        )
    )

    setFilteredOptions(filtered)
}