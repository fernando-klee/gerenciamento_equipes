import styled from 'styled-components'

export const OneOnOneType = styled.div<{ isSelected: boolean }>`
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px;
    border-radius: 10px;
    background-color: ${props => props.isSelected ? '#F7F7F7' : '#fff'};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border: 1px solid ${props => props.isSelected ? '#254568' : 'transparent'};

    &:hover {
        background-color: #F7F7F7;
    }
`

export const NotesContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    height: 100%;
    overflow-y: auto;
    padding-right: 10px;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`

export const OneOnOneCard = styled.div`
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    height: 150px;
    min-height: 150px;
    max-height: 150px;
    display: flex;
    flex-direction: column;

    > div:first-child {
        flex-shrink: 0;
    }

    > p:last-child {
        flex: 1;
        overflow-y: auto;
        margin-top: 10px;
        padding-right: 10px;
        min-height: 0;
        height: 100%;

        &::-webkit-scrollbar {
            width: 6px;
        }

        &::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
        }

        &::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 3px;
        }

        &::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
    }
` 