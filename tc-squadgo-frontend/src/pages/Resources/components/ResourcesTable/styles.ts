import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`

export const PanelsContent = styled.div`
    margin-top: 70px;
    display: flex;
    flex-wrap: wrap;
    gap: 70px 20px;

    @media(max-width: 900px) {
        flex-direction: column;
        gap: 100px;
    }
`

export const ResourceColumn = styled.div<any>`
    display: flex;
    align-items: center;
    flex: 1;
    ${props => props.flex && css`
        flex: ${props.flex};
    `};
    gap: 10px;
`

export const EditResourceButton = styled.button`
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition: all 0.2s;

    &:hover {
        background: rgba(0,0,0,0.1);
    }
`

export const AccessResourceProfile = styled(Link)`
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition: all 0.2s;

    &:hover {
        background: rgba(0,0,0,0.1);
    }
`