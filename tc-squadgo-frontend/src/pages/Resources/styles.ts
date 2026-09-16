import styled, { css, keyframes } from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px 30px;
`

export const FiltersContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    @media(max-width: 767px) {
        align-items: start;
        flex-direction: column;
    }
`

export const FiltersContainerLeft = styled.div`
    display: flex;
    margin-left: auto;
    align-items: center;
    gap: 10px;
    flex-wrap: nowrap;

    width: 60%;

    .chakra-form-control {
        width: 40%;
    }

    @media (max-width: 1200px) { 
       flex-wrap: wrap; 

        & > label:has(input[type="checkbox"]) { 
            margin-left: auto; 
            min-width: fit-content; 
        }

        & > *:not(label:has(input[type="checkbox"])) {
            flex: 1;
            min-width: 200px;
        }
    }

    @media(max-width: 767px) {
        margin-left: 0;
        flex-direction: column;
        align-items: start;
    }
`

export const FilterClassification = styled.div`
    display: flex;
    margin-left: auto;
    align-items: center;
    gap: 10px;

    @media(max-width: 767px) {
        align-items: start;
        margin-left: 0;
        flex-direction: column;
    }
`

export const PanelsContent = styled.div`
    margin-top: 70px;
    display: flex;
    flex-wrap: wrap;
    gap: 70px 20px;

    @media(max-width: 900px) {
        flex-direction: column;
        gap: 100px;
    }
`

export const TableLineContainer = styled.div`
    width: 100%;
    display: flexbox;
    gap: 70px 20px;

    @media(max-width: 800px) {
        display: flex;
        flex-direction: column;
    }
`

interface BoxFilterListProps {
    $selected?: boolean
}

export const BoxFilterList = styled.div<BoxFilterListProps>`
    width: 100px;
    height: 50px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;

    box-shadow: ${({ $selected }) => $selected ? `2px 2px 4px rgba(0, 0, 0, 0.2)` : 'none'};

    border-radius: 8px;
    transition: 0.15s;

    cursor: pointer;

    :hover {
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }
`

export const ResourceColumn = styled.div<any>`
    display: flex;
    align-items: center;
    flex: 1;
    ${props => props.flex && css`
        flex: ${props.flex};
    `};
    gap: 10px;
`

export const EditResourceButton = styled.button`
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

const testar = keyframes`
    from {
        opacity: 1;
        top: -8px;
    }

    to {
        opacity: 0;
        top: -20px;
    }
`

export const TesteContainer = styled.div`
    position: relative;
`

export const Renderizou = styled.span`
    position: absolute;
    animation: ${testar} 0.9s forwards;
`