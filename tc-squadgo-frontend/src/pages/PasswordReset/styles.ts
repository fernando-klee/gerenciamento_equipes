import styled from 'styled-components'

import BackgroundCompleto from '../../assets/BackgroundCompleto.svg'

export const PanelBottom = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 15px;
    position: relative;
    margin-bottom: 60px;
    top: -10px;

    & > a {
        margin-left: 5px;
        color: #497DC1;
    }
`

export const ImageBackground = styled.img`
    flex: 1;
    background: url(${BackgroundCompleto}) no-repeat center;
    background-size: cover;
    border-radius: 60px;
    border: 1px solid white;
    border-top-width: 15px;
    border-bottom-width: 25px;
    border-left-width: 5px;
    border-right-width: 5px;
`

export const ContainerImageBottom = styled.div`
    display: flex;
    position: absolute;
    bottom: 0;

    @media(max-width: 1116px) {
        display: none;
    }
`

export const Content = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`

export const ContainerImageLogo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    @media(max-width: 1116px) {
        display: none;
    }
`