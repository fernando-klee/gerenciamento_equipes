import styled from 'styled-components'

export const Content = styled.div`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  display: flex;
  gap: 20px;
`

export const PanelsContainer = styled.div`
  display: flex;
  gap: 30px;
  height: 360px;
  padding-top: 40px;
  border-radius: 6.54639px;

  @media(max-width: 900px) {
    flex-direction: column;
  }
`

export const Container = styled.div`
  display: flex;
  flex: 1;
`

export const ContainerInput = styled.div`
  flex-direction: column;
  width: 100%;
`

export const ContainerImageLogo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

`
