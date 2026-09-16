import styled from 'styled-components'

export const ChartLine = styled.div`
    display: flex;
    width: 100%;
    min-width: 0;

    gap: 30px;
    @media(max-width: 767px) {
        flex-direction: column;
    }
`
export const StyledTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #000000;
  font-family: 'Roboto', sans-serif;
  margin-top: 42px;
  align-self: flex-start;
  margin-left: 37px;
`;
