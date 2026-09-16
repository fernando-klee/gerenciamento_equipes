import styled from 'styled-components'

export const PanelsContainer = styled.div`
  display: flex;
  gap: 30px;

  @media(max-width: 900px) {
    flex-direction: column;
  }
`

export const PanelContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 30px;

  @media(max-width: 900px) {
    width: 100%;
  }
`

export const Panel = styled.div`
  height: 'max-content';
  position: relative;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px 1px rgba(0,0,0,0.35);

  @media(max-width: 900px) {
    width: 100%;
  }
`

export const TopPanel = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: flex-start;
  padding: 15px;
  background: #fff;
  overflow: hidden;
  border-radius: 6px;
  box-shadow: 0px 0px 51.358009338378906px 0px rgba(221, 221, 221, 0.49);
  flex-wrap: wrap;
  height: auto;
  padding-left: 20px;
  padding-right: 36px;

  @media(max-width: 700px) {
    flex: none;
    width: 100%;
  }
`

export const SearchButtonContainer = styled.div`
  width: 260px;

  @media(max-width: 900px) {
    width: 150px;
  }
`

export const ContainerTop = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 20px;
  max-height: 400px;
  min-width: 240px;
  border-right: 0.81px solid #EBEBEB;
  &:last-child{
    border: none;
  }

  @media(max-width: 1060px) {
    margin-bottom: 50px;
    width: 100%;
    flex-direction: column;
    max-height: 300px;
  }
`

export const BorderPopover = styled.div`
  border: 0.25px solid rgba(232, 236, 241, 1);
  margin-top: 7px;
`

export const BottomTableInput = styled.div`
  border: 1px solid #EBEBEB;
  margin-left: 15px;
  margin-right: 21px;
  margin-bottom: 15px;
`

export const OverPlannedRelease = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 275px ;
  overflow-y: auto;
  overflow-x: hidden;

::-webkit-scrollbar {
    width: 5px;
    height: 30px;
}

::-webkit-scrollbar-track {
  background: rgba(239, 239, 239, 1);
  border: 4px solid rgba(239, 239, 239, 1);
  border-radius: 15px;
}

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(204, 204, 204, 1);
    border: 4px solid rgba(204, 204, 204, 1)
}
`

export const ContainerPlannedRelease = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
`
