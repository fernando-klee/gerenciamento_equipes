import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'

export const SidebarMenu = styled.div`
    position: relative;
    top: 0;
    left: 0;
    bottom: 0;
    width: 80px;
    background-color: #142644;
    transition: all 0.3s;
    overflow: hidden;
    z-index: 11;

    img.logoNormal {
        bottom: 8px;
        margin-left: -3px;
    }

    img.logoCompleta {
        opacity: 0;
    }

    .separator {
        position: absolute;
        background: #2A3D56;
        width: 2px;
        height: 50px;
        left: 78px;
        top: 6px;
    }

    &:hover {
        overflow-y: auto;
        width: 250px;

        .separator {
            opacity: 0;
        }

        & > div {
            justify-content: flex-start;

            & > a {
                width: 100%;
                margin-left: -32px;
            }

            img.logoCompleta {
                opacity: 1;
            }

            img {
                opacity: 1;
            }

            img.logoNormal {
                opacity: 0;
                left: 100px;
                transition: all 0.5s;
            }
        }

        & h3 {
            opacity: 1;
        }

        span {
            opacity: 1;
            left: 0;
        }
    }

    @media(max-width: 900px) {
        display: none;
    }
`

export const BlurBackground = styled.div`
    position: relative;
    flex: 1;
    transition: all 0.2s;
    pointer-events: none;
    z-index: 3;
`

export const Container = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    ${SidebarMenu}:hover + ${BlurBackground} {
        background: rgba(0,0,0,0.5);
    }
`

export const Header = styled.div`
    position: relative;
    width: 100%;
    padding: 20px 5px;
    display: flex;
    align-items: center;

;

    img {
        position: relative;
        left: 15px;
        transition: all 0.2s;
    }

    h3 {
        position: absolute;
        min-width: max-content;
        right: 30px;
        opacity: 0;
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
    margin-top: -30px;
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
    position: relative;
    width: 100%;
    height: 50px;
    margin: 5px;
    padding: 7px;
    display: flex;
    align-items: center;

    border-radius: 10px;
    font-weight: 100;
    color: #fff;

    &:hover {
        background: #43628B;
        color: #FFF;
        font-weight: 1000;

    }

    & > span {
        min-width: max-content;
        position: absolute;
        margin-left: 63px;
        left: -50px;
        opacity: 0;

        transition: all 0.2s;
    }
`

export const IconContainer = styled.div`
    min-width: max-content;
    margin-right: 10px;
    transition: all 0.2s;
`