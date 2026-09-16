import { memo } from 'react'
import { FiEdit } from 'react-icons/fi'
import { FaRegTrashAlt } from 'react-icons/fa'

import * as S from './styles'
import {
    Button,
    Flex,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Spinner,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    Stack,
    Skeleton,
    Tooltip,
    Box
} from '@chakra-ui/react'

import Panel from '../../../components/Panel'
import { HasPermission } from '../../../components/HasPermission'
import TableActionButton from '../../../components/Buttons/TableActionButton'

interface SkillProps {
    id: number
    uuid: string
    description: string
}

interface SkillTypeProps {
    title: string
    text: string
    skills: SkillProps[]
    loadingSkills: boolean
    isLoadingDeleteSkill: boolean
    selectSkill(skill: SkillProps): void
    deleteSkill(skillId: number): void
}

const SkillType = memo((
    { title, text, skills, loadingSkills, isLoadingDeleteSkill, selectSkill, deleteSkill }: SkillTypeProps) => {

    return (
        <S.Container>
            <Panel title={title} counter={skills.length.toString()} marginTop={'100px'} flex={1} position='relative' flexDir={'column'}>
                {loadingSkills ? (
                    <Stack>
                        <Skeleton height='20px' />
                        <Skeleton height='20px' />
                        <Skeleton height='20px' />
                    </Stack>
                ) : (
                    <Flex maxWidth={'-webkit-fill-available'} overflowX='auto'>
                        {skills.length > 0 ? (
                            <Table variant='simple'  sx={{
                                    tableLayout: 'fixed',
                                }}>
                                <Thead>
                                    <Tr>
                                        <Th width="7.75rem">ID</Th>
                                        <Th width="100%">NOME</Th>
                                        <HasPermission permissions={['update_skill', 'delete_skill']}>
                                            <Th width="7.75rem"></Th>
                                        </HasPermission>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {skills.map(hs => (
                                        <Tr key={hs.uuid}>
                                            <Td display='flex' alignItems={'center'} gap='5px'>
                                                <Text fontWeight={700}>
                                                    {hs.id}
                                                </Text>
                                            </Td>
                                            <Td>
                                                <Text fontWeight={700}>
                                                    {hs.description}
                                                </Text>
                                            </Td>
                                            <HasPermission permissions={['update_skill', 'delete_skill']}>
                                                <Td display='flex' gap={'10px'}>
                                                    <HasPermission permissions={['update_skill']}>
                                                        <TableActionButton text='Editar' icon={FiEdit} onClick={() => selectSkill(hs)} />
                                                    </HasPermission>
                                                    <HasPermission permissions={['delete_skill']}>
                                                        <Popover>
                                                            <Tooltip hasArrow label={'Excluir'} bg='red.600'>
                                                                <Box display="inline-block">
                                                                    <PopoverTrigger>
                                                                        <S.SkillActionButton>
                                                                            <FaRegTrashAlt size={20} />
                                                                        </S.SkillActionButton>
                                                                    </PopoverTrigger>
                                                                </Box>
                                                            </Tooltip>

                                                            <PopoverContent>
                                                                <PopoverArrow />
                                                                <PopoverCloseButton />
                                                                <PopoverHeader>
                                                                    <Flex direction='column' gap='10px'>
                                                                        <Text>Deletar {hs.description}?</Text>
                                                                    </Flex>
                                                                </PopoverHeader>
                                                                <PopoverBody>
                                                                    <Text>Você tem certeza que deseja deletar esta {text}?</Text>
                                                                </PopoverBody>
                                                                <PopoverFooter display='flex' justifyContent={'flex-end'}>
                                                                    <Button disabled={isLoadingDeleteSkill} colorScheme={'red'} onClick={() => deleteSkill(hs.id)}>
                                                                        {isLoadingDeleteSkill && <Spinner marginRight='10px' />}
                                                                        Deletar
                                                                    </Button>
                                                                </PopoverFooter>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </HasPermission>
                                                </Td>
                                            </HasPermission>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        ) : (
                            <Text width='100%' fontSize='18px' textAlign='center'>Não há {text} cadastradas</Text>
                        )}
                    </Flex>
                )}
            </Panel>
        </S.Container >
    )
})

export default SkillType