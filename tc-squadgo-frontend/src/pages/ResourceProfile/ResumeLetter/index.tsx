import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Image, Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Skeleton, Switch, Text } from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";

import { createGlobalStyle } from 'styled-components';
import { differenceInMonths } from 'date-fns';
import { RiFilter3Line } from "react-icons/ri";

import { api } from "../../../services/api";

import * as S from './styles'
import ResourceSkillChart from "../../../components/Charts/ResourceSkillChart";
import topLetter from '../../../assets/top-letter.svg';
import hardSkillIcon from '../../../assets/HARDSKILL.svg';
import softSkillIcon from '../../../assets/SOFTSKILL.svg';
import PersonCircle from '../../../assets/PersonCircle.svg';


interface ResourceProfileParams {
    resource_id: any
}

interface SkillProps {
    skill: {
        id: number
        description: string
        type: 'HARD' | 'SOFT'
    }
    point: number
}

interface Classification {
    id: number;
    description: string;
}

interface ResourceData {
    name: string;
    role: string;
    email: string;
    admission_date: string;
    education: string;
    photo_url: string;
    resourceClassification: {
        id: number;
        classification: Classification;
    };
}

const GlobalStyle = createGlobalStyle`
    @media print {
        html, body {
        height: 100%; 
        margin: 0 !important; 
        padding: 0 !important;
        overflow: hidden;
        }
    }
    `;


const ResumeLetter = () => {
    const { resource_id } = useParams<ResourceProfileParams>()
    const [skills, setSkills] = useState<SkillProps[]>([])
    const [skillsChartFiltered, setSkillsChartFiltered] = useState<SkillProps[]>([])
    const [educationParam, setEducationParam] = useState<string | null>(null);
    const [experiencesParam, setExperiencesParam] = useState<string | null>(null);
    const [loading, setLoading] = useState(true)
    const [dateText, setDateText] = useState<string>('');
    const [resource, setResource] = useState<ResourceData>({
        name: "",
        role: "",
        email: "",
        admission_date: "",
        education: "",
        photo_url: "",
        resourceClassification: {
            id: 0,
            classification: {
                id: 0,
                description: "",
            },
        },
    });

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const renderTextWithLineBreaks = (text: string | null) => {
        if (!text) return null;
        return text.split('\n').map((line, index) => (
            <Text key={index} fontSize='m'>{line}</Text>
        ));
    };

    const handlePrint = () => {
        window.print();
    };

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

    const shouldRenderField = (field: string) => {
        const fieldValue = queryParams.get(field);
        return fieldValue !== null && fieldValue !== 'false';
    };

    useEffect(() => {
        const storedEducationText = localStorage.getItem('educationText');
        const storedExperiencesText = localStorage.getItem('experiencesText');

        if (storedEducationText) {
            setEducationParam(storedEducationText);
        }

        if (storedExperiencesText) {
            setExperiencesParam(storedExperiencesText);
        }
    }, []);

    useEffect(() => {
        async function loadSkillPoints() {
            const response = await api.get(`/resources/${resource_id}/skills`)
            const responseSkills = response.data
            setSkills(responseSkills)
            setSkillsChartFiltered(responseSkills)
            setLoading(false)
        }

        loadSkillPoints()
    }, [resource_id])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get<ResourceData>(`resources/${resource_id}`);
                const resourceData: ResourceData = response.data;

                const educationTextParam = queryParams.get('educationText');
                const experiencesTextParam = queryParams.get('experiencesText');

                setResource({
                    name: resourceData.name,
                    role: resourceData.role,
                    email: resourceData.email,
                    admission_date: resourceData.admission_date,
                    education: resourceData.education,
                    photo_url: resourceData.photo_url,
                    resourceClassification: resourceData.resourceClassification
                });

                if (educationTextParam !== null) {
                    setEducationParam(educationTextParam);
                }

                if (experiencesTextParam !== null) {
                    setExperiencesParam(experiencesTextParam);
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching resource:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [location.search]);

    useEffect(() => {
        if (resource.admission_date) {
            const admissionDate = new Date(resource.admission_date);
            console.log(admissionDate);
            const currentDate = new Date();
            const monthsDifference = differenceInMonths(currentDate, admissionDate);

            const years = Math.floor(monthsDifference / 12);
            let remainingMonths = monthsDifference % 12;

            if (remainingMonths === 0 && currentDate.getDate() - admissionDate.getDate() <= 14) {
                remainingMonths = 1;
            }

            const monthsText = remainingMonths === 1 ? 'mês' : 'meses';

            if (years > 0) {
                setDateText(
                    `${years} ano${years > 1 ? 's' : ''} e ${remainingMonths} ${monthsText}`
                );
            } else {
                setDateText(
                    `${remainingMonths} ${monthsText}`
                );
            }
        }
    }, [resource.admission_date]);

    return (
        <>
            <GlobalStyle />
            <Box bg="white" minH="100vh" h='100%'>
                <Flex direction="column">
                    <Image src={topLetter} />
                    <Image
                        onClick={handlePrint}
                        src="https://i.imgur.com/UdJdqE6.png"
                        alt="Logo da Testing Company"
                        className="bottom-center-image"
                        width="10%"
                        alignItems='center'
                        top='-50px'
                        left='74px'
                        pos='relative'
                    />
                    {!loading && (
                        <Flex flexDir='column' mt='-40px'>
                            <Flex flexDir='column' alignItems='center'>
                                <Flex>
                                    <Flex flexDir='column' p={12}>
                                        {shouldRenderField('name') ? (
                                            <Heading as="h1" fontSize="3xl" fontWeight="bold" color="gray.700">
                                                {resource.name}
                                            </Heading>
                                        ) : (
                                            <Heading as="h1" fontSize="3xl" fontWeight="bold" color="gray.700">
                                                Colaborador
                                            </Heading>
                                        )}
                                        <Flex flexDir='column'>
                                            {shouldRenderField('role') && (
                                                <Text fontSize="m" fontWeight={700}>
                                                    {resource.resourceClassification.classification.description}
                                                </Text>
                                            )}
                                            {shouldRenderField('timeInCompany') && (
                                                <Text fontSize="m" fontWeight={700}>
                                                    {dateText} de Testing Company
                                                </Text>
                                            )}
                                        </Flex>
                                        {(shouldRenderField('educationSwitch') || shouldRenderField('experiencesSwitch')) &&
                                            ((educationParam !== '' && educationParam !== null) ||
                                                (experiencesParam !== '' && experiencesParam !== null)) && (
                                                <Flex flexDir='column' gap={5} mt='20px'>
                                                    <Flex flexDir='column'>
                                                        <Text fontWeight={700} fontSize='large'>
                                                            Formação:
                                                        </Text>
                                                        {educationParam !== '' && educationParam !== null && (
                                                            <>
                                                                <Text fontSize="m" fontWeight={700}>
                                                                    Educação:
                                                                </Text>
                                                                {renderTextWithLineBreaks(educationParam)}
                                                            </>
                                                        )}
                                                    </Flex>
                                                    <Flex flexDir='column'>
                                                        {experiencesParam !== '' && experiencesParam !== null && (
                                                            <>
                                                                <Text fontSize="m" fontWeight={700}>
                                                                    Últimas experiências:
                                                                </Text>
                                                                {renderTextWithLineBreaks(experiencesParam)}
                                                            </>
                                                        )}
                                                    </Flex>
                                                </Flex>
                                            )}
                                    </Flex>
                                    {shouldRenderField('photo') ? (
                                        <Image
                                            src={resource.photo_url}
                                            boxSize='150px'
                                            borderRadius='full'
                                        />
                                    ) : (
                                        <Image
                                            src={PersonCircle}
                                            boxSize='150px'
                                            borderRadius='full'
                                        />
                                    )}
                                </Flex>
                            </Flex>
                            <S.SkillChartsContainer>
                                {shouldRenderField('softSkills') && (
                                    <Flex
                                        borderRadius='10px'
                                        direction='column'
                                        width='100%'
                                        minW={0}
                                        ml='80px'
                                        maxH='450px'>
                                        <Popover>
                                            <Box display="inline-block">
                                                <PopoverTrigger>
                                                    <Button
                                                        top='20px'
                                                        right='40px'
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
                                                                <Text>Não há soft skills</Text>
                                                            )}
                                                        </Flex>
                                                    </Flex>
                                                </PopoverBody>
                                            </PopoverContent>
                                        </Popover>
                                        <Flex justifyContent='space-between' alignItems='center'>
                                            <Flex flexDir='column' alignItems='center' justifyContent='center' pos='relative' top='100px'>
                                                <Image src={softSkillIcon} boxSize={20} />
                                                <Text fontWeight={500}>
                                                    Soft Skills
                                                </Text>
                                            </Flex>
                                        </Flex>
                                        {keyValues('SOFT').length === 0 ? (
                                            <Flex height={'100%'} width='100%' alignItems='center' justifyContent={'center'} padding='20px'>
                                                <Text fontSize={20}>Não há soft skills</Text>
                                            </Flex>
                                        ) : (
                                            <Flex
                                                id="softSkillGraph"
                                                height='300px'
                                                alignItems='center'
                                                justifyContent='center'
                                                borderRadius='10px'
                                                direction='row'
                                                width='1200px'
                                                minW={0}>
                                                <Flex w='100%' height='100%' marginLeft='-400px' mt='-130px'>
                                                    <ResourceSkillChart data={keyValues('SOFT')} />
                                                </Flex>
                                            </Flex>
                                        )}
                                    </Flex>
                                )}
                                {shouldRenderField('hardSkills') && (
                                    <Flex
                                        borderRadius='10px'
                                        direction='column'
                                        width='100%'
                                        minW={0}
                                        ml='80px'
                                        mt='50px'
                                        maxH='450px'>
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button
                                                    top='20px'
                                                    right='40px'
                                                    width='40px'
                                                    height='40px'
                                                    padding='5px'
                                                    borderRadius='50%'
                                                    bgColor='#000'>
                                                    <RiFilter3Line size={25} color='#fff' />
                                                </Button>
                                            </PopoverTrigger>
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
                                        <Flex justifyContent='space-between' alignItems='center'>
                                            <Flex flexDir='column' alignItems='center' justifyContent='center' pos='relative' top='100px'>
                                                <Image src={hardSkillIcon} boxSize={20} />
                                                <Text fontWeight={500}>
                                                    Hard Skills
                                                </Text>
                                            </Flex>
                                        </Flex>
                                        {keyValues('HARD').length === 0 ? (
                                            <Flex height={'100%'} width='100%' alignItems='center' justifyContent={'center'} padding='20px'>
                                                <Text fontSize={20}>Não há hard skills</Text>
                                            </Flex>
                                        ) : (
                                            <Flex
                                                id="softSkillGraph"
                                                height='300px'
                                                alignItems='center'
                                                justifyContent='center'
                                                borderRadius='10px'
                                                direction='row'
                                                width='1200px'
                                                minW={0}>
                                                <Flex w='100%' height='100%' marginLeft='-400px' mt='-130px'>
                                                    <ResourceSkillChart data={keyValues('HARD')} />
                                                </Flex>
                                            </Flex>
                                        )}
                                    </Flex>
                                )}
                            </S.SkillChartsContainer>
                        </Flex>
                    )}
                </Flex>
            </Box>
        </>
    );
};

export default ResumeLetter;
