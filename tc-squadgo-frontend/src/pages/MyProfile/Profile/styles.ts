import styled from 'styled-components'

import { Button } from '@chakra-ui/react'

import { Link, LinkProps } from 'react-router-dom'

export const ProfileContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;

    @media(max-width: 950px) {
        flex-direction: column;
    }
`

export const ProfileContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex: 2.5;
    gap: 20px;

    @media(max-width: 800px) {
        flex-direction: column;
        gap: 30px;
    }
`

export const ProfileFeedbacks = styled.div`
    flex: 1;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media(max-width: 820px) {
        flex-direction: column;
        justify-content: space-around;
        margin-bottom: 30px;
    }
`

export const LinkResourceFeedback = styled(Link)`
    margin-left: auto;
    color: red;
    font-size: 15px;
    font-weight: 700;
`

export const LinkToProject = styled(Link)<LinkProps>`
    width: max-content;
    padding: 7px 15px;
    margin-top: 20px;

    font-weight: 700;
    font-size: 12px;
    color: red;
    border: 1px solid red;
    border-radius: 10px;
`

export const EvolutionsContainer = styled.div`
    width: 100%;
    max-width: 300px;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-left: 50px;

    @media(max-width: 900px) {
        display: none;
    }
`

export const FeedbacksAndProjectsContainer = styled.div`
    width: 100%;
    margin-top: 20px;
    display: flex;
    gap: 20px;
    @media(max-width: 1100px) {
        flex-direction: column;
    }
`

export const SeeEvolutionButton = styled(Button)`
    display: none !important;
    @media(max-width: 900px) {
        display: inline-block !important;
    }
`