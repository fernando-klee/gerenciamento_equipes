import styled from 'styled-components'

export const LargeChartContainer = styled.div`
    display: none;

    @media(min-width: 608px) {
        height: 500px;
        width: 100%;
        min-width: 0;
        padding-top: 80px;
        display: flex;
        align-items: center;
        direction: column;

        border-radius: 10px;
    }
`

export const SmallChartContainer = styled.div`
    display: none;

    @media(max-width: 608px) {
        height: 400px;
        width: 100%;
        min-width: 0;
        padding-top: 70px;
        display: flex;
        align-content: center;
        direction: column;

        border-radius: 10px;
    }
`