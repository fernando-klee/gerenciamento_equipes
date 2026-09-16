import { memo } from 'react'
import { Avatar, Box, Flex, Skeleton, Stack, Table, Tag, Tbody, Td, Text, Th, Thead, Tooltip, Tr } from "@chakra-ui/react"

import { format, isValid } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { FaRegEye, FaRegTrashAlt } from 'react-icons/fa'
import { FiDelete, FiEdit } from 'react-icons/fi'
import { AiOutlineHistory } from 'react-icons/ai'

import { HasPermission } from "../../../components/HasPermission"
import Panel from "../../../components/Panel"
import { ProjectProps } from '../interfaces'
import TableActionButton from '../../../components/Buttons/TableActionButton'

interface ProjectsTableProps {
    projects: ProjectProps[]
    panelTitle: string
    projectStatus: string
    loadingProjects: boolean
    selectProject(id: number): void
    viewSelectedProject(id: number): void
    showHistoric(id: number, name: string): void
}

const ProjectsTable = memo(({
    projects,
    projectStatus,
    panelTitle,
    loadingProjects,
    selectProject,
    viewSelectedProject,
    showHistoric }: ProjectsTableProps) => {

    return (
        <Panel title={panelTitle} counter={projects.length.toString()} flex={1} position='relative' flexDir={'column'}>
            {loadingProjects ? (
                <Stack>
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                </Stack>
            ) : (
                <Flex maxWidth={'-webkit-fill-available'} overflowX='auto'>
                    {
                        projects.length > 0 ? (
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>NOME PROJETO</Th>
                                        <Th>NOME CLIENTE</Th>
                                        {projectStatus === 'A_INICIAR' && (
                                            <Th>MÊS</Th>
                                        )}
                                        <Th>QTD COLABORADORES</Th>
                                        <Th>TIPO</Th>
                                        <Th>horas</Th>
                                        <Th>Líder</Th>
                                        <Th></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {projects.map(p => (
                                        <Tr key={p.uuid}>
                                            <Td>
                                                <Flex alignItems={'center'} gap='20px' maxWidth={'fit-content'}>
                                                    <Tooltip hasArrow label={p.customer.name} bg='red.600'>
                                                        <Avatar
                                                            objectFit={'cover'}
                                                            borderRadius='full'
                                                            boxSize='50px'
                                                            name={p.customer.name}
                                                            src={p.customer.image_url}
                                                        />
                                                    </Tooltip>
                                                    <Text fontWeight={700}>
                                                        {p.name}
                                                    </Text>
                                                </Flex>
                                            </Td>
                                            <Td maxWidth={'fit-content'}>
                                                <Text /*fontWeight={700}*/ minWidth='170px'>
                                                        {p.customer.name}
                                                </Text>
                                            </Td>
                                                {projectStatus === 'A_INICIAR' && p.start_estimate && isValid(new Date(p.start_estimate)) ? (
                                                    <Td>
                                                        <Text textTransform={'capitalize'}>{format(new Date(p.start_estimate), 'MMMMMMM', { locale: ptBR })}</Text>
                                                    </Td>
                                                ) : (
                                                    projectStatus === 'A_INICIAR' && (
                                                        <Td>
                                                            <Text textTransform={'capitalize'}>Sem Data</Text>
                                                        </Td>
                                                    )
                                                )}
                                            <Td>
                                                {p.resources_length}
                                            </Td>
                                            <Td>
                                                <Tag variant='solid' fontWeight={700} colorScheme={p.type === 'PF' ? 'blue' : 'green'}>
                                                    <Tooltip
                                                        hasArrow
                                                        label={
                                                            p.type === 'PF' ? 'Projeto Fechado' : 'Projeto Recorrente'} bg='red.600'>
                                                        {p.type}
                                                    </Tooltip>
                                                </Tag>
                                            </Td>
                                            <Td>
                                                <Text fontWeight={700}>
                                                    {p.hours}H
                                                </Text>
                                            </Td>
                                            <Td>
                                                <Flex alignItems={'center'} gap='5px' maxWidth={'fit-content'}>
                                                    {p.responsible ? (
                                                        <Tooltip key={p.responsible.name} hasArrow label={p.responsible.name} bg='red.600'>
                                                            <Avatar
                                                                objectFit={'cover'}
                                                                borderRadius='full'
                                                                boxSize='50px'
                                                                name={p.responsible.name}
                                                                src={p.responsible.photo_url}
                                                            />
                                                        </Tooltip>
                                                    ) : (
                                                        <Text>Sem líder</Text>
                                                    )}
                                                </Flex>
                                            </Td>
                                            <Td>
                                                <Box display='flex' gap='10px'>
                                                    <HasPermission permissions={['update_project']}>
                                                        <TableActionButton text='Editar' icon={FiEdit} onClick={() => selectProject(p.id)} />
                                                    </HasPermission>
                                                    <TableActionButton text='Visualizar' icon={FaRegEye} onClick={() => viewSelectedProject(p.id)} />
                                                    <TableActionButton text='Exibir histórico' icon={AiOutlineHistory} onClick={() => showHistoric(p.id, p.name)} />
                                                </Box>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        ) : (
                            <Text width='100%' textAlign='center'>Não há projetos neste status</Text>
                        )
                    }
                </Flex>
            )}
        </Panel>
    )
})

export default ProjectsTable