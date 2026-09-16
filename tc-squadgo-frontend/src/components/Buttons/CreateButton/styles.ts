import styled, { css } from 'styled-components'

interface ButtonProps {
    forceAbsolute?: boolean
}

export const Button = styled.button<ButtonProps>`
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 9px;
    margin-left: 15px;

    background: #2A3D56;

    :hover{
        background-color: #43628B;
    }


    @media(max-width: 1200px) {
        ${props => !props.forceAbsolute && css`
            margin-left: auto;
            position: relative;
            right: 0;
            bottom: 0;
        `}
    }
`