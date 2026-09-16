import styled, { css } from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px 30px;
`

export const PanelsContent = styled.div`
    margin-top: 70px;
    display: flex;
    flex-wrap: wrap;
    gap: 70px 20px;

    @media(max-width: 1200px) {
    flex-direction: column;
        gap: 100px;
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

export const AvatarContainer = styled.div`
    position: relative;
    cursor: pointer;

    &:hover {
        button:nth-child(1) {
            visibility: visible;
            opacity: 1;
        }
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

    @media(max-width: 767px) {
        margin-left: 0;
        flex-direction: column;
        align-items: start;
    }
`

export const InputDateDelete = styled.input`
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`