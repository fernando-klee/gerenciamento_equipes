import styled, { css } from 'styled-components'

interface FeedbackTypeProps {
    isSelected?: boolean
}

export const Container = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;

    @media(max-width: 767px) {
        flex-direction: column;
    }
`

export const CreateButtonContainer = styled.div`
    position: absolute;
    top: -285px;
    left: 110px;
    z-index: 1;

    @media(max-width: 899px) {
        left: 180px;
        /* background-color: orange; */
    }

    @media(max-width: 785px) {
        top: -85px;
        left: 170px;
    }
`

export const FeedbacksList = styled.div`
    display: flex;
    gap: 30px;

    @media(max-width: 767px) {
        flex-direction: column;
    }
`

export const FeedbackType = styled.button<FeedbackTypeProps>`
    height: 80px;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 15px;
    border-radius: 9px;
    gap: 15px;

    ${props => props.isSelected && css`
        background: rgb(203, 3, 73);
        box-shadow: rgb(158 0 0 / 48%) 0px 2px 5px 1px;
        p,span {
            color: #fff;
        }
    `}

    &:hover {
        background: rgb(203, 3, 73);
        box-shadow: rgb(158 0 0 / 48%) 0px 2px 5px 1px;
        p,span {
            color: #fff;
        }
    }
`