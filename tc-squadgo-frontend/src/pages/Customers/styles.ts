import styled, { css } from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 70px 20px;
    padding: 0px 30px;
`

export const CustomersList = styled.div`
    display: flex;
    flex-direction: column;
`

export const CustomerListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Customer = styled.div`
    position: relative;
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &::after {
        position: absolute;
        top: -11px;
        left: 0;
        content: "";
        width: 100%;
        height: 1px;
        background: #ccc;
    }
`

export const CustomerColumn = styled.div<any>`
    display: flex;
    align-items: center;
    flex: 1;
    ${props => props.flex && css`
        flex: ${props.flex};
    `};
    gap: 10px;
`

export const EditCustomerButton = styled.button`
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

export const TableLineContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 70px 20px;

    @media(max-width: 900px) {
        flex-direction: column;
        gap: 100px;
    }
`