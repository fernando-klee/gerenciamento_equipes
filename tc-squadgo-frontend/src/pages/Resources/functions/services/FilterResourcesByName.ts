import { ResourceProps } from "../../interfaces"

export function filterResourcesByName(name: string, {setResourcesFiltered,
    resources,}: {
    setResourcesFiltered: any,
    resources: any[],
}) {
    if (name !== '' || !name.match(/\s\s+/g)) {
        setTimeout(() => {
            let newResourcesFiltered = resources.filter((r: ResourceProps) =>
                r.name.toLocaleLowerCase().includes(name.toLowerCase()))
            setResourcesFiltered(newResourcesFiltered)
        }, 1000)
    } else {
        setResourcesFiltered(resources)
    }
}