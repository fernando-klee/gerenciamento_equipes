import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
    top: 0;
    width: 100%;
    padding: 9px 15px; 
    display: flex;
    align-items: center;
    z-index: 1;

    margin-bottom: 30px;

    background: #142644;
`

export const Profile = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 7px;
`

export const ProfileLink = styled(Link)`
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
    @media(max-width: 700px) {
        p {
            display: none;
        }
    }
`

export const ActionButton = styled.button`
    width: 40px;
    height: 40px;

    border-radius: 8px;
    transition: all 0.2s;

    &:hover {
        background: #43628B;
    }

    & > span {
        display: flex;
        justify-content: center;
        align-items: center;
    }

`