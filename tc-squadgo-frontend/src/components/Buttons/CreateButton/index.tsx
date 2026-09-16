import { IoMdCreate } from 'react-icons/io'
import { MdAdd } from 'react-icons/md'
import { IconBaseProps } from 'react-icons'

import * as S from './styles'
import { background, Tooltip,  } from '@chakra-ui/react'

interface CreateButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ComponentType<IconBaseProps>
    forceAbsolute?: boolean
    tooltipText?: string
}

const CreateButton: React.FC<CreateButtonProps> = ({ icon: Icon, tooltipText, forceAbsolute = true, ...props }) => {
    return (
        <Tooltip hasArrow label={tooltipText} bg='#43628B'>
            <S.Button forceAbsolute={forceAbsolute} {...props}>
                {Icon ? (
                    <Icon size={23} color='#fff' />
                ) : (
                    <MdAdd size={20} color='#fff' />
                )}
            </S.Button>
        </Tooltip>
    )
}

export default CreateButton