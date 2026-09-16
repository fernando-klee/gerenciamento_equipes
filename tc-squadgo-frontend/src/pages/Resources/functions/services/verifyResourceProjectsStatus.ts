import { ChangeEvent } from "react"
import { api } from "../../../../services/api"
import { ResourceProps } from "../../interfaces"

export async function verifyResourceProjectsStatus(e: ChangeEvent<HTMLInputElement>, {
    selectedResource,
    setResourceProjectStatusValues,
}: {
    selectedResource: ResourceProps,
    setResourceProjectStatusValues: any,
}) {
    const resourceStatus = e.target.value
    if (selectedResource && resourceStatus === 'INATIVO') {
        setResourceProjectStatusValues((oldData: any) => {
            return {
                ...oldData,
                isLoading: true
            }
        })

        const response = await api.get(`/resources/${selectedResource.id}/projects-status`)

        setResourceProjectStatusValues({
            ...response.data,
            isLoading: false
        })
    } else {
        setResourceProjectStatusValues(undefined)
    }
}