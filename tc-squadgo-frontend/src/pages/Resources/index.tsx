import * as S from './styles'
import {
    Flex,
    FormLabel,
    Select as ChakraSelect,
    Checkbox,
    Modal,
    ModalOverlay
} from '@chakra-ui/react'
import { PiHouseFill } from 'react-icons/pi'
import { BiWindows } from 'react-icons/bi'
import { ClassificationProps } from './interfaces'
import { ViewModal } from './components/ViewModal'
import { UpdateModal } from './components/UpdateModal'
import ResourcesTable from './components/ResourcesTable'
import Header from '../../components/Header'
import InputDefault from '../../components/Forms/ChakraInput'

import { MdAddchart } from 'react-icons/md'
import { useResource } from './Models'

const Resources: React.FC = () => {
    const resourceHook = useResource()

    return (
        <>
            <Header buttons={[{
                createPermissions: ['create_skill'],
                newIcon: MdAddchart,
                onClick: () => resourceHook.utils.generateOrganogram(),
                title: 'Gerar Organograma'
            }]} />
            <S.Container>
                <S.FiltersContainer>
                    <>
                        <S.BoxFilterList
                            onClick={() => resourceHook.handles.handleSelectDefaultOrOther(resourceHook.states.setSelectOtherList)}
                            $selected={resourceHook.states.selectOtherList === true}
                        >
                            <PiHouseFill />
                            <p>Padrão</p>
                        </S.BoxFilterList>
                        <S.BoxFilterList
                            onClick={() => resourceHook.handles.handleSelectDefaultOrOther(resourceHook.states.setSelectOtherList)}
                            $selected={resourceHook.states.selectOtherList === false}
                        >
                            <BiWindows />
                            <p>Outros</p>
                        </S.BoxFilterList>
                    </>
                    <S.FiltersContainerLeft>
                        <S.FilterClassification>
                            <FormLabel width='max-content' marginBottom='0'>Filtrar por:</FormLabel>
                            <ChakraSelect
                                width={'max-content'}
                                onChange={(e: any) => resourceHook.handles.handleSetValueOnFilterResourcesByClassification(
                                    e.target.value,
                                    {
                                    write: resourceHook.context.write,
                                    read: resourceHook.context.read
                                    }
                                )}
                            >
                                <option value={''}>Nenhum...</option>
                                {resourceHook.context.read.classifications.map((e: ClassificationProps) => (
                                    <option key={e.id} value={e.id}>
                                        {e.description}
                                    </option>
                                ))}
                            </ChakraSelect>
                        </S.FilterClassification>
                        <InputDefault
                            minWidth='150px'
                            onChange={(e) => resourceHook.handles.handleSetValueOnFilterResourcesByName(
                                e.target.value,
                                {
                                    write: resourceHook.context.write,
                                    read: resourceHook.context.read
                                }
                            )}
                            size='md'
                            name='name'
                            placeholder='Insira o nome do colaborador'
                        />
                        <Checkbox
                            minWidth='150px'
                            width={'max-content'}
                            onChange={(e) => resourceHook.states.setShowNotActiveResources(e.target.checked)}>
                            Exibir colaboradores inativos
                        </Checkbox>
                    </S.FiltersContainerLeft>
                </S.FiltersContainer>
                <S.PanelsContent>
                    <S.TableLineContainer>
                        <Flex
                            flexGrow={1} flex={1} gap='70px 30px' height='fit-content'
                            flexDirection={['column']} flexWrap={['wrap']}
                        >
                            {resourceHook.states.selectOtherList === false ? (
                                <>
                                    <Flex flexGrow={1} flex={1} direction='column' gap='70px 30px' height='fit-content'>
                                        <ResourcesTable
                                            panelTitle='Disponíveis'
                                            loadingResources={resourceHook.context.read.loadingResources}
                                            resourceStatusDescription={resourceHook.utils.resourceStatusDescription}
                                            resources={resourceHook.services.typeOfResources('Disponíveis', resourceHook.states.selectOtherList, 
                                                {resourcesFiltered: resourceHook.context.read.resourcesFiltered})}
                                            selectResource={(resource_id) => resourceHook.handles.handleSetValueOnSelectResource(resource_id, {
                                                read: resourceHook.context.read, 
                                                write: resourceHook.context.write, onOpenUpdate: resourceHook.modals.onOpenUpdate})}
                                            viewSelectedResource={(resource_id) => resourceHook.handles.handleSetValueOnViewSelectedResource(resource_id,{
                                                resources: resourceHook.context.read.resources, setSelectedResource: resourceHook.context.write.setSelectedResourceValue, 
                                                onOpenView: resourceHook.modals.onOpenView})}
                                            handleSelectResourceAndListProjects={(resource_id) => resourceHook.handles.handleSelectResourceAndListProjects(
                                                resource_id,
                                                resourceHook.states.selectResourceId,
                                                resourceHook.states.setLoadingResourceProjectLists,
                                                resourceHook.states.setSelectResourceId,
                                                resourceHook.states.setSelectResourceProjectLists
                                            )}
                                            loadingResourceProjectLists={resourceHook.states.loadingResourceProjectLists}
                                            selectResourceProjectLists={resourceHook.states.selectResourceProjectLists}
                                        />
                                        <ResourcesTable
                                            panelTitle='Alocados'
                                            loadingResources={resourceHook.context.read.loadingResources}
                                            resourceStatusDescription={resourceHook.utils.resourceStatusDescription}
                                            resources={resourceHook.services.typeOfResources('Alocados', resourceHook.states.selectOtherList,
                                                {resourcesFiltered: resourceHook.context.read.resourcesFiltered}
                                            )}
                                            selectResource={(resource_id) => resourceHook.handles.handleSetValueOnSelectResource(resource_id, {
                                                read: resourceHook.context.read, 
                                                write: resourceHook.context.write, onOpenUpdate: resourceHook.modals.onOpenUpdate})}
                                            viewSelectedResource={(resource_id) => resourceHook.handles.handleSetValueOnViewSelectedResource(resource_id,{
                                                resources: resourceHook.context.read.resources, setSelectedResource: resourceHook.context.write.setSelectedResourceValue, 
                                                onOpenView: resourceHook.modals.onOpenView})}
                                            handleSelectResourceAndListProjects={(resource_id) => resourceHook.handles.handleSelectResourceAndListProjects(
                                                resource_id,
                                                resourceHook.states.selectResourceId,
                                                resourceHook.states.setLoadingResourceProjectLists,
                                                resourceHook.states.setSelectResourceId,
                                                resourceHook.states.setSelectResourceProjectLists
                                            )}
                                            loadingResourceProjectLists={resourceHook.states.loadingResourceProjectLists}
                                            selectResourceProjectLists={resourceHook.states.selectResourceProjectLists}
                                        />
                                    </Flex>
                                    <Flex flexGrow={1} flex={1} direction='column' gap='70px 30px' height='fit-content'>
                                        <ResourcesTable
                                            panelTitle='Indisponíveis'
                                            loadingResources={resourceHook.context.read.loadingResources}
                                            resourceStatusDescription={resourceHook.utils.resourceStatusDescription}
                                            resources={resourceHook.services.typeOfResources('Indisponíveis', resourceHook.states.selectOtherList,
                                                {resourcesFiltered: resourceHook.context.read.resourcesFiltered}
                                            ).filter(
                                                resource => resource.resourceClassification &&
                                                    resource.resourceClassification.classification.id !== 6
                                            )}
                                            selectResource={(resource_id) => resourceHook.handles.handleSetValueOnSelectResource(resource_id, {
                                                read: resourceHook.context.read, 
                                                write: resourceHook.context.write, onOpenUpdate: resourceHook.modals.onOpenUpdate})}
                                            viewSelectedResource={(resource_id) => resourceHook.handles.handleSetValueOnViewSelectedResource(resource_id,{
                                                resources: resourceHook.context.read.resources, setSelectedResource: resourceHook.context.write.setSelectedResourceValue, 
                                                onOpenView: resourceHook.modals.onOpenView})}
                                            handleSelectResourceAndListProjects={(resource_id) => resourceHook.handles.handleSelectResourceAndListProjects(
                                                resource_id,
                                                resourceHook.states.selectResourceId,
                                                resourceHook.states.setLoadingResourceProjectLists,
                                                resourceHook.states.setSelectResourceId,
                                                resourceHook.states.setSelectResourceProjectLists
                                            )}
                                            loadingResourceProjectLists={resourceHook.states.loadingResourceProjectLists}
                                            selectResourceProjectLists={resourceHook.states.selectResourceProjectLists}
                                        />
                                        <ResourcesTable
                                            panelTitle='Sobrecarga'
                                            loadingResources={resourceHook.context.read.loadingResources}
                                            resourceStatusDescription={resourceHook.utils.resourceStatusDescription}
                                            resources={resourceHook.services.typeOfResources('Sobrecarga', resourceHook.states.selectOtherList,
                                                {resourcesFiltered: resourceHook.context.read.resourcesFiltered}
                                            )}
                                            selectResource={(resource_id) => resourceHook.handles.handleSetValueOnSelectResource(resource_id, {
                                                read: resourceHook.context.read, 
                                                write: resourceHook.context.write, onOpenUpdate: resourceHook.modals.onOpenUpdate})}
                                            viewSelectedResource={(resource_id) => resourceHook.handles.handleSetValueOnViewSelectedResource(resource_id,{
                                                resources: resourceHook.context.read.resources, setSelectedResource: resourceHook.context.write.setSelectedResourceValue, 
                                                onOpenView: resourceHook.modals.onOpenView})}
                                            handleSelectResourceAndListProjects={(resource_id) => resourceHook.handles.handleSelectResourceAndListProjects(
                                                resource_id,
                                                resourceHook.states.selectResourceId,
                                                resourceHook.states.setLoadingResourceProjectLists,
                                                resourceHook.states.setSelectResourceId,
                                                resourceHook.states.setSelectResourceProjectLists
                                            )}
                                            loadingResourceProjectLists={resourceHook.states.loadingResourceProjectLists}
                                            selectResourceProjectLists={resourceHook.states.selectResourceProjectLists}
                                        />
                                        {resourceHook.states.showNotActiveResources && (
                                            <ResourcesTable
                                                panelTitle='Inativos'
                                                loadingResources={resourceHook.context.read.loadingResources}
                                                resourceStatusDescription={resourceHook.utils.resourceStatusDescription}
                                                resources={resourceHook.services.typeOfResources('Inativos', resourceHook.states.selectOtherList,
                                                    {resourcesFiltered: resourceHook.context.read.resourcesFiltered}
                                                )}
                                                selectResource={(resource_id) => resourceHook.handles.handleSetValueOnSelectResource(resource_id, {
                                                    read: resourceHook.context.read, 
                                                    write: resourceHook.context.write, onOpenUpdate: resourceHook.modals.onOpenUpdate})}
                                                viewSelectedResource={(resource_id) => resourceHook.handles.handleSetValueOnViewSelectedResource(resource_id,{
                                                resources: resourceHook.context.read.resources, setSelectedResource: resourceHook.context.write.setSelectedResourceValue, 
                                                onOpenView: resourceHook.modals.onOpenView})}
                                                handleSelectResourceAndListProjects={(resource_id) => resourceHook.handles.handleSelectResourceAndListProjects(
                                                resource_id,
                                                resourceHook.states.selectResourceId,
                                                resourceHook.states.setLoadingResourceProjectLists,
                                                resourceHook.states.setSelectResourceId,
                                                resourceHook.states.setSelectResourceProjectLists
                                            )}
                                                loadingResourceProjectLists={resourceHook.states.loadingResourceProjectLists}
                                                selectResourceProjectLists={resourceHook.states.selectResourceProjectLists}
                                            />
                                        )}
                                    </Flex>
                                </>
                            ) :
                                <>
                                    <Flex flexGrow={1} flex={1} direction='column' gap='70px 30px' height='fit-content'>
                                        <ResourcesTable
                                            panelTitle='Qualidade'
                                            loadingResources={resourceHook.context.read.loadingResources}
                                            resourceStatusDescription={resourceHook.utils.resourceStatusDescription}
                                            resources={resourceHook.services.typeOfResources('Qualidade', resourceHook.states.selectOtherList,
                                                {resourcesFiltered: resourceHook.context.read.resourcesFiltered}
                                            )}
                                            selectResource={(resource_id) => resourceHook.handles.handleSetValueOnSelectResource(resource_id, {
                                                read: resourceHook.context.read, 
                                                write: resourceHook.context.write, onOpenUpdate: resourceHook.modals.onOpenUpdate})}
                                            viewSelectedResource={(resource_id) => resourceHook.handles.handleSetValueOnViewSelectedResource(resource_id,{
                                                resources: resourceHook.context.read.resources, setSelectedResource: resourceHook.context.write.setSelectedResourceValue, 
                                                onOpenView: resourceHook.modals.onOpenView})}
                                            handleSelectResourceAndListProjects={(resource_id) => resourceHook.handles.handleSelectResourceAndListProjects(
                                                resource_id,
                                                resourceHook.states.selectResourceId,
                                                resourceHook.states.setLoadingResourceProjectLists,
                                                resourceHook.states.setSelectResourceId,
                                                resourceHook.states.setSelectResourceProjectLists
                                            )}
                                            loadingResourceProjectLists={resourceHook.states.loadingResourceProjectLists}
                                            selectResourceProjectLists={resourceHook.states.selectResourceProjectLists}
                                        />
                                    </Flex>
                                    <Flex flexGrow={1} flex={1} direction='column' gap='70px 30px' height='fit-content'>
                                        <ResourcesTable
                                            panelTitle='Desenvolvimento'
                                            loadingResources={resourceHook.context.read.loadingResources}
                                            resourceStatusDescription={resourceHook.utils.resourceStatusDescription}
                                            resources={resourceHook.services.typeOfResources('Desenvolvimento', resourceHook.states.selectOtherList,
                                                {resourcesFiltered: resourceHook.context.read.resourcesFiltered}
                                            )}
                                            selectResource={(resource_id) => resourceHook.handles.handleSetValueOnSelectResource(resource_id, {
                                                read: resourceHook.context.read, 
                                                write: resourceHook.context.write, onOpenUpdate: resourceHook.modals.onOpenUpdate})}
                                            viewSelectedResource={(resource_id) => resourceHook.handles.handleSetValueOnViewSelectedResource(resource_id,{
                                                resources: resourceHook.context.read.resources, setSelectedResource: resourceHook.context.write.setSelectedResourceValue, 
                                                onOpenView: resourceHook.modals.onOpenView})}
                                            handleSelectResourceAndListProjects={(resource_id) => resourceHook.handles.handleSelectResourceAndListProjects(
                                                resource_id,
                                                resourceHook.states.selectResourceId,
                                                resourceHook.states.setLoadingResourceProjectLists,
                                                resourceHook.states.setSelectResourceId,
                                                resourceHook.states.setSelectResourceProjectLists
                                            )}
                                            loadingResourceProjectLists={resourceHook.states.loadingResourceProjectLists}
                                            selectResourceProjectLists={resourceHook.states.selectResourceProjectLists}
                                        />
                                        <ResourcesTable
                                            panelTitle='Designer'
                                            loadingResources={resourceHook.context.read.loadingResources}
                                            resourceStatusDescription={resourceHook.utils.resourceStatusDescription}
                                            resources={resourceHook.services.typeOfResources('Designer', resourceHook.states.selectOtherList, 
                                                {resourcesFiltered: resourceHook.context.read.resourcesFiltered}
                                            )}
                                            selectResource={(resource_id) => resourceHook.handles.handleSetValueOnSelectResource(resource_id, {
                                                read: resourceHook.context.read, 
                                                write: resourceHook.context.write, onOpenUpdate: resourceHook.modals.onOpenUpdate})}
                                            viewSelectedResource={(resource_id) => resourceHook.handles.handleSetValueOnViewSelectedResource(resource_id,{
                                                resources: resourceHook.context.read.resources, setSelectedResource: resourceHook.context.write.setSelectedResourceValue, 
                                                onOpenView: resourceHook.modals.onOpenView})}
                                            handleSelectResourceAndListProjects={(resource_id) => resourceHook.handles.handleSelectResourceAndListProjects(
                                                resource_id,
                                                resourceHook.states.selectResourceId,
                                                resourceHook.states.setLoadingResourceProjectLists,
                                                resourceHook.states.setSelectResourceId,
                                                resourceHook.states.setSelectResourceProjectLists
                                            )}
                                            loadingResourceProjectLists={resourceHook.states.loadingResourceProjectLists}
                                            selectResourceProjectLists={resourceHook.states.selectResourceProjectLists}
                                        />
                                        <ResourcesTable
                                            panelTitle='Vídeo Maker'
                                            loadingResources={resourceHook.context.read.loadingResources}
                                            resourceStatusDescription={resourceHook.utils.resourceStatusDescription}
                                            resources={resourceHook.services.typeOfResources('Vídeo Maker', resourceHook.states.selectOtherList,
                                                {resourcesFiltered: resourceHook.context.read.resourcesFiltered}
                                            )}
                                            selectResource={(resource_id) => resourceHook.handles.handleSetValueOnSelectResource(resource_id, {
                                                read: resourceHook.context.read, 
                                                write: resourceHook.context.write, onOpenUpdate: resourceHook.modals.onOpenUpdate})}
                                            viewSelectedResource={(resource_id) => resourceHook.handles.handleSetValueOnViewSelectedResource(resource_id,{
                                                resources: resourceHook.context.read.resources, setSelectedResource: resourceHook.context.write.setSelectedResourceValue, 
                                                onOpenView: resourceHook.modals.onOpenView})}
                                            handleSelectResourceAndListProjects={(resource_id) => resourceHook.handles.handleSelectResourceAndListProjects(
                                                resource_id,
                                                resourceHook.states.selectResourceId,
                                                resourceHook.states.setLoadingResourceProjectLists,
                                                resourceHook.states.setSelectResourceId,
                                                resourceHook.states.setSelectResourceProjectLists
                                            )}
                                            loadingResourceProjectLists={resourceHook.states.loadingResourceProjectLists}
                                            selectResourceProjectLists={resourceHook.states.selectResourceProjectLists}
                                        />
                                        <ResourcesTable
                                            panelTitle='Gestão'
                                            loadingResources={resourceHook.context.read.loadingResources}
                                            resourceStatusDescription={resourceHook.utils.resourceStatusDescription}
                                            resources={resourceHook.services.typeOfResources('Gestão', resourceHook.states.selectOtherList,
                                                {resourcesFiltered: resourceHook.context.read.resourcesFiltered}
                                            )}
                                            selectResource={(resource_id) => resourceHook.handles.handleSetValueOnSelectResource(resource_id, {
                                                read: resourceHook.context.read, 
                                                write: resourceHook.context.write, onOpenUpdate: resourceHook.modals.onOpenUpdate})}
                                            viewSelectedResource={(resource_id) => resourceHook.handles.handleSetValueOnViewSelectedResource(resource_id,{
                                                resources: resourceHook.context.read.resources, setSelectedResource: resourceHook.context.write.setSelectedResourceValue, 
                                                onOpenView: resourceHook.modals.onOpenView})}
                                            handleSelectResourceAndListProjects={(resource_id) => resourceHook.handles.handleSelectResourceAndListProjects(
                                                resource_id,
                                                resourceHook.states.selectResourceId,
                                                resourceHook.states.setLoadingResourceProjectLists,
                                                resourceHook.states.setSelectResourceId,
                                                resourceHook.states.setSelectResourceProjectLists
                                            )}
                                            loadingResourceProjectLists={resourceHook.states.loadingResourceProjectLists}
                                            selectResourceProjectLists={resourceHook.states.selectResourceProjectLists}
                                        />
                                        <ResourcesTable
                                            panelTitle='Outros'
                                            loadingResources={resourceHook.context.read.loadingResources}
                                            resourceStatusDescription={resourceHook.utils.resourceStatusDescription}
                                            resources={resourceHook.services.typeOfResources('Outros', resourceHook.states.selectOtherList,
                                                {resourcesFiltered: resourceHook.context.read.resourcesFiltered}
                                            )}
                                            selectResource={(resource_id) => resourceHook.handles.handleSetValueOnSelectResource(resource_id, {
                                                read: resourceHook.context.read, 
                                                write: resourceHook.context.write, onOpenUpdate: resourceHook.modals.onOpenUpdate})}
                                            viewSelectedResource={(resource_id) => resourceHook.handles.handleSetValueOnViewSelectedResource(resource_id,{
                                                resources: resourceHook.context.read.resources, setSelectedResource: resourceHook.context.write.setSelectedResourceValue, 
                                                onOpenView: resourceHook.modals.onOpenView})}
                                            handleSelectResourceAndListProjects={(resource_id) => resourceHook.handles.handleSelectResourceAndListProjects(
                                                resource_id,
                                                resourceHook.states.selectResourceId,
                                                resourceHook.states.setLoadingResourceProjectLists,
                                                resourceHook.states.setSelectResourceId,
                                                resourceHook.states.setSelectResourceProjectLists
                                            )}
                                            loadingResourceProjectLists={resourceHook.states.loadingResourceProjectLists}
                                            selectResourceProjectLists={resourceHook.states.selectResourceProjectLists}
                                        />
                                        {resourceHook.states.showNotActiveResources && (
                                            <ResourcesTable
                                                panelTitle='Inativos'
                                                loadingResources={resourceHook.context.read.loadingResources}
                                                resourceStatusDescription={resourceHook.utils.resourceStatusDescription}
                                                resources={resourceHook.services.typeOfResources('Inativos', resourceHook.states.selectOtherList,
                                                    {resourcesFiltered: resourceHook.context.read.resourcesFiltered}
                                                )}
                                                selectResource={(resource_id) => resourceHook.handles.handleSetValueOnSelectResource(resource_id, {
                                                    read: resourceHook.context.read, 
                                                    write: resourceHook.context.write, onOpenUpdate: resourceHook.modals.onOpenUpdate})}
                                                viewSelectedResource={(resource_id) => resourceHook.handles.handleSetValueOnViewSelectedResource(resource_id,{
                                                resources: resourceHook.context.read.resources, setSelectedResource: resourceHook.context.write.setSelectedResourceValue, 
                                                onOpenView: resourceHook.modals.onOpenView})}
                                                handleSelectResourceAndListProjects={(resource_id) => resourceHook.handles.handleSelectResourceAndListProjects(
                                                    resource_id,
                                                    resourceHook.states.selectResourceId,
                                                    resourceHook.states.setLoadingResourceProjectLists,
                                                    resourceHook.states.setSelectResourceId,
                                                    resourceHook.states.setSelectResourceProjectLists
                                            )}
                                                loadingResourceProjectLists={resourceHook.states.loadingResourceProjectLists}
                                                selectResourceProjectLists={resourceHook.states.selectResourceProjectLists}
                                            />
                                        )}
                                    </Flex>
                                </>}
                        </Flex>
                    </S.TableLineContainer>
                </S.PanelsContent>
                <Modal isOpen={resourceHook.modals.isOpenUpdate} onClose={resourceHook.modals.onCloseUpdate}>
                    <ModalOverlay />
                    {resourceHook.context.read.selectedResource && (
                        <UpdateModal onCloseUpdate={resourceHook.modals.onCloseUpdate} />
                    )}
                </Modal>
                <Modal isOpen={resourceHook.modals.isOpenView} onClose={resourceHook.modals.onCloseView}>
                    <ModalOverlay />
                    {resourceHook.context.read.selectedResource && (
                        <ViewModal
                            selectedResource={resourceHook.context.read.selectedResource}
                            onCloseView={resourceHook.modals.onCloseView}
                        />
                    )}
                </Modal >
            </S.Container >
        </>
    )
}

export default Resources