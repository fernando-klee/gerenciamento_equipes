import styled from 'styled-components'

import BackgroundCompleto from '../../../assets/BackgroundCompleto.svg'

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

export const Content = styled.div`
    display: flex;
    position: absolute;
    flex-direction: row;
    justify-content: space-between;
    left: 5%;
    width: 95%;
`

export const BorderContainer = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;

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

export const ContainerImageLogo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    @media(max-width: 1116px) {
        display: none;
    }
`