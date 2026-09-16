import { useEffect, useState } from 'react'
import { Box, Button, Flex, Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Skeleton, Switch, Text } from '@chakra-ui/react'

import { FaRegEye } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import { IoBody } from 'react-icons/io5'
import { MdOutlineLocalFireDepartment } from 'react-icons/md'

import { api } from '../../../services/api'
import RateInput from '../../../components/Forms/RateInput'

import { useAuth } from '../../../context/AuthContext'

import * as S from './styles'
import TableActionButton from '../../../components/Buttons/TableActionButton'
import ResourceSkillChart from '../../../components/Charts/ResourceSkillChart'
import { RiFilter3Line } from 'react-icons/ri'

interface SkillProps {
    skill: {
        id: number
        description: string
        type: 'HARD' | 'SOFT'
    }
    point: number
}

const ResourceSkill: React.FC = () => {
    const { hasPermissions, user } = useAuth()

    const [enableSkillsUpdate, setEnableSkillsUpdate] = useState(false)
    const [skills, setSkills] = useState<SkillProps[]>([])
    const [skillsChartFiltered, setSkillsChartFiltered] = useState<SkillProps[]>([])
    const [loading, setLoading] = useState(true)

    const [hasSoftSkills, setHasSoftSkills] = useState(false);
    const [hasHardSkills, setHasHardSkills] = useState(false);

    useEffect(() => {
        const softSkillsExist = skills.some(skill => skill.skill.type === 'SOFT' && skill.point > 0);
        const hardSkillsExist = skills.some(skill => skill.skill.type === 'HARD' && skill.point > 0);
        setHasSoftSkills(softSkillsExist);
        setHasHardSkills(hardSkillsExist);
        console.log(softSkillsExist);
    }, [skills]);

    useEffect(() => {
        async function loadSkillPoints() {
            const response = await api.get(`/resources/${user.id}/skills`)
            const responseSkills = response.data
            setSkills(responseSkills)
            setSkillsChartFiltered(responseSkills)
            setLoading(false)
        }

        loadSkillPoints()
    }, [user.id])

    async function onRate(id: number, point: number) {
        const oldSkills = [...skills]
        const skillIndex = oldSkills.findIndex(s => s.skill.id === id)
        const skill = oldSkills[skillIndex]

        if (skill.point === point) skill.point = skill.point - 1
        else skill.point = point

        oldSkills[skillIndex] = skill
        setSkills(oldSkills)
        setSkillsChartFiltered(oldSkills)

        await api.put(`/resources/${user.id}/skills`, {
            point: skill.point,
            skill_id: id
        })

    }

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

    const skillByType = (type: string): SkillProps[] => {
        return skills.filter(f => f.skill.type === type)
    }

    const skillChartByType = (type: string): SkillProps[] => {
        return skillsChartFiltered.filter(f => f.skill.type === type)
    }

    const setSkillChartFilters = (id: number) => {
        const oldSkills = [...skills]
        const oldSkillsChart = [...skillsChartFiltered]

        const containsIndex = oldSkillsChart.findIndex(osc => osc.skill.id === id)
        if (containsIndex === -1) {
            const currentSkillChartIndex = oldSkills.findIndex(os => os.skill.id === id)
            const currentSkillChart = oldSkills[currentSkillChartIndex]
            oldSkillsChart.push(currentSkillChart)
        } else {
            oldSkillsChart.splice(containsIndex, 1)
        }

        setSkillsChartFiltered(oldSkillsChart)
    }

    const keyValues = (type: string): any[] => {
        let skills = skillChartByType(type).map((s, i) => {
            return {
                'skill': s.skill.description,
                'Pontuação': s.point
            }
        })

        return skills
    }

    const Skill: React.FC<{ type: 'SOFT' | 'HARD' }> = ({ type }) => {
        const softSkills = skillByType(type)

        return (
            <Flex direction={'column'} gap='10px'>
                {softSkills.map(s => (
                    <S.SkillContent key={s.skill.id} isEnabled={enableSkillsUpdate}>
                        <Flex width={'100%'} maxW='850px'>
                            <Text>{s.skill.description}:</Text>
                        </Flex>
                        <Flex pt={'2px'} gap='10px' marginLeft='auto'>
                            <RateInput
                                isEnabled={hasPermissions(['update_resource']) && enableSkillsUpdate}
                                key={s.skill.id}
                                id={s.skill.id}
                                onRate={onRate}
                                value={s.point}
                                count={5} />
                        </Flex>
                    </S.SkillContent>
                ))}
            </Flex>
        )
    }

    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
          setShowButton(true);
        }, 3500);
    
        return () => clearTimeout(timeoutId);
      }, []);

    return (
        <Flex direction='column' width='100%' gap='50px'>
            <S.SkillContainer>
                <Flex flex={1} direction='column' gap='20px'>
                    <Flex gap='10px'>
                        <Text fontWeight={700} fontSize={20}>Soft Skills</Text>
                        {showButton && (
                            enableSkillsUpdate ? (
                                <TableActionButton text='Somente leitura' icon={FaRegEye} onClick={() => setEnableSkillsUpdate(!enableSkillsUpdate)} />
                            ) : (
                                !hasSoftSkills && (
                                    <TableActionButton text='Editar' icon={FiEdit} onClick={() => setEnableSkillsUpdate(!enableSkillsUpdate)} />
                                )
                            )
                        )}
                    </Flex>
                    <Flex direction={'column'} gap='10px'>
                        {loading ? (
                            <ProjectsSkeleton />
                        ) : (
                            <>
                                {skillByType('SOFT').length === 0 ? (
                                    <Text>Não há soft skills</Text>
                                ) : (
                                    <>
                                        {hasSoftSkills ? (
                                            console.log(true)
                                        ) : (
                                            console.log(false)
                                        )}
                                        <Skill type='SOFT' />
                                    </>
                                )}
                            </>
                        )}
                    </Flex>
                </Flex>
                <Flex flex={1} direction='column' gap='20px'>
                    <Flex gap='10px'>
                        <Text fontWeight={700} fontSize={20}>Hard Skills</Text>
                        {showButton && (
                            enableSkillsUpdate ? (
                                <TableActionButton text='Somente leitura' icon={FaRegEye} onClick={() => setEnableSkillsUpdate(!enableSkillsUpdate)} />
                            ) : (
                                !hasSoftSkills && (
                                    <TableActionButton text='Editar' icon={FiEdit} onClick={() => setEnableSkillsUpdate(!enableSkillsUpdate)} />
                                )
                            )
                        )}
                    </Flex>
                    <Flex direction={'column'} gap='10px' mb='50px'>
                        {loading ? (
                            <ProjectsSkeleton />
                        ) : (
                            <>
                                {skillByType('HARD').length === 0 ? (
                                    <Text>Não há hard skills</Text>
                                ) : (
                                    <>
                                        {hasHardSkills ? (
                                            console.log(true)
                                        ) : (
                                            console.log(false)
                                        )}
                                        <Skill type='HARD' />
                                    </>
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
                                    <Text fontWeight='700'>Soft Skills</Text>
                                </PopoverHeader>
                                <PopoverBody>
                                    <Flex direction='column' gap='20px'>
                                        <Flex gap='7px' direction='column'>
                                            {skillByType('SOFT').length > 0 ? (
                                                <>
                                                    {skillByType('SOFT').map(s => (
                                                        <Flex key={s.skill.id} gap='30px' alignItems='center'>
                                                            <Text>{s.skill.description}</Text>
                                                            <Switch
                                                                value={s.skill.id}
                                                                isChecked={skillsChartFiltered.some(scf => scf.skill.id === s.skill.id)}
                                                                onChange={e => setSkillChartFilters(Number(e.target.value))}
                                                                size='sm' />
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
                    {keyValues('SOFT').length === 0 ? (
                        <Flex height={'100%'} width='100%' alignItems='center' justifyContent={'center'} padding='20px'>
                            <Text fontSize={20}>Não há hard skills</Text>
                        </Flex>
                    ) : (
                        <Flex
                            height='600px'
                            borderRadius='10px'
                            alignContent='center'
                            direction='column'
                            width='100%'
                            minW={0}>
                            <ResourceSkillChart data={keyValues('SOFT')} />
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
                                </PopoverHeader>
                                <PopoverBody>
                                    <Flex direction='column' gap='20px'>
                                        <Flex gap='7px' direction='column'>
                                            {skillByType('HARD').length > 0 ? (
                                                <>
                                                    {skillByType('HARD').map(s => (
                                                        <Flex key={s.skill.id} gap='10px' alignItems='center'>
                                                            <Text>{s.skill.description}</Text>
                                                            <Switch
                                                                value={s.skill.id}
                                                                isChecked={skillsChartFiltered.some(scf => scf.skill.id === s.skill.id)}
                                                                onChange={e => setSkillChartFilters(Number(e.target.value))}
                                                                size='sm' />
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
                    {keyValues('HARD').length === 0 ? (
                        <Flex height={'100%'} width='100%' alignItems='center' justifyContent={'center'} padding='20px'>
                            <Text fontSize={20}>Não há hard skills</Text>
                        </Flex>
                    ) : (
                        <Flex
                            height='600px'
                            borderRadius='10px'
                            alignContent='center'
                            direction='column'
                            width='100%'
                            minW={0}>
                            <ResourceSkillChart data={keyValues('HARD')} />
                        </Flex>
                    )}
                </Flex>
            </S.SkillChartsContainer>
        </Flex>
    )
}

export default ResourceSkill