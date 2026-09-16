import { ResourceProps } from "../../interfaces"

export function filterResourcesByClassification(classificationResource: number, {
    setResourcesFiltered,
    resources,
}: {
    setResourcesFiltered: any,
    resources: any[],
}) {
    if (classificationResource !== 0) {
        setTimeout(() => {
            let newResourcesFiltered = resources.filter((r: ResourceProps) =>
                r.resourceClassification?.classification.id === classificationResource)
            setResourcesFiltered(newResourcesFiltered)
        }, 300)
    } else {
        setResourcesFiltered(resources)
    }
}
