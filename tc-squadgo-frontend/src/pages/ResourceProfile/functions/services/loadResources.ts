import { api } from "../../../../services/api"


export async function loadResource(
    resource_id: string,
    setResource: React.Dispatch<React.SetStateAction<any>>,
    user: { id: string | number },
    setIsLeader: React.Dispatch<React.SetStateAction<boolean>>,
    setResourceExists: React.Dispatch<React.SetStateAction<boolean>>,
    setLoadingResource: React.Dispatch<React.SetStateAction<boolean>>,
    toast: any,
    history: any
) {
            try {
                const response = await api.get(`/resources/${resource_id}`)
                setResource(response.data)
         
                const userResponse = await api.get(`/resources/${user.id}`)
                const isUserLeader = userResponse.data.leader && userResponse.data.id === response.data.leader_id
                setIsLeader(isUserLeader)


                if (!isUserLeader && window.location.pathname.includes('/one-on-one')) {
                    history.push(`/recursos/${resource_id}`)
                    toast({
                        title: 'Acesso não permitido',
                        description: 'Você só pode ver os one-on-one dos seus liderados',
                        status: 'error',
                        duration: 4000,
                        isClosable: true
                    })
                }
            } catch (err: any) {
                if (err.response.status === 404) {
                    setResourceExists(false)
                } else {
                    toast({
                        title: 'Erro ao carregar dados do colaborador',
                        status: 'error',
                        duration: 4000,
                        isClosable: true
                    })
                }
            }

            setLoadingResource(false)
        }