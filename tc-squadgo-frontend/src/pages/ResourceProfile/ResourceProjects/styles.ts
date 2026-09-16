import styled from 'styled-components'

export const ProjectActionButton = styled.button`
    width: 30px;
    height: 30px;

    border-radius: 50%;
    transition: all 0.2s;

    &:hover {
        background: #ccc;
    }

    & > span {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

export const ProjectCardFooter = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    @media(max-width: 500px) {
        align-self: flex-start;
        flex-direction: column;
        gap: 10px;

        div:nth-child(2) {
            align-items: center;

            div {
                align-items: center;
                justify-content: space-between;
            }
        }
    }
`