import { format, parseISO } from 'date-fns'
import { isCurrentDateWithinVacationPeriod } from '../services/isCurrentDataWithinVacationPeriod'
import { api } from '../../../../services/api'

export async function handleUpdateResource(
    values: any, 
    selectedResource: any, 
    toast: any, 
    leaderId: any, 
    resources: any, 
    setResourcesValues: any,
    setResourcesFiltered: any, 
    resetUpdateResourceModal: any, 
    clearUpdateErrors: any, 
    onCloseUpdate: any
): Promise<void> {
    const { name, departure_forecast, leader_id, vacation_date, backFromVacation } = values

    if (selectedResource) {
        const formattedDate = format(new Date(departure_forecast), 'yyyy-MM-dd')

        if (selectedResource && selectedResource.id) {
            if (departure_forecast != null) {
                try {
                    await api.put(`/resources/${selectedResource.id}/output-estimate`, {
                        resource_id: selectedResource.id,
                        new_output_estimate: departure_forecast,
                        new_departure_forecast: departure_forecast
                    })

                    toast({
                        title: `${selectedResource.id}: Data cadastrada!`,
                        status: 'success',
                        duration: 4000,
                        isClosable: true
                    })
                } catch (error) {
                    toast({
                        title: `${error}`,
                        status: 'error',
                        duration: 4000,
                        isClosable: true
                    })
                }
            }
        } else {
            console.error("selectedResource não está definido ou não tem uma propriedade 'id'")
        }

        let updatedValues = { ...values, leader_id }

        const dateCompare = isCurrentDateWithinVacationPeriod(vacation_date, backFromVacation)

        if (dateCompare) {
            updatedValues = { ...values, status: "FÉRIAS", leader_id}
        } else {
            updatedValues = { ...values, leader_id }
        }



        await api.put(`/resources/${selectedResource.id}`, updatedValues)
            .then(res => {
                const resourceUpdated = res.data
                const newResources = [...resources]
                const resourceIndex = newResources.findIndex(c => c.id === selectedResource.id)

                let admission_date = parseISO(resourceUpdated.admission_date)
                let vacation_date = parseISO(resourceUpdated.vacation_date)

                newResources[resourceIndex] = {
                    ...resourceUpdated,
                    photo_url: selectedResource.photo_url,
                    uuid1: selectedResource.uuid1,
                    uuid2: selectedResource.uuid2,
                    uuid3: selectedResource.uuid3,
                    admission_date,
                    vacation_date,
                    backFromVacation: resourceUpdated.backFromVacation,
                    output_estimate: formattedDate,
                    departure_forecast,
                    leader_id
                }

                setResourcesValues(newResources)
                setResourcesFiltered(newResources)

                resetUpdateResourceModal()
                clearUpdateErrors()
                onCloseUpdate()

                toast({
                    title: `${name} atualizado!`,
                    status: 'success',
                    duration: 4000,
                    isClosable: true
                })
            })
            .catch(err => {
                toast({
                    title: `${err}`,
                    status: 'error',
                    duration: 4000,
                    isClosable: true
                })
            })
    }
}