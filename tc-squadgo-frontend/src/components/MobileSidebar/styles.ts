import styled, { css } from 'styled-components'
import { Link, NavLink } from 'react-router-dom'

interface ContentProps {
    mobileVisible: boolean
}

export const Container = styled.div`
    z-index: 1;
`

export const ResponsibleContainer = styled.div`
    @media(min-width: 900px) {
        display: none;
    }
`

export const Content = styled.div<ContentProps>`
    height: 100vh;
    position: absolute;
    top: 0;
    left: -330px;
    width: 330px;
    background-color: #142644;
    overflow-y: auto;
    transition: all 0.3s;

    ${props => props.mobileVisible && css`
        left: 0px;
    `}
`

export const Header = styled.div`
    position: relative;
    width: 100%;
    padding: 20px 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;

    img {
        transition: all 0.2s;
    }

    h3 {
        right: 30px;
        font-size: 18px;
        font-weight: 700;
        color: #fff;

        transition: all 0.2s;
    }
`

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`

export const MenuList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;

    h3 {
        font-weight: 700;
        color: #fff;
    }
`

export const Item = styled(NavLink)`
    width: 100%;
    height: 50px;
    margin: 5px;
    padding: 7px;
    display: flex;
    align-items: center;

    border-radius: 10px;
    font-weight: 700;
    color: #fff;

    &:hover {
        background: #FFFFFF;
        color: #142644;
        font-weight: 900;

        .logoIcon {
            filter: brightness(0) saturate(100%) invert(10%) sepia(14%) saturate(5994%) hue-rotate(195deg) brightness(97%) contrast(91%);
        }
    }

    & > span {
        min-width: max-content;
        margin-left: 40px;

        transition: all 0.2s;
    }
`

export const IconContainer = styled.div`
    min-width: max-content;
    margin-right: 10px;
    transition: all 0.2s;
`