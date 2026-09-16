import { Box, Button, Flex, Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Skeleton, Switch, Text } from '@chakra-ui/react'

import { FaRegEye } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import { IoBody } from 'react-icons/io5'
import { MdOutlineLocalFireDepartment } from 'react-icons/md'

import RateInput from '../../../components/Forms/RateInput'

import * as S from './styles'
import TableActionButton from '../../../components/Buttons/TableActionButton'
import ResourceSkillChart from '../../../components/Charts/ResourceSkillChart'
import { RiFilter3Line } from 'react-icons/ri'
import { useSkill } from './Models'


const ResourceSkill: React.FC = () => {
    const skillHook = useSkill()

    const ProjectsSkeleton: React.FC = () => {
        return (
            <Flex width={'250px'} gap='15px' direction='column'>
                <Skeleton height={'20px'} width='100%' />
                <Skeleton height={'20px'} width='100%' />
                <Skeleton height={'20px'} width='100%' />
                <Skeleton height={'20px'} width='100%' />
            </Flex>
        )
    }


    // function changeSoftSwitchValue(event: React.ChangeEvent<HTMLInputElement>) {
    //     const isChecked = event.target.checked

    //     if (skillHook.states.startValueSoftSkillSwitch === 0) {
    //         skillHook.states.setStartValueSoftSkillSwitch(1)
    //         skillHook.states.setGeralSoftSkillsUpdate(isChecked)
    //     } else if (skillHook.states.startValueSoftSkillSwitch === 1) {
    //         skillHook.states.setStartValueSoftSkillSwitch(2)
    //         skillHook.states.setGeralSoftSkillsUpdate(isChecked)
    //     } else {
    //         skillHook.states.setStartValueSoftSkillSwitch(0)
    //         skillHook.states.setGeralSoftSkillsUpdate(false)
    //     }
    // }

    // function changeHardSwitchValue(event: React.ChangeEvent<HTMLInputElement>) {
    //     const isChecked = event.target.checked

    //     if (skillHook.states.startValueHardSkillSwitch === 0) {
    //         skillHook.states.setStartValueHardSkillSwitch(1)
    //         skillHook.states.setGeralHardSkillsUpdate(isChecked)
    //     } else if (skillHook.states.startValueHardSkillSwitch === 1) {
    //         skillHook.states.setStartValueHardSkillSwitch(2)
    //         skillHook.states.setGeralHardSkillsUpdate(isChecked)
    //     } else {
    //         skillHook.states.setStartValueHardSkillSwitch(0)
    //         skillHook.states.setGeralHardSkillsUpdate(false)
    //     }
    // }

    const Skill: React.FC<{ type: 'SOFT' | 'HARD' }> = ({ type }) => {
        const softSkills = skillHook.utils.skillByType(type, skillHook.states.skills)

        return (
            <Flex direction={'column'} gap='10px'>
                {softSkills.map(s => (
                    <S.SkillContent key={s.skill.id} isEnabled={skillHook.states.enableSkillsUpdate}>
                        <Flex width={'100%'} maxW='850px'>
                            <Text>{s.skill.description}:</Text>
                        </Flex>
                        <Flex pt={'2px'} gap='10px' marginLeft='auto'>
                            <RateInput
                                isEnabled={skillHook.hasPermissions(['update_resource']) && skillHook.states.enableSkillsUpdate}
                                key={s.skill.id}
                                id={s.skill.id}
                                onRate={(id, point) => skillHook.handles.handleOnRate(
                                    id, 
                                    point,
                                    skillHook.states.skills,
                                    skillHook.states.setSkills,
                                    skillHook.states.setSkillsChartFiltered,
                                    skillHook.resource_id
                                )}
                                value={s.point}
                                count={5} />
                        </Flex>
                    </S.SkillContent>
                ))}
            </Flex>
        )
    }

    return (
        <Flex direction='column' width='100%' gap='50px'>
            <S.SkillContainer>
                <Flex flex={1} direction='column' gap='20px'>
                    <Flex gap='10px'>
                        <Text fontWeight={700} fontSize={20}>Soft Skills</Text>
                        {skillHook.hasPermissions(['update_resource']) && (
                            <>
                                {skillHook.states.enableSkillsUpdate ? (
                                    <TableActionButton text='Somente leitura' icon={FaRegEye} onClick={() => skillHook.states.setEnableSkillsUpdate(!skillHook.states.enableSkillsUpdate)} />
                                ) : (
                                    <TableActionButton text='Editar' icon={FiEdit} onClick={() => skillHook.states.setEnableSkillsUpdate(!skillHook.states.enableSkillsUpdate)} />
                                )}
                            </>
                        )}
                    </Flex>
                    <Flex direction={'column'} gap='10px'>
                        {skillHook.states.loading ? (
                            <ProjectsSkeleton />
                        ) : (
                            <>
                                {skillHook.utils.skillByType('SOFT', skillHook.states.skills).length === 0 ? (
                                    <Text>Não há soft skills</Text>
                                ) : (
                                    <Skill type='SOFT' />
                                )}
                            </>
                        )}
                    </Flex>
                </Flex>
                <Flex flex={1} direction='column' gap='20px'>
                    <Flex gap='10px'>
                        <Text fontWeight={700} fontSize={20}>Hard Skills</Text>
                        {skillHook.hasPermissions(['update_resource']) && (
                            <>
                                {skillHook.states.enableSkillsUpdate ? (
                                    <TableActionButton text='Somente leitura' icon={FaRegEye} onClick={() => skillHook.states.setEnableSkillsUpdate(!skillHook.states.enableSkillsUpdate)} />
                                ) : (
                                    <TableActionButton text='Editar' icon={FiEdit} onClick={() => skillHook.states.setEnableSkillsUpdate(!skillHook.states.enableSkillsUpdate)} />
                                )}
                            </>
                        )}
                    </Flex>
                    <Flex direction={'column'} gap='10px' mb='50px'>
                        {skillHook.states.loading ? (
                            <ProjectsSkeleton />
                        ) : (
                            <>
                                {skillHook.utils.skillByType('HARD', skillHook.states.skills).length === 0 ? (
                                    <Text>Não há hard skills</Text>
                                ) : (
                                    <Skill type='HARD' />
                                )}
                            </>
                        )}
                    </Flex>
                </Flex>
            </S.SkillContainer>
            <S.SkillChartsContainer>
                <Flex
                    flex={1}
                    borderRadius='10px'
                    alignContent='center'
                    justifyContent='center'
                    direction='column'
                    boxShadow={'0px 2px 5px 1px rgba(0,0,0,0.35)'}
                    width='100%'
                    minW={0}>
                    <Flex justifyContent='space-between'>
                        <Flex position='relative' top='-20px' left='20px' gap='20px' alignSelf='flex-start'>
                            <Flex
                                height='70px'
                                width='70px'
                                alignItems='center'
                                justifyContent='center'
                                borderRadius={'10px'}
                                bgColor='#000'
                                boxShadow='0px 2px 5px 1px rgba(0,0,0,0.35)'>
                                <IoBody size={30} color='#fff' />
                            </Flex>
                            <Flex alignItems='center' justifyContent='flex-end' direction='column' mt='30px'>
                                <Text color='#000' fontWeight={700}>Soft Skills</Text>
                                <Text color='#ccc'>Pontuação</Text>
                            </Flex>
                        </Flex>
                        <Popover>
                            <Box display="inline-block">
                                <PopoverTrigger>
                                    <Button
                                        top='20px'
                                        right='20px'
                                        width='40px'
                                        height='40px'
                                        padding='5px'
                                        borderRadius='50%'
                                        bgColor='#000'>
                                        <RiFilter3Line size={25} color='#fff' />
                                    </Button>
                                </PopoverTrigger>
                            </Box>
                            <PopoverContent>
                                <PopoverCloseButton />
                                <PopoverHeader>
                                    <Flex direction='row' display='flex' alignItems='center' gap='20px'>
                                        <Text fontWeight='700'>Soft Skills</Text>
                                        <Switch
                                            isChecked={skillHook.states.geralSoftSkillsUpdate}
                                            onChange={isChecked => skillHook.handles.handleChangeSoftSwitchValue(
                                                isChecked,
                                                skillHook.states.startValueSoftSkillSwitch,
                                                skillHook.states.setStartValueSoftSkillSwitch,
                                                skillHook.states.setGeralSoftSkillsUpdate
                                            )}
                                            size='sm'
                                        />
                                    </Flex>
                                </PopoverHeader>
                                <PopoverBody>
                                    <Flex gap='7px' direction='column'>
                                        {skillHook.utils.skillByType('SOFT', skillHook.states.skills).length > 0 ? (
                                            <>
                                                {skillHook.utils.skillByType('SOFT', skillHook.states.skills).map(s => (
                                                    <Flex key={s.skill.id} gap='30px' alignItems='center'>
                                                        <Text>{s.skill.description}</Text>
                                                        <Switch
                                                            value={s.skill.id}
                                                            isChecked={
                                                                skillHook.states.startValueSoftSkillSwitch === 1 ||
                                                                (skillHook.states.startValueSoftSkillSwitch !== 2 && skillHook.states.skillsChartFiltered.some(scf => scf.skill.id === s.skill.id))
                                                            }
                                                            onChange={e => skillHook.handles.handleSetSkillChartFilters(
                                                                Number(e.target.value),
                                                                skillHook.states.skills,
                                                                skillHook.states.skillsChartFiltered,
                                                                skillHook.states.setSkillsChartFiltered
                                                            )}
                                                            size='sm'
                                                        />
                                                    </Flex>
                                                ))}
                                            </>
                                        ) : (
                                            <Text>Não há soft skills</Text>
                                        )}
                                    </Flex>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Flex>
                    {skillHook.utils.keyValues('SOFT', skillHook.states.skillsChartFiltered).length === 0 ? (
                        <Flex height={'100%'} width='100%' alignItems='center' justifyContent={'center'} padding='20px'>
                            <Text fontSize={20}>Não há hard skills</Text>
                        </Flex>
                    ) : (
                        <Flex
                            id="softSkillGraph"
                            height='600px'
                            borderRadius='10px'
                            alignContent='center'
                            direction='column'
                            width='100%'
                            minW={0}>
                            <ResourceSkillChart data={skillHook.utils.keyValues('SOFT', skillHook.states.skillsChartFiltered)} />
                        </Flex>
                    )}
                </Flex>
                <Flex
                    flex={1}
                    borderRadius='10px'
                    alignContent='center'
                    justifyContent='center'
                    direction='column'
                    boxShadow={'0px 2px 5px 1px rgba(0,0,0,0.35)'}
                    width='100%'
                    minW={0}>
                    <Flex justifyContent='space-between'>
                        <Flex position='relative' top='-20px' left='20px' gap='20px' alignSelf='flex-start'>
                            <Flex
                                height='70px'
                                width='70px'
                                alignItems='center'
                                justifyContent='center'
                                borderRadius={'10px'}
                                bgColor='#000'
                                boxShadow='0px 2px 5px 1px rgba(0,0,0,0.35)'>
                                <MdOutlineLocalFireDepartment size={30} color='#fff' />
                            </Flex>
                            <Flex alignItems='center' justifyContent='flex-end' direction='column' mt='30px'>
                                <Text color='#000' fontWeight={700}>Hard Skills</Text>
                                <Text color='#ccc'>Pontuação</Text>
                            </Flex>
                        </Flex>
                        <Popover>
                            <Box display="inline-block">
                                <PopoverTrigger>
                                    <Button
                                        top='20px'
                                        right='20px'
                                        width='40px'
                                        height='40px'
                                        padding='5px'
                                        borderRadius='50%'
                                        bgColor='#000'>
                                        <RiFilter3Line size={25} color='#fff' />
                                    </Button>
                                </PopoverTrigger>
                            </Box>
                            <PopoverContent>
                                <PopoverCloseButton />
                                <PopoverHeader>
                                    <Text fontWeight='700'>Hard Skills</Text>
                                    <Switch
                                        isChecked={skillHook.states.geralHardSkillsUpdate}
                                        onChange={isChecked => skillHook.handles.handleChangeHardSwitchValue(
                                            isChecked,
                                            skillHook.states.startValueHardSkillSwitch,
                                            skillHook.states.setStartValueHardSkillSwitch,
                                            skillHook.states.setGeralHardSkillsUpdate
                                        )}
                                        size='sm'
                                    />
                                </PopoverHeader>
                                <PopoverBody>
                                    <Flex direction='column' gap='20px'>
                                        <Flex gap='7px' direction='column'>
                                            {skillHook.utils.skillByType('HARD', skillHook.states.skills).length > 0 ? (
                                                <>
                                                    {skillHook.utils.skillByType('HARD', skillHook.states.skills).map(s => (
                                                        <Flex key={s.skill.id} gap='30px' alignItems='center'>
                                                            <Text>{s.skill.description}</Text>
                                                            <Switch
                                                                value={s.skill.id}
                                                                isChecked={
                                                                    skillHook.states.startValueHardSkillSwitch === 1 ||
                                                                    (skillHook.states.startValueHardSkillSwitch !== 2 && skillHook.states.skillsChartFiltered.some(scf => scf.skill.id === s.skill.id))
                                                                }
                                                                onChange={e => skillHook.handles.handleSetSkillChartFilters(
                                                                    Number(e.target.value),
                                                                    skillHook.states.skills,
                                                                    skillHook.states.skillsChartFiltered,
                                                                    skillHook.states.setSkillsChartFiltered
                                                                )}
                                                                size='sm'
                                                            />
                                                        </Flex>
                                                    ))}
                                                </>
                                            ) : (
                                                <Text>Não há hard skills</Text>
                                            )}
                                        </Flex>
                                    </Flex>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Flex>
                    {skillHook.utils.keyValues('HARD', skillHook.states.skillsChartFiltered).length === 0 ? (
                        <Flex height={'100%'} width='100%' alignItems='center' justifyContent={'center'} padding='20px'>
                            <Text fontSize={20}>Não há hard skills</Text>
                        </Flex>
                    ) : (
                        <Flex
                            id="hardSkillGraph"
                            height='600px'
                            borderRadius='10px'
                            alignContent='center'
                            direction='column'
                            width='100%'
                            minW={0}>
                            <ResourceSkillChart data={skillHook.utils.keyValues('HARD', skillHook.states.skillsChartFiltered)} />
                        </Flex>
                    )}
                </Flex>
            </S.SkillChartsContainer>
        </Flex>
    )
}

export default ResourceSkill