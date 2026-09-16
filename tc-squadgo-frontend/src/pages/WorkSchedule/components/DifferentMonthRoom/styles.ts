import styled from 'styled-components'

export const SingleContainer = styled.div`
display: flex;
flex-direction: column;
max-width: 220px;
width: 100%;
padding: 24px;
align-items: center;
background-color: #F2F2F2;
border-radius: 12.7466px;

@media (max-width: 1630px) {
  max-width: 170px;
}

@media (max-width: 1280px){
  margin-bottom: 50px;
}
`

export const ContainerDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #142644;
  width: 80%;
  min-width: 50px;
  min-height: 40px;
  height: 100%;
  max-height: 40px;
  border-radius: 12.7466px;
  position: relative;
  bottom: 45px;
  margin-bottom: -25px;
  
  @media (max-width: 900px) {
    bottom: 30px;
    width: 70%;
    margin-bottom: -20px;
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