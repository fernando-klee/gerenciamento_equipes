import { Tooltip } from "@chakra-ui/react"

import { IconType } from 'react-icons'

import * as S from './styles'

interface TableActionButtonProps {
    text: string
    onClick?(): void
    icon: IconType
}

const TableActionButton: React.FC<TableActionButtonProps> = ({ text, icon: Icon, onClick }) => {
    return (
        <Tooltip hasArrow label={text} bg='red.600'>
            <S.EditResourceButton onClick={onClick}>
                <Icon size={20} />
            </S.EditResourceButton>
        </Tooltip>
    )
}

export default TableActionButton