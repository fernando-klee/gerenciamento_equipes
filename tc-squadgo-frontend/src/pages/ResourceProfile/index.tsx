import { Avatar, Image, Button, Flex, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Skeleton, Text, useToast, Switch, Textarea, Select, Tooltip } from '@chakra-ui/react'
import { BiWindows } from 'react-icons/bi'
import { IoMdSettings } from 'react-icons/io'
import { MdOutlineFeedback } from 'react-icons/md'
import { TiHome } from 'react-icons/ti'
import { RiChatNewLine } from 'react-icons/ri'

import * as S from './styles'
import Header from '../../components/Header'
import PresentationLetter from '../../assets/carta_apresentacao_ico.png';
import { ResourceProfileProps } from './interfaces'
import { useResourceProfile } from './Models'


const ResourceProfile = ({ children }: ResourceProfileProps) => {
    
    const resourceProfileHook = useResourceProfile(); 

    return (
        <>
            <Header buttons={[
                {
                    createPermissions: [],
                    title: 'Criar feedback',
                    showCreateButton: false
                }
            ]} />
            <Flex direction={'column'}>
                <S.BackgroundContainer />
                {resourceProfileHook.states.resourceExists ? (
                    <S.Teste>
                        <S.BackgroundProfile>
                            {resourceProfileHook.states.loadingResource ? (
                                <>
                                    <Flex gap={'10px'}>
                                        <Skeleton height='100px' width='100px' borderRadius='10px' />
                                        <Flex justifyContent={'center'} direction='column' gap='10px'>
                                            <Skeleton height='20px' width='200px' />
                                            <Skeleton height='20px' width='200px' />
                                        </Flex>
                                    </Flex>
                                </>
                            ) : (
                                <S.ProfileContainer>
                                    <Avatar
                                        height={'100px'}
                                        width={'100px'}
                                        size='2xl'
                                        src={resourceProfileHook.states.resource?.photo_url}
                                        name={resourceProfileHook.states.resource?.name}
                                        borderRadius='10px' />
                                    <Flex direction={'row'} gap='4px' alignItems='center'>
                                        <Flex direction='column' ml={5}>
                                            <Text fontSize='22px' fontWeight={700}>{resourceProfileHook.states.resource?.name}</Text>
                                            <Text fontSize='17px' color='#797979'>{resourceProfileHook.states.resource?.resourceClassification.classification.description}</Text>
                                        </Flex>
                                        <Button
                                            mb={5}
                                            ml={3}
                                            borderRadius='10px'
                                            bgColor='#F7F7F7'
                                            fontSize='16px'
                                            color='#FFFFFF'
                                            width='52px'
                                            height='52px'
                                            fontWeight={400}
                                            onClick={() => resourceProfileHook.handles.handleButtonClickAndShowModal(resourceProfileHook.states.setShowModalLetter)}
                                        >
                                            <Image src={PresentationLetter} />
                                        </Button>
                                    </Flex>

                                </S.ProfileContainer>
                            )}
                            <S.MenuContainer>
                                <S.MenuItem to={`/recursos/${resourceProfileHook.resource_id}`} exact activeClassName='profile-menu-active'>
                                    <TiHome size={20} color='#254568' />Perfil
                                </S.MenuItem>
                                <S.MenuItem to={`/recursos/${resourceProfileHook.resource_id}/projetos`} activeClassName='profile-menu-active'>
                                    <BiWindows size={20} color='#254568' />Projetos
                                </S.MenuItem>
                                <S.MenuItem to={`/recursos/${resourceProfileHook.resource_id}/feedbacks`} activeClassName='profile-menu-active'>
                                    <MdOutlineFeedback size={20} color='#254568' />Feedbacks
                                </S.MenuItem>
                                <Tooltip 
                                    label="Você só pode ver os one-on-one dos seus liderados" 
                                    isDisabled={resourceProfileHook.states.isLeader}
                                    placement="right"
                                >
                                    <S.MenuItem 
                                        to={`/recursos/${resourceProfileHook.resource_id}/one-on-one`} 
                                        activeClassName='profile-menu-active' 
                                        style={{ 
                                            opacity: resourceProfileHook.states.isLeader ? 1 : 0.5, 
                                            cursor: resourceProfileHook.states.isLeader ? 'pointer' : 'not-allowed',
                                            pointerEvents: resourceProfileHook.states.isLeader ? 'auto' : 'none'
                                        }}
                                        onClick={(e) => resourceProfileHook.handles.handleOneOnOneClick(e, resourceProfileHook.states.isLeader)}
                                    >
                                        <RiChatNewLine size={20} color='#254568' />One-on-One
                                    </S.MenuItem>
                                </Tooltip>
                                <S.MenuItem to={`/recursos/${resourceProfileHook.resource_id}/skills`} activeClassName='profile-menu-active'>
                                    <IoMdSettings size={20} color='#254568' />Skills
                                </S.MenuItem>
                            </S.MenuContainer>
                        </S.BackgroundProfile>
                        {resourceProfileHook.states.resource && (
                            <Flex width='100%' bgColor='#fff' padding='20px' borderRadius='10px'>
                                {children}
                            </Flex>
                        )}
                    </S.Teste>
                ) : (
                    <Text>Recurso não EXISTE</Text>
                )}
            </Flex>
            <Flex>
                {resourceProfileHook.states.showModalLetter && (
                    <Modal isOpen={resourceProfileHook.states.showModalLetter} onClose={() => resourceProfileHook.states.setShowModalLetter(false)} isCentered >
                        <ModalOverlay />
                        <ModalContent bgColor='#EEEFF2' borderRadius='5px' paddingLeft={5} paddingRight={5} paddingBottom={5} minW='600px'>
                            <ModalHeader>
                                <Text ml='-25px' fontSize='14px' fontWeight={700} color='#494343'>Gerar carta de apresentação</Text>
                                <ModalCloseButton />
                            </ModalHeader>
                            <ModalBody bgColor='#F9F9FA' borderRadius='5px'>
                                <Flex flexDirection="row" alignItems="flex-start" justifyContent="space-between">
                                    <Flex width="48%">
                                        <Flex flexDirection="column">
                                            <Flex>
                                                <Text fontWeight={400} style={{ marginRight: '10px' }}>Selecione as Informações</Text>
                                                <Text fontWeight={400} style={{ marginLeft: '10px' }}>Exibir</Text>
                                            </Flex>
                                            <FormControl>
                                                <FormControl>
                                                    <Flex justifyContent="space-between" alignItems="center">
                                                        <FormLabel htmlFor='name'>Nome</FormLabel>
                                                        <Switch id='name' isChecked={resourceProfileHook.states.switchStates.name} onChange={() => resourceProfileHook.handles.handleSwitchToggle(
                                                            'name',
                                                            resourceProfileHook.states.switchStates,
                                                            resourceProfileHook.states.setEducationSwitch, 
                                                            resourceProfileHook.states.educationSwitch, 
                                                            resourceProfileHook.states.setExperienceSwitch,
                                                            resourceProfileHook.states.experienceSwitch, 
                                                            resourceProfileHook.states.setSwitchStates
                                                            )} />
                                                    </Flex>
                                                    <Flex justifyContent="space-between" alignItems="center">
                                                        <FormLabel htmlFor='role'>Cargo</FormLabel>
                                                        <Switch id='role' isChecked={resourceProfileHook.states.switchStates.role} onChange={() => resourceProfileHook.handles.handleSwitchToggle(
                                                            'role',
                                                            resourceProfileHook.states.switchStates,
                                                            resourceProfileHook.states.setEducationSwitch, 
                                                            resourceProfileHook.states.educationSwitch, 
                                                            resourceProfileHook.states.setExperienceSwitch,
                                                            resourceProfileHook.states.experienceSwitch, 
                                                            resourceProfileHook.states.setSwitchStates
                                                            )} />
                                                    </Flex>
                                                    <Flex justifyContent="space-between" alignItems="center">
                                                        <FormLabel htmlFor='photo'>Foto</FormLabel>
                                                        <Switch id='photo' isChecked={resourceProfileHook.states.switchStates.photo} onChange={() => resourceProfileHook.handles.handleSwitchToggle(
                                                            'photo',
                                                            resourceProfileHook.states.switchStates,
                                                            resourceProfileHook.states.setEducationSwitch, 
                                                            resourceProfileHook.states.educationSwitch, 
                                                            resourceProfileHook.states.setExperienceSwitch,
                                                            resourceProfileHook.states.experienceSwitch, 
                                                            resourceProfileHook.states.setSwitchStates  
                                                            )} />
                                                    </Flex>
                                                    <Flex justifyContent="space-between" alignItems="center">
                                                        <FormLabel htmlFor='timeInCompany'>Tempo de empresa</FormLabel>
                                                        <Switch id='timeInCompany' isChecked={resourceProfileHook.states.switchStates.timeInCompany} onChange={() => resourceProfileHook.handles.handleSwitchToggle(
                                                            'timeInCompany',
                                                            resourceProfileHook.states.switchStates,
                                                            resourceProfileHook.states.setEducationSwitch, 
                                                            resourceProfileHook.states.educationSwitch, 
                                                            resourceProfileHook.states.setExperienceSwitch,
                                                            resourceProfileHook.states.experienceSwitch, 
                                                            resourceProfileHook.states.setSwitchStates
                                                            )} />
                                                    </Flex>
                                                </FormControl>
                                            </FormControl>
                                            <Flex flexDirection="column" mt={3}>
                                                <Flex justifyContent="space-between" alignItems="center">
                                                    <Text fontWeight={700} style={{ marginRight: '10px' }}>Educação</Text>
                                                    <Switch isChecked={resourceProfileHook.states.educationSwitch} onChange={() => resourceProfileHook.handles.handleSwitchToggle(
                                                        'education',
                                                        resourceProfileHook.states.switchStates,
                                                        resourceProfileHook.states.setEducationSwitch, 
                                                        resourceProfileHook.states.educationSwitch, 
                                                        resourceProfileHook.states.setExperienceSwitch,
                                                        resourceProfileHook.states.experienceSwitch, 
                                                        resourceProfileHook.states.setSwitchStates
                                                        )} />
                                                </Flex>
                                                {resourceProfileHook.states.educationSwitch && (
                                                    <Textarea id='education' value={resourceProfileHook.states.educationText} onChange={(e)=> resourceProfileHook.handles.handleEducationChange(e, resourceProfileHook.states.setEducationText)}></Textarea>
                                                )}
                                            </Flex>
                                            <Flex flexDirection="column" mt={3}>
                                                <Flex justifyContent="space-between" alignItems="center">
                                                    <Text fontWeight={700} style={{ marginRight: '10px' }}>Experiências</Text>
                                                    <Switch isChecked={resourceProfileHook.states.experienceSwitch} onChange={() => resourceProfileHook.handles.handleSwitchToggle(
                                                        'experiences',
                                                        resourceProfileHook.states.switchStates,
                                                        resourceProfileHook.states.setEducationSwitch, 
                                                        resourceProfileHook.states.educationSwitch, 
                                                        resourceProfileHook.states.setExperienceSwitch,
                                                        resourceProfileHook.states.experienceSwitch, 
                                                        resourceProfileHook.states.setSwitchStates
                                                        )} />
                                                </Flex>
                                                {resourceProfileHook.states.experienceSwitch && (
                                                    <Textarea id='experiences' value={resourceProfileHook.states.experiencesText} onChange={(e) => resourceProfileHook.handles.handleExperienceChange(e, resourceProfileHook.states.setExperiencesText)}></Textarea>
                                                )}
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <Flex width="48%">
                                        <Flex flexDirection="column">
                                            <Flex flexDirection="column" mt={6}>
                                                <Flex justifyContent="space-between" alignItems="center">
                                                    <FormLabel htmlFor='hardSkills'>Hard Skills</FormLabel>
                                                    <Switch mb={4} id='hardSkills' isChecked={resourceProfileHook.states.switchStates.hardSkills} onChange={() => resourceProfileHook.handles.handleHardSkillsToggle(
                                                        resourceProfileHook.states.setShowHardSkills,
                                                        resourceProfileHook.states.showHardSkills,
                                                        resourceProfileHook.states.switchStates,
                                                        resourceProfileHook.states.setEducationSwitch,
                                                        resourceProfileHook.states.educationSwitch,
                                                        resourceProfileHook.states.setExperienceSwitch,
                                                        resourceProfileHook.states.experienceSwitch,
                                                        resourceProfileHook.states.setSwitchStates
                                                    )} />
                                                </Flex>
                                            </Flex>
                                            <Flex flexDirection="column" mt={1}>
                                                <Flex justifyContent="space-between" alignItems="center">
                                                    <FormLabel htmlFor='softSkills'>Soft Skills</FormLabel>
                                                    <Switch id='softSkills' isChecked={resourceProfileHook.states.switchStates.softSkills} onChange={() => resourceProfileHook.handles.handleSoftSkillsToggle(
                                                        resourceProfileHook.states.setShowSoftSkills,
                                                        resourceProfileHook.states.showSoftSkills,
                                                        resourceProfileHook.states.switchStates,
                                                        resourceProfileHook.states.setEducationSwitch,
                                                        resourceProfileHook.states.educationSwitch,
                                                        resourceProfileHook.states.setExperienceSwitch,
                                                        resourceProfileHook.states.experienceSwitch,
                                                        resourceProfileHook.states.setSwitchStates
                                                    )} />
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <Flex justifyContent="flex-end" mt={5}>
                                    <Button borderRadius='10px' bgColor='white' fontSize='16px' color='#030303' width='100px' height='30px' fontWeight={400} marginTop={1} onClick={() => resourceProfileHook.handles.handleCancel(resourceProfileHook.states.setShowModalLetter)}>Cancelar</Button>
                                    <Button borderRadius='10px' bgColor='#0083d2' fontSize='16px' color='#FFFFFF' width='100px' height='30px' fontWeight={400} marginTop={1} onClick={() => resourceProfileHook.handles.handleSendCreateLetter(
                                        resourceProfileHook.resource_id,
                                        resourceProfileHook.states.switchStates,
                                        resourceProfileHook.states.educationSwitch,
                                        resourceProfileHook.states.educationText,
                                        resourceProfileHook.states.experienceSwitch,
                                        resourceProfileHook.states.experiencesText,
                                        resourceProfileHook.history
                                    )}>Gerar</Button>
                                </Flex>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                )}
            </Flex>
        </>
    )
}

export default ResourceProfile