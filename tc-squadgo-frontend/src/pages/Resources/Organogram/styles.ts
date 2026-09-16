import styled, { css } from 'styled-components'

import { Link, LinkProps } from 'react-router-dom'

interface SkillContentProps {
    isEnabled: boolean
}

export const SkillChartsContainer = styled.div`
    width: 100%;
    display: flex;

    margin-top: -80px;

    flex-direction: column;
`

export const ProfileContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex: 2.5;
    gap: 20px;

    @media(max-width: 700px) {
        flex-direction: column;
        gap: 30px;
    }
`

export const ProfileFeedbacks = styled.div`
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    flex: 0.8;
    align-items: center;
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

export const SkillContent = styled.div<SkillContentProps>`
    /* width: 100%;
    padding: 10px;
    display: flex;
    gap: 10px;

    border-radius: 10px;

    ${props => props.isEnabled && css`
        background: #e7e7e7;
    `} */
`