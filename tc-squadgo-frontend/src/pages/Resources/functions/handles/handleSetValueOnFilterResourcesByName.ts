import { filterResourcesByName } from "../services/FilterResourcesByName"

export function handleSetValueOnFilterResourcesByName(name: string, {write, read}:{write: any, read: any}) {
        filterResourcesByName(name, {
            setResourcesFiltered: write.setResourcesFilteredValues,
            resources: read.resources
        })
    }