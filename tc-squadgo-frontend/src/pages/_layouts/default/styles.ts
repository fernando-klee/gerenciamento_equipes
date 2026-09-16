import styled from 'styled-components'

export const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    background: #eaeaf4;
    overflow-y: hidden;
`

export const Content = styled.div`
    width: 100%;
    margin-left: 80px;
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: hidden;

    @media(max-width: 900px) {
        margin-left: 0;
    }
`

export const Body = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
`

export const Footer = styled.div`
    margin: 25px 40px;
    display: flex;
    align-items: flex-end;
    flex: 1;
    justify-content: center;
`