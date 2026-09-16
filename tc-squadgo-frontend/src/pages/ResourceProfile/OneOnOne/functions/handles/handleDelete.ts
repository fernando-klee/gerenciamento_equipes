import { api } from "../../../../../services/api"
import { OneOnOneProps } from "../../interfaces"

 export async function handleDelete(
    id: number,
    setLoadingDeleting: React.Dispatch<React.SetStateAction<boolean>>,
    setOneOnOnesFiltered: React.Dispatch<React.SetStateAction<OneOnOneProps[]>>,
    setOneOnOnes: React.Dispatch<React.SetStateAction<OneOnOneProps[]>>,
    toast: any
) {
        if (!window.confirm('Tem certeza que deseja excluir esta anotação?')) return

        setLoadingDeleting(true)
        try {
            await api.delete(`/one-on-one/${id}`)
            setOneOnOnesFiltered(prev => prev.filter(oneOnOne => oneOnOne.id !== id))
            setOneOnOnes(prev => prev.filter(oneOnOne => oneOnOne.id !== id))

            toast({
                title: 'Anotação excluída com sucesso',
                status: 'success',
                duration: 4000,
                isClosable: true
            })
        } catch (error: any) {
            console.error('Error deleting one-on-one:', error)
            toast({
                title: 'Erro ao excluir anotação',
                description: error.response?.data?.message || 'Ocorreu um erro ao excluir a anotação',
                status: 'error',
                duration: 4000,
                isClosable: true
            })
        } finally {
            setLoadingDeleting(false)
        }
    }
