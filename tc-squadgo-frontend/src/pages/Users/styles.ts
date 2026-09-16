import styled from 'styled-components'

export const Container = styled.div`
    padding: 0px 30px;
    margin-top: -50px;
`

export const UserActionButton = styled.button`
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

export const PermissionsUpdateContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    
    @media(max-width: 900px) {
        grid-template-columns: 1fr 1fr;
    }

    @media(max-width: 600px) {
        grid-template-columns: 1fr;
    }
`