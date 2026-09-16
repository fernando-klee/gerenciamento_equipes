import { filterLeaderById } from "../services/filterLeaderById" 

export function handleSelectResource(resource_id: number, {
    setResourceProjectStatus,
    resetUpdateResourceModal,
    clearUpdateErrors,
    resources,
    leadersComplete,
    setSelectedLeader,
    setSelectedResource,
    setValueUpdate,
    onOpenUpdate
}: {
    setResourceProjectStatus: any,
    resetUpdateResourceModal: any,
    clearUpdateErrors: any,
    resources: any[],
    leadersComplete: any[],
    setSelectedLeader: any,
    setSelectedResource: any,
    setValueUpdate: any,
    onOpenUpdate: () => void
}) {
    setResourceProjectStatus(undefined)
    resetUpdateResourceModal()
    clearUpdateErrors()

    const currentResource = resources.find(r => r.id === resource_id)

    if (currentResource) {
        filterLeaderById(currentResource.leader_id, leadersComplete, setSelectedLeader)
        setSelectedResource(currentResource)
        setValueUpdate('admission_date', currentResource.admission_date)
        setValueUpdate('vacation_date', currentResource.vacation_date)
        setValueUpdate('backFromVacation',
            currentResource.backFromVacation
                ? new Date(currentResource.backFromVacation) : null)
        setValueUpdate('departure_forecast',
            currentResource.departure_forecast
                ? new Date(currentResource.departure_forecast) : null)
        setValueUpdate('types_ids', currentResource.__types__.map((t: any) => t.id + ''))
        setValueUpdate('status', currentResource.resourceStatus.status.name)
        setValueUpdate('leader_id', currentResource.leader_id)
        const classification_id = currentResource.resourceClassification?.classification.id
        if (classification_id === 4) setValueUpdate('classification_id', '4')
    }

    onOpenUpdate()
}