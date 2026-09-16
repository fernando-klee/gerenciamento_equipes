import styled from 'styled-components'

export const ChartLine = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    min-width: 0;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 51.358px rgba(221, 221, 221, 0.49);
    border-radius: 6.54639px;

    gap: 70px 30px;
    @media(max-width: 1100px) {
        flex-direction: column;
    }
`

export const GraphsLine = styled.div`
    display: flex;
    flex-direction: row;
    width: 49%;
    min-width: 0;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 51.358px rgba(221, 221, 221, 0.49);
    border-radius: 6.54639px;

    gap: 70px 30px;
    @media(max-width: 1100px) {
        flex-direction: column;
    }
`