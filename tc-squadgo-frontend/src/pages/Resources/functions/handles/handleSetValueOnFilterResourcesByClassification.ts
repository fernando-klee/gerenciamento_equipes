import { filterResourcesByClassification } from "../services/FilterResourcesByClassification"


export function handleSetValueOnFilterResourcesByClassification(classification: string, {write, read}: {write: any, read: any}) {
        const classificationResource = Number(classification)

        filterResourcesByClassification(classificationResource, {
            setResourcesFiltered: write.setResourcesFilteredValues,
            resources: read.resources
        })
    }