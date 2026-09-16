import { handleSelectResource } from "../handles/handleSelectResource"

export function handleSetValueOnSelectResource(
    resource_id: number, 
    { read, write, onOpenUpdate }: {
        read: any, 
        write: any, 
        onOpenUpdate: () => void
    }
) {
    handleSelectResource(resource_id, {
        setResourceProjectStatus: write.setResourceProjectStatusValues,
        resetUpdateResourceModal: write.resetUpdateResourceModal,
        clearUpdateErrors: write.clearUpdateErrors,
        resources: read.resources,
        leadersComplete: read.leadersComplete,
        setSelectedLeader: write.setSelectedLeader,
        setSelectedResource: write.setSelectedResourceValue,
        setValueUpdate: write.setValueUpdate,
        onOpenUpdate: onOpenUpdate
    })
}