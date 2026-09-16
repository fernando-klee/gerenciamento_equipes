import styled, { css } from 'styled-components'

interface ActionButtonProps {
    hasUnread: boolean
}

export const ActionButton = styled.button<ActionButtonProps>`
    position: relative;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 8px;
    transition: all 0.2s;

    &:hover {
        background: #43628B;
    }

    ${props => props.hasUnread && css`
        &::before {
            content: '';
            position: absolute;
            top: 5px;
            right: 7px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: red;
        }
    `}

`