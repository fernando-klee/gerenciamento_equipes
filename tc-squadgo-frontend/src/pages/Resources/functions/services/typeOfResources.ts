import { ResourceProps } from "../../interfaces"

export function typeOfResources(
    tableName: string, 
    selectOtherList: boolean,
    {resourcesFiltered} : {resourcesFiltered: ResourceProps[]} 
) {
    if (selectOtherList === false) {
        if (tableName === 'Alocados') {
            return resourcesFiltered.filter(r => {
                const isManager = r.resourceClassification?.classification.description !== 'Gestor'
                const isActive = r.resourceStatus.status.name === 'ATIVO'
                const isPartial = r.resourceStatus.substatus?.name === 'PARCIALMENTE'
                const isAlocated = r.resourceStatus.substatus?.name === 'ALOCADO'
                const hasProjects = r.has_projects

                return r && isActive && isManager && hasProjects && (isPartial || isAlocated)
            })
        }
        else if (tableName === 'Disponíveis') {
            return resourcesFiltered.filter(r => {
                const isManager = r.resourceClassification?.classification.description !== 'Gestor'
                const isActive = r.resourceStatus.status.name === 'ATIVO'
                const isPartial = r.resourceStatus.substatus?.name === 'PARCIALMENTE'
                const isAvailable = r.resourceStatus.substatus?.name === 'DISPONIVEL'
                const hasHours = r.hours_amount > 0
                const usagePercentage = (r.hours_amount - r.hours_left) / r.hours_amount * 100
                const isBelowUsageThreshold = usagePercentage < 100

                return r && isActive && isManager && hasHours && isBelowUsageThreshold && (isPartial || isAvailable)
            })
        }
        else if (tableName === 'Indisponíveis') {
            return resourcesFiltered.filter(r => {
                const isManager = r.resourceClassification?.classification.description !== 'Gestor'
                const isOnVacation = r.resourceStatus.status.name === 'FERIAS'
                const isOnTraining = r.resourceStatus.status.name === 'TREINAMENTO'
                const isZerado = r.hours_amount === 0
                const isNotActive = r.resourceStatus.status.name !== 'INATIVO'

                return isManager && isNotActive && (isZerado || isOnTraining || isOnVacation)
            })
        }
        else if (tableName === 'Outros') {
            return resourcesFiltered.filter(r => {
                const isActive = r.resourceStatus.status.name !== 'INATIVO'
                const isNotTester = r.resourceClassification?.classification.description !== 'Testador'
                return isActive && isNotTester
            })
        } else if (tableName === 'Sobrecarga') {
            return resourcesFiltered.filter(r => {
                const isManager = r.resourceClassification?.classification.description !== 'Gestor'
                const isHoursNegative = r.hours_left < 0
                return isManager && isHoursNegative
            })
        } else {
            const resourcesOfStatus = resourcesFiltered.filter(r => {
                const isInactive = r.resourceStatus.status.name === 'INATIVO'
                return isInactive
            })
            return resourcesOfStatus
        }
    } else {
        if (tableName === 'Gestão') {
            return resourcesFiltered.filter(r => {
                const isManager = r.resourceClassification?.classification.description === 'Gestor'
                const isActive = r.resourceStatus.status.name === 'ATIVO'

                return r && isActive && isManager
            })
        }
        else if (tableName === 'Desenvolvimento') {
            return resourcesFiltered.filter(r => {
                const isManager = r.resourceClassification?.classification.description === 'Programador'
                const isActive = r.resourceStatus.status.name === 'ATIVO'

                return r && isActive && isManager
            })
        }
        else if (tableName === 'Qualidade') {
            return resourcesFiltered.filter(r => {
                const isManager = r.resourceClassification?.classification.description === 'Testador'
                const isActive = r.resourceStatus.status.name === 'ATIVO'

                return r && isActive && isManager
            })
        }
        else if (tableName === 'Designer') {
            return resourcesFiltered.filter(r => {
                const isManager = r.resourceClassification?.classification.description === 'Designer'
                const isActive = r.resourceStatus.status.name === 'ATIVO'

                return r && isActive && isManager
            })
        } else if (tableName === 'Vídeo Maker') {
            return resourcesFiltered.filter(r => {
                const isManager = r.resourceClassification?.classification.description === 'VideoMaker'
                const isActive = r.resourceStatus.status.name === 'ATIVO'

                return r && isActive && isManager
            })
        } else if (tableName === 'Outros') {
            return resourcesFiltered.filter(r => {
                const isManager = r.resourceClassification?.classification.description === 'Outros'
                const isActive = r.resourceStatus.status.name === 'ATIVO'

                return r && isActive && isManager
            })
        } else {
            const resourcesOfStatus = resourcesFiltered.filter(r => {
                const isInactive = r.resourceStatus.status.name === 'INATIVO'
                return isInactive
            })
            return resourcesOfStatus
        }
    }
}