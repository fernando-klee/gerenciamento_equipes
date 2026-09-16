import * as S from './styles'
import { memo } from "react"
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Spinner,
  Stack,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr
} from "@chakra-ui/react"
import { FaRegEye } from "react-icons/fa"
import { FiEdit } from "react-icons/fi"
import { CgProfile } from 'react-icons/cg'
import { HasPermission } from "../../../../components/HasPermission"
import { ResourcesTableProps } from "../../interfaces"
import { Link } from "react-router-dom"
import Panel from "../../../../components/Panel"
import TableActionButton from "../../../../components/Buttons/TableActionButton"

const ResourcesTable = memo((
  {
    panelTitle,
    loadingResources,
    resources,
    loadingResourceProjectLists,
    selectResourceProjectLists,
    resourceStatusDescription,
    selectResource,
    viewSelectedResource,
    handleSelectResourceAndListProjects
  }: ResourcesTableProps) => {

  const resourceName = (name: string): string => {
    const lastName = name.substring(name.lastIndexOf(' '), name.length)
    const firstName = name.substring(0, name.indexOf(' '))

    return `${firstName} ${lastName}`
  }

  return (
    <Panel
      flexGrow={1}
      title={panelTitle}
      counter={resources.length.toString()}
      position='relative'
      flexDir={'column'}
    >
      {loadingResources ? (
        <Stack>
          <Skeleton height='20px' />
          <Skeleton height='20px' />
          <Skeleton height='20px' />
        </Stack>
      ) : (
        <Flex maxWidth={'-webkit-fill-available'} overflowX='auto'>
          {resources.length > 0 ? (
            <Table variant='simple'>
              <Thead>
                <Tr justifyContent='center' alignItems='center' textAlign='center'>
                  <Th>NOME</Th>
                  <Th>
                    {panelTitle !== 'Sobrecarga' ? (
                      <Tooltip hasArrow label='horas disponíveis' bg='red.600'>
                        horas
                      </Tooltip>
                    ) : (
                      <Tooltip hasArrow label='horas excedentes' bg='red.600'>
                        horas
                      </Tooltip>
                    )}
                  </Th>
                  {panelTitle !== 'Alocados' && panelTitle !== 'Sobrecarga' && (
                    <Th justifyContent='center' alignItems='center' textAlign='center'>
                      STATUS
                    </Th>
                  )}
                  <Th justifyContent='center' alignItems='center' textAlign='center'>
                    CLASSIFICAÇÃO
                  </Th>
                  <HasPermission permissions={['update_resource']}>
                    <Th></Th>
                  </HasPermission>
                </Tr>
              </Thead>
              <Tbody>
                {resources.sort((a, b) => b.hours_left - a.hours_left).map((r) => (
                  <Tr key={r.uuid1}>
                    <Td>
                      <Flex alignItems={'center'} gap='20px'>
                        <Popover key={r.id}>
                          <PopoverTrigger>
                            <Avatar
                              onClick={() => handleSelectResourceAndListProjects(r.id)}
                              cursor='pointer'
                              objectFit={'cover'}
                              borderRadius='full'
                              boxSize='50px'
                              name={r.name}
                              src={r.photo_url}
                            />
                          </PopoverTrigger>
                          <PopoverContent width={'max-content'} maxWidth='330px'>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader mr='20px'>
                              <Text
                                to={`/recursos/${r.id}`}
                                as={Link}
                                fontWeight={700}
                              >{resourceName(r.name)}</Text>
                            </PopoverHeader>
                            <PopoverBody>
                              {loadingResourceProjectLists ? (
                                <Spinner />
                              ) : (
                                <Flex flexDirection={'column'}>
                                  {selectResourceProjectLists && (
                                    <>
                                      <>
                                        {selectResourceProjectLists.projects.length > 0 ? (
                                          selectResourceProjectLists.projects.map(rp => (
                                            <Text
                                              mb={'5px'}
                                              key={rp.id}
                                            >
                                              {rp.project.name} - {rp.hours_amount}h
                                            </Text>
                                          ))
                                        ) : (
                                          <Text>Colaborador não está em nenhum projeto</Text>
                                        )}
                                        <Divider mt={'10px'} orientation='horizontal' />
                                      </>
                                      <Text
                                        mt={'10px'}
                                      >
                                        horas disponíveis: {selectResourceProjectLists.available_hours}h
                                      </Text>
                                    </>
                                  )}
                                </Flex>
                              )}
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                        <Stack display='inline-block' maxWidth='min-content'>
                          <Text
                            maxW={'100px'}
                            fontWeight={700}>
                            {resourceName(r.name)}
                          </Text>
                        </Stack>
                      </Flex>
                    </Td>
                    <Td w='20px' justifyContent='center' alignItems='center' textAlign='center'>
                      <Text fontWeight={700}>
                        {r.hours_left}H
                      </Text>
                    </Td>
                    {panelTitle !== 'Alocados' && panelTitle !== 'Sobrecarga' && (
                      <Td w={'105px'} justifyContent='center' alignItems='center' textAlign='center'>
                        <Tag
                          variant='solid'
                          fontWeight={700}
                          colorScheme={
                            panelTitle === 'Disponíveis'
                              ? r.resourceStatus.substatus?.color : (
                                r.resourceStatus.substatus
                                  ? resourceStatusDescription(
                                    r.resourceStatus.substatus.name,
                                    r.hours_amount,
                                    r.resourceClassification?.classification.description).color
                                  : resourceStatusDescription(
                                    r.resourceStatus.status.name,
                                    r.hours_amount,
                                    r.resourceClassification?.classification.description).color
                              )}>
                          {
                            r.resourceStatus.substatus
                              ? resourceStatusDescription(
                                r.resourceStatus.substatus?.name,
                                r.hours_amount,
                                r.resourceClassification?.classification.description).description
                              : resourceStatusDescription(
                                r.resourceStatus.status.name,
                                r.hours_amount,
                                r.resourceClassification?.classification.description).description
                          }
                        </Tag>
                      </Td>
                    )}
                    <Td>
                      <Box display='flex' gap='10px' justifyContent='center' alignItems='center'>
                        {r.resourceClassification?.classification.description}
                      </Box>
                    </Td>
                    <Td>
                      <Box display='flex' gap='10px'>
                        <HasPermission permissions={['update_resource']}>
                          <TableActionButton
                            text='Editar'
                            icon={FiEdit}
                            onClick={() => selectResource(r.id)}
                          />
                        </HasPermission>
                        <TableActionButton
                          text='Visualizar'
                          icon={FaRegEye}
                          onClick={() => viewSelectedResource(r.id)}
                        />
                        <HasPermission
                          permissions={['view_resources']}
                        >
                          <Tooltip
                            hasArrow label='Acessar perfil'
                            bg='red.600'
                          >
                            <S.AccessResourceProfile
                              to={`/recursos/${r.id}`}
                            >
                              <CgProfile
                                size={20}
                              />
                            </S.AccessResourceProfile>
                          </Tooltip>
                        </HasPermission>
                      </Box>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table >
          ) : (
            <Text
              width='100%'
              textAlign='center'
            >Não há colaboradores neste status
            </Text>
          )}
        </Flex>
      )}
    </Panel >
  )
})

export default ResourcesTable