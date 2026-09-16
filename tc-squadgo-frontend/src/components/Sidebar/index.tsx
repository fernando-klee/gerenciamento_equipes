import * as S from './styles'
import { HasPermission } from '../HasPermission'

import visaoGeral from "../../assets/visaogeral.svg";
import clientes from "../../assets/clientes.svg"
import colaboradores from "../../assets/colaboradores.svg"
import dashboard from "../../assets/dashboard.svg"
import escalas from "../../assets/escalas.svg"
import projetos from "../../assets/projetos.svg"
import portal from "../../assets/logoPortal.svg"
import skills from "../../assets/skills.svg"
import logoNormal from "../../assets/logo_normal.svg"
import logoCompleta from "../../assets/logo_completa.svg"
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <S.Container>
            <S.SidebarMenu>
                <div className='separator' />
                <S.Header>
                    <img width='45px' height='45px' className='logoNormal' src={logoNormal} alt='Icone do menu' />
                    <Link to='/'>
                        <img width='160px' height='160px' className='logoCompleta' src={logoCompleta} alt='Icone do menu' />
                    </Link>
                </S.Header>
                <S.Body>
                    <S.MenuList>
                        <S.Item exact activeClassName='itemActive' to='/'>
                            <div className='active'></div>
                            <S.IconContainer>
                                <img width='22px' height='22px' className='logoIcon' src={portal} alt='Icone do portal' />
                            </S.IconContainer>
                            <span>Portal</span>
                        </S.Item>
                        <HasPermission permissions={['view_geral_vision']}>
                            <S.Item exact activeClassName='itemActive' to='/visao-geral'>
                                <div className='active'></div>
                                <S.IconContainer>
                                    <img width='20px' height='20px' className='logoIcon' src={visaoGeral} alt='Icone de visão geral' />
                                </S.IconContainer>
                                <span>Visão Geral</span>
                            </S.Item>
                        </HasPermission>
                        <HasPermission permissions={['view_dashboard_menu']}>
                            <S.Item exact activeClassName='itemActive' to='/dashboard'>
                                <div className='active'></div>
                                <S.IconContainer>
                                    <img width='20px' height='20px' className='logoIcon' src={dashboard} alt='Icone de dashboard' />
                                </S.IconContainer>
                                <span>Dashboard</span>
                            </S.Item>
                        </HasPermission>
                        <HasPermission permissions={['view_projects', 'create_project', 'update_project']}>
                            <S.Item exact activeClassName='itemActive' to='/projetos' >
                                <div className='active'></div>
                                <S.IconContainer>
                                    <img width='20px' height='20px' className='logoIcon' src={projetos} alt='Icone de projetos' />
                                </S.IconContainer>
                                <span>Projetos</span>
                            </S.Item>
                        </HasPermission>
                        <HasPermission permissions={['view_customers', 'create_customer', 'update_customer', 'delete_customer']} >
                            <S.Item exact activeClassName='itemActive' to='/clientes'>
                                <div className='active'></div>
                                <S.IconContainer>
                                    <img width='20px' height='20px' className='logoIcon' src={clientes} alt='Icone de clientes' />
                                </S.IconContainer>
                                <span>Clientes</span>
                            </S.Item>
                        </HasPermission>
                        {/* 'update_resource' */}
                        <HasPermission permissions={['view_resources', 'create_resource']}>
                            <S.Item exact activeClassName='itemActive' to='/recursos'>
                                <div className='active'></div>
                                <S.IconContainer>
                                    <img width='20px' height='20px' className='logoIcon' src={colaboradores} alt='Icone de colaboradores' />
                                </S.IconContainer>
                                <span>Colaboradores</span>
                            </S.Item>
                        </HasPermission>
                        <HasPermission permissions={['view_skills', 'create_skill', 'delete_skill']}>
                            <S.Item exact activeClassName='itemActive' to='/skills'>
                                <div className='active'></div>
                                <S.IconContainer>
                                    <img width='20px' height='20px' className='logoIcon' src={skills} alt='Icone de skills' />
                                </S.IconContainer>
                                <span>Skills</span>
                            </S.Item>
                        </HasPermission>
                        {/* <HasPermission permissions={['view_work_schedule']}> */}
                        <S.Item exact activeClassName='itemActive' to='/escalas'>
                            <div className='active'></div>
                            <S.IconContainer>
                                <img width='22px' height='22px' className='logoIcon' src={escalas} alt='Icone de equipes' />
                            </S.IconContainer>
                            <span>Escalas</span>
                        </S.Item>
                        {/* </HasPermission> */}
                    </S.MenuList>
                </S.Body>
            </S.SidebarMenu>
            <S.BlurBackground />
        </S.Container>
    )
}

export default Sidebar