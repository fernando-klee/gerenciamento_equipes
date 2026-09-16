import styled from 'styled-components'


export const ContainerRoom = styled.div`
  display: flex;
  padding: 10px;
  background-color: #FFFFFF;
  flex-direction: row;
  flex-wrap: wrap;
  min-height: 120px;
  width: 200px;
  /* max-width: 200px; */
  align-items: center;
  justify-content: center;
  box-shadow: 0px 5.09863px 5.09863px rgba(0, 0, 0, 0.1);
  border-radius: 6.37329px;

  gap: 5px;
`

export const ContainerIcon = styled.div`
  display: flex;
  width: 110px;
  max-height: 70px;
  background-repeat: repeat-x;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  
  @media (max-width: 900px) {
    width: 80%;
  }
  `