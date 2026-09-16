import styled from "styled-components";
import { FaUser } from "react-icons/fa";

export const PortalCard = styled.ul`
  list-style-type: none;
  margin-top: 5vh;
  flex: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding-left: 5px;
  padding-right: 5px;
  margin-right: -500px;
  .email-icon {
    margin-top: 2px;
  }

  &img {
    width: 50%;
    height: auto;
  }

  @media (max-width: 400px) {
    img {
     width: 5rem;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media screen and (min-width: 1600px) {
    li img {
      width: 45px;
    }
  }


  @media screen and (min-width: 1920px) {
    li img {
      width: 65px;
    }
  }
`;

export const Label = styled.section`
  display: flex;
  width: 7vw;
  height: 7vw;
  flex-direction: column;
  align-items: center;
  /* padding: 30px 0 30px 0; */
  justify-content: center;
  list-style-type: none;
  font-size: 20px;
  background-color: #fff;
  border-radius: 50%;
  /* margin: 15px; */
  color: #0c3661;
  /* position: relative; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    width: 100%;
  }

`;

export const Section = styled.div`
  margin-bottom: 1%;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TopIcons = styled.ul`
  list-style-type: none;
  margin-top: 5vh;
  flex: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding-left: 5px;
  padding-right: 5px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
export const BottomIcons = styled.ul`
  list-style-type: none;
  margin-top: 5vh;
  flex: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding-left: 5px;
  padding-right: 5px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TopText = styled.div`
  float: right;
  font-size: 20px;
  margin-bottom: 10px;
  margin-right: 180px;
  clear: both;

  @media screen and (min-width: 1920px) {
    margin-right: 340px;
    margin-bottom: 10px;
  }
`;

export const SocialMedias = styled.ul`
  float: right;
  margin-top: -50px;
  a + a {
    margin-left: 10px;
  }

  @media screen and (min-width: 1920px) {
    margin-top: -115px;
  }
`;

export const SocialMediaLinks = styled.div`
  float: right;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
  bottom: 15px;
  position: relative;
  clear: both;
`;

export const SocialMediaIcon = styled.img`
  width: 35px;
  margin: 0 5px;

  @media screen and (min-width: 1920px) {
    &.facebook-icon {
      margin-right: 165px;
    }
  }
`;

export const LabelSocialMedia = styled.div`
  margin: 10px;
`;

export const RecadosHeader = styled.div`
  color: #43628b;
  font-family: "Roboto";
  font-size: 18px;
  font-weight: bold;
`;

export const TopLeftImageWrapper = styled.div`
  position: absolute;
  top: 30px;
  width: 50px;
  height: auto;
  width: 11vw;
  height: 11vw;
  border-radius: 50%;
  margin-left: 5%;
  margin-top: 7%;
  background-color: #e0e0e0; 
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageUser = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export const UserIcon = styled(FaUser)`
  font-size: 5vw; 
  color: #666; 
`;

export const WelcomeText = styled.div`
  font-size: 18px;
  position: absolute;
  top: 31%;
  left: calc(11vw + 80px);
  transform: translateY(-50%);
  font-size: 33px;
  color: #142644;
  font-family: "Roboto";
  font-weight: 700;

  @media screen and (min-width: 1600px) {
    top: 25%;
    font-size: 33px;
    left: calc(11vw + 100px);
    transform: translateY(-50%);
  }

  @media screen and (min-width: 1920px) {
    top: 25%;
    font-size: 35px;
    left: calc(11vw + 115px);
    transform: translateY(-50%);
  }
`;

export const WelcomeText2 = styled.div`
  font-size: 18px;
  position: absolute;
  top: 37%;
  left: calc(11vw + 83px);
  transform: translateY(-50%);
  font-size: 19px;
  color: #142644;
  font-family: "Roboto";
  font-weight: 500;

  @media screen and (min-width: 1600px) {
    top: 30%;
    font-size: 19px;
    left: calc(11vw + 100px);
    transform: translateY(-50%);
  }

  @media screen and (min-width: 1920px) {
    top: 28%;
    font-size: 21px;
    left: calc(11vw + 115px);
    transform: translateY(-50%);
  }
`;

export const Messages = styled.div`
  float: right;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 55%;
  margin: 5% 2% 12%;
  height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #43628b;
    border-radius: 10px;
  }
`;

export const RecadosMessageBody = styled.div`
  /* margin-bottom: 20px; */
`;

export const MessageSenderImage = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 10px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const MessageDetails = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const MessageSenderName = styled.div`
  font-weight: bold;
  font-size: 15px;
  color: #2a3d56;
  margin-right: 10px;
`;

export const MessageSubject = styled.div`
  font-size: 13px;
  color: #2a3d56;
  margin-right: 10px;
`;

export const MessageText = styled.div`
  font-family: "Roboto";
  margin-top: 1px;
  margin-right: 10px;
  font-size: 13px;
`;

export const MessageHeader = styled.div`
  margin-bottom: 5px;
`;

export const MessageBody = styled.div`
  flex: 1;
`;

export const FullMessage = styled.div`
  display: flex;
  margin-top: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
`;

export const MessageMoreDetailsButton = styled.div`
  margin-top: 5px;
  color: #195eb9;
  font-size: 11px;
`;

export const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Birthdays = styled.div`
  background-color: #e3e6f7;
  float: left;
  width: 35%;
  margin: 5% 2% 12%;
  height: 300px;
  overflow-y: auto;
  border-radius: 3%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #43628b;
    border-radius: 10px;
  }
`;

export const BirthdaysTitle = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  color: #43628b;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

export const PreviousMonthButton = styled.div`
  float: left;
  margin-top: -7px;
`;

export const NextMonthButton = styled.div`
  float: right;
  margin-top: -7px;
`;

export const BirthdayPerson = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
`;

export const BirthdayPersonImage = styled.div`
  width: 50px;
  height: 50px;
  margin: 10px 5px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const BirthdayInfo = styled.div`
  margin-bottom: 5px;
`;

export const BirthdayPersonName = styled.div`
  font-weight: bold;
  font-size: 15px;
  color: #2a3d56;
  margin-bottom: 1px;
`;

export const BirthdayDate = styled.div`
  font-size: 13px;
  color: #2a3d56;
`;

export const Events = styled.div`
  background-color: #f2f2fc;
  float: left;
  width: 35%;
  margin-left: 2%;
  margin-top: -8%;
  height: 225px;
  overflow-y: auto;
  border-radius: 3%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #43628b;
    border-radius: 10px;
  }

  @media screen and (min-width: 1920px) {
    margin-top: 1%;
    margin-bottom: 5%;
  }
`;

export const EventsTitle = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 20px;
  color: #43628b;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
`;

export const EventsInfo = styled.div`
  font-size: 13px;
  color: #2a3d56;
  display: flex;
  align-items: center;
`;

export const EventDayNumber = styled.div`
  font-size: 35px;
  color: #2a3d56;
  background-color: #e3e6fa;
  margin-left: 20px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const EventDetails = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
`;

export const EventName = styled.div`
  font-weight: bold;
  font-size: 15px;
  color: #2a3d56;
  margin-bottom: 1px;
`;

export const EventLocation = styled.div`
  font-size: 13px;
  color: #2a3d56;
`;

export const UnderConstruction = styled.div`
  font-size: 13px;
  background-color: rgba(255, 255, 255, 0.995);
  width: 35%;
  height: 40%;
  position: absolute;
  border-radius: 8px;

  @media screen and (min-width: 1600px) {
    background-color: rgba(255, 255, 255, 0.995);
    height: 30%;
  }
`;

export const UnderConstructionText = styled.div`
  font-size: 20px;
  color: #2a3d56;
  margin-top: 50px;
`;

export const UnderConstructionBirthdaysText = styled.div`
  font-size: 20px;
  color: #2a3d56;
  margin-top: 50px;
  text-align: center;
`;

export const UnderConstructionMessagesText = styled.div`
  font-size: 20px;
  color: #2a3d56;
  margin-top: 50px;
  text-align: center;
`;

export const ConstructionIcons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const CenteredContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const UnderConstructionMessages = styled.div`
  background-color: rgba(255, 255, 255, 0.995);
  width: 55%;
  height: 52%;
  position: absolute;
  right: 2%;
  top: 71%;
  border-radius: 8px;

  @media screen and (min-width: 1600px) {
    background-color: rgba(255, 255, 255, 0.995);
    width: 55%;
    height: 40%;
    right: 2%;
    top: 59.5%;
  }

  @media screen and (min-width: 1920px) {
    background-color: rgba(255, 255, 255, 0.995);
    width: 55%;
    height: 30%;
    right: 2%;
    top: 59.5%;
  }
`;

export const UnderConstructionBirthdays = styled.div`
  font-size: 13px;
  background-color: rgba(255, 255, 255, 0.995);
  width: 35%;
  height: 53%;
  position: absolute;
  border-radius: 8px;

  @media screen and (min-width: 1600px) {
    background-color: rgba(255, 255, 255, 0.995);
    height: 40%;
  }

  @media screen and (min-width: 1920px) {
    background-color: rgba(255, 255, 255, 0.995);
    height: 40%;
  }
`;

export const LeaderPortrait = styled.div`
  float: right;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 15%;
  margin: 5% 0.5% 12%;
  height: 300px;
  overflow-y: auto;
`;

export const YourLeaderText = styled.div`
  color: #43628b;
  font-family: "Roboto";
  font-size: 25px;
  font-weight: bold;
  text-align: center;
`;

export const YourLeaderName = styled.div`
  font-size: 20px;
  color: #0c3661;
  text-align: center;
  margin-top: 15px;
`;

export const YourLeaderImage = styled.img`
  top: 30px;
  width: 50px;
  height: auto;
  width: 10vw;
  height: 10vw;
  border-radius: 5%;
  margin-left: 5%;
  margin-top: 7%;
`;

export const Colleagues = styled.div`
  float: right;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 35%;
  margin: 5% 1% 12%;
  height: 300px;
  overflow-y: auto;
`;

export const ProjectContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProjectDetails = styled.div`
  display: flex;
  align-items: center; /* Align items vertically */
  justify-content: flex-start; /* Align items horizontally to the left */
  width: 50%;
`;

export const ProjectImage = styled.img`
  border-radius: 8px;
  width: 5vw;
  height: 5vw;
  margin-right: 10px; /* Add margin to create space between ProjectImage and ProjectName */
`;

export const ProjectName = styled.div`
  font-size: 15px;
  color: black;
  text-align: center;
`

export const TeamContainer = styled.div`
  width: 25%;
`;

export const TeamMemberImage = styled.img`
  width: 4vw;
  height: 4vw;
  border-radius: 50%;
  margin-top: 7%;
  /* Adjustments for overlapping */
  position: relative;
  left: -3px;
  transition: transform 0.2s ease-in-out;
  &:not(:last-child) {
    margin-right: -2vw; /* Adjust as needed */
  }
  &:hover {
    transform: translateX(3px); /* Adjust as needed */
    z-index: 1;
  }
`;

export const YourTeamText = styled.div`
  color: #43628b;
  font-family: "Roboto";
  font-size: 25px;
  font-weight: bold;
  text-align: center;
`;

export const YourTeamMembers = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const Line = styled.div`
  border-bottom: 1px solid #ccc; /* Add a solid line with color #ccc */
  margin-top: 20px; /* Add margin to create space between the line and the ProjectContainer */
`;