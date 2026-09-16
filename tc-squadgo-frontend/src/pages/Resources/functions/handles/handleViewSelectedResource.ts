import { ResourceProps } from "../../interfaces"

export function handleViewSelectedResource(resource_id: number, {
    resources,
    setSelectedResource,
    onOpenView
}: {
    resources: ResourceProps[],
    setSelectedResource: any,
    onOpenView: () => void
}) {

    const currentResource = resources.find(r => r.id === resource_id)
    if (currentResource) setSelectedResource(currentResource)

    onOpenView()
}