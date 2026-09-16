import styled from 'styled-components'

export const PanelsContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 70px 50px;
    padding: 0px 30px;
    margin-top: -50px;

    @media(max-width: 900px) {
        flex-direction: column;
        gap: 10px;
    }
`