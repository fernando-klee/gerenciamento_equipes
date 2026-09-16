import { ResourceProps } from "../../interfaces"
import {handleViewSelectedResource} from "./handleViewSelectedResource"

export function handleSetValueOnViewSelectedResource(resource_id: number, {resources,
            setSelectedResource,
            onOpenView}: {
                resources: ResourceProps[],
                setSelectedResource: React.Dispatch<React.SetStateAction<ResourceProps | undefined>>,
                onOpenView: () => void
            }) {
        handleViewSelectedResource(resource_id, {
            resources,
            setSelectedResource,
            onOpenView
        })
    }