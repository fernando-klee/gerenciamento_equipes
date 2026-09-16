import styled from 'styled-components'

import { NavLink } from 'react-router-dom'

import resource_background from '../../assets/resource_background_new.png'
import resource_background_mobile from '../../assets/resource_background_mobile.png'

export const BackgroundContainer = styled.div`
    width: 100%;
    height: 300px;
    background-image: url(${resource_background});
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 10px;
    margin-top: -40px;

    @media(max-width: 785px) {
        display: none;
    }
`

export const Teste = styled.div`
    position: relative;
    top: -60px;
    width: 97%;
    display: flex;
    flex-direction: column;
    align-self: center;

    box-shadow: 0px 2px 5px 1px rgba(0,0,0,0.35);
    border-radius: 8px;
    background-color: #f7f7f7;

    @media(max-width: 785px) {
        top: 0;
        gap: 20px;

        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }
`

export const BackgroundProfile = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background: #fff;

    @media(max-width: 785px) {
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;

        background-image: url(${resource_background_mobile});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
`

export const ProfileContainer = styled.div`
    display: flex;
    align-items: center;

    .image-container {
    position: relative;
    display: inline-block;
    box-sizing: border-box; /* Garante que a borda não altere o tamanho da imagem */
    border: 2px solid transparent; /* Borda transparente inicial (evita "pulos" no hover) */
    transition: all 0.1s ease; 
}

    /* Esconde o botão por padrão */
    .edit-button {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        cursor: pointer;
        border: none;
        justify-content: center;
        align-items: center;
        z-index: 2; /* Garante que o botão fique acima da imagem */
    }
    
    /* Efeito hover no container */
    .image-container:hover {
        border: 2px solid #43628B;
        border-radius:10px;

        .edit-button {
            display: flex; /* Mostra o botão cobrindo toda a imagem */
            background: transparent;
        }
        
        img {
            opacity: 0.4; /* Deixa a imagem mais transparente */
            transition: opacity 0.3s ease; /* Adiciona transição suave */
        }
    }

    @media(max-width: 785px) {
        p {
            color: #fff;
        }
    }
`

export const MenuContainer = styled.div`
    display: flex;
    padding: 5px 10px;
    gap: 5px;
    flex-wrap: wrap;

    border-radius: 10px;
    background: #f8f9fa;

    @media(max-width: 785px) {
        margin-left: 0;
    }
`

export const MenuItem = styled(NavLink)`
    padding: 7px;
    display: flex;
    gap: 5px;
    align-items: center;

    border-radius: 7px;
    transition: all 0.2s;

    &:hover {
        background: #e2e2e2;
        box-shadow: 0px 2px 5px 1px rgba(0,0,0,0.35);
    }
`