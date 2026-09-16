import { ChangeEvent } from "react"
import { api } from "../../../../services/api"
import { ResourceProps } from "../../interfaces"


export async function handlePhotoUpdate(
    e: ChangeEvent<HTMLInputElement>,
    {selectedResource, resources, setResources, setSelectedResource
    }: {selectedResource: ResourceProps | undefined, resources: ResourceProps[], setResources: React.Dispatch<React.SetStateAction<ResourceProps[]>>, 
        setSelectedResource: React.Dispatch<React.SetStateAction<ResourceProps | undefined>>},
    toast: any
) {
    if (selectedResource && e.target.files) {
        const data = new FormData()
        const photo = e.target.files[0] as { size: number, type: string }
        const photoDataSize = photo.size > (1024 * 1024) * 5
        const photoDataType = photo.type !== 'image/png' && photo.type !== 'image/jpeg'

        if (photoDataSize) {
            toast({
                title: 'Foto não pode ser maior que 5mb!',
                status: 'error',
                duration: 4000,
                isClosable: true
            })
        }

        if (photoDataType) {
            toast({
                title: 'Imagem deve ser em formato PNG ou JPEG!',
                status: 'error',
                duration: 4000,
                isClosable: true
            })
        }

        if (!photoDataSize && !photoDataType) {
            data.append('photo', e.target.files[0])

            api.patch(`/resources/${selectedResource.id}`, data)
                .then(res => {
                    const newResourceUpdated = res.data as ResourceProps
                    const resourcePhoto = newResourceUpdated.photo_url

                    const oldResources = [...resources]
                    const resourceIndex = oldResources.findIndex(r => r.id === selectedResource.id)
                    const oldCurrentResource = oldResources[resourceIndex]
                    oldCurrentResource.photo_url = resourcePhoto
                    oldResources[resourceIndex] = oldCurrentResource
                    setResources(oldResources)

                    setSelectedResource((oldProps: any) => {
                        return { ...oldProps, photo_url: resourcePhoto }
                    })

                    toast({
                        title: 'Foto atualizada!',
                        status: 'success',
                        duration: 4000,
                        isClosable: true
                    })
                })
                .catch(err => {
                    const { response } = err
                    toast({
                        title: `${response.data.message}`,
                        status: 'error',
                        duration: 4000,
                        isClosable: true
                    })
                })
        }
    }
}