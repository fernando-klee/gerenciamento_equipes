import styled from 'styled-components'

export const ContainerDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;
  max-width: 170px;
  position: absolute;
  top: -25px;

  background-color: #142644;
  border-radius: 12.7466px;

  @media (max-width: 1400px){
    max-width: 110px;
  }
`

export const SingleContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 270px;
  padding: 24px;
  align-items: center;
  background-color: #F2F2F2;
  border-radius: 12.7466px;

  @media (max-width: 1400px) {
    max-width: 190px;
  }
`

export const ContainerRoom = styled.div`
  display: flex;
  padding: 10px;
  background-color: #FFFFFF;
  flex-direction: row;
  flex-wrap: wrap;
  min-height: 120px;
  max-width: 200px;
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