import styled from 'styled-components'

export const PanelsContainer = styled.div`
  display: flex;
  padding: 50px 75px 24px 75px;
  border-radius: 8px;
  background: #FFFFFF;
  height: max-content;
  box-shadow: 0px 0px 51.358009338378906px 0px rgba(221, 221, 221, 0.49);
  border-radius: 6.54639px;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`

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
  max-width: 200px;
}

@media (max-width: 1280px){
  margin-bottom: 50px;
}
`

export const SingleContainerHorizontal = styled.div`
  background-color: #F2F2F2;
  padding: 24px;
  border-radius: 12.7466px;
`


export const ContainerColumns = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #fff;
 
  @media (max-width: 1280px){
    justify-content: space-around;
    flex-wrap: wrap;
  }
`
export const ContainerForecast = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  background-color: blue;
 
`

export const BoxLeader = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #C3C5C9;
  border-radius: 10px;
  min-width: 215.38px;
  padding-top: 20px;
  padding-bottom: 20px;
  min-height: 118.81px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`
export const BoxObs = styled.div`
  display: flex;
  background-color: #F2F2F2;
  flex-direction: column;
  border: 1px solid #C3C5C9;
  border-radius: 10px;
  min-width: 215.38px;
  padding-top: 20px;
  padding-bottom: 20px;
  min-height: 118.81px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
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

export const ContainerDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #142644;
  width: 60%;
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

export const ContainerDayHorizontal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #142644;
  width: 100%;
  max-width: 160px;
  min-height: 40px;
  height: 100%;
  max-height: 40px;
  border-radius: 12.7466px;
  position: relative;
  left: 30px;
  top: 20px;
`

export const ContainerLeaderHorizontal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #142644;
  width: 100%;
  max-width: 180px;
  min-height: 40px;
  height: 100%;
  max-height: 40px;
  border-radius: 13px;
  position: relative;
  right: 30px;
  top: 20px;
`

export const BottomTableInput = styled.div`
  border: 1px solid #EBEBEB;
  margin-right: 2px;
  margin-bottom: 15px;
  width: 100%;
`

export const SearchButtonContainer = styled.div`
  display: flex;
  width: 190px;

  @media(max-width: 900px) {
    width: 150px;
  }
`