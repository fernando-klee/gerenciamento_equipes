import {
  Button,
  Flex,
  Link,
  Text,
  textDecoration,
  Tooltip,
} from "@chakra-ui/react";
import Header from "../../components/Header";

import * as S from "./styles";
import { HasPermission } from "../../components/HasPermission";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { FaHardHat } from "react-icons/fa";

function Portal() {
  const userInfo = useAuth();
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  let [userTruePhoto, setUserTruePhoto] = useState<string>("");
  let [userTrueName, setUserTrueName] = useState<string>("");
  let [leaderPhoto, setLeaderPhoto] = useState<string | null>(null);
  let [leaderName, setLeaderName] = useState<string | null>(null);
  let [userLeaderId, setUserLeaderId] = useState<string>("");
  let [isLoggedUserLeader, setisLoggedUserLeader] = useState<Boolean>(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(11); // Initial month index is December

  const [projectsData, setProjectsData] = useState<any[]>([]);

  const handleChangeMonth = (increment: number) => {
    const newMonthIndex = (currentMonthIndex + increment + 12) % 12;
    setCurrentMonthIndex(newMonthIndex);
  };

  useEffect(() => {
    async function getLeaderData() {
      try {
        const response = await api.get(
          `/resources/leader-project-resources/${userLeaderId}`
        );
        const getLeaderName = response.data[0].leader.name;
        const getLeaderPhoto = response.data[0].leader.photo_url;
        setLeaderName(getLeaderName);
        setLeaderPhoto(getLeaderPhoto);
      } catch (error) {
        console.error(error);
      }
    }

    getLeaderData();
  }, [userLeaderId]);

  useEffect(() => {
    async function getProjectData() {
      try {
        const response = await api.get(
          `/resources/leader-project-resources/${userLeaderId}`
        );

        const { leader, projects } = response.data[0];

        if (!leader || !projects) {
          console.error("Leader or project data not found");
          return;
        }

        let formattedProjects;

        if (isLoggedUserLeader) {
          formattedProjects = projects.map(
            (proj: {
              id: any;
              name: any;
              image_url: any;
              project_resources: any[];
            }) => ({
              id: proj.id,
              name: proj.name,
              image_url: proj.image_url,
              teamMembers: proj.project_resources.map(
                (resource: { photo_url: any }) => resource.photo_url
              ),
            })
          );
        } else {
          formattedProjects = projects
            .filter((proj: { project_resources: any[] }) =>
              proj.project_resources.some(
                (resource: { id: number }) => resource.id === userInfo.user.id
              )
            )
            .map(
              (proj: {
                id: any;
                name: any;
                image_url: any;
                project_resources: any[];
              }) => ({
                id: proj.id,
                name: proj.name,
                image_url: proj.image_url,
                teamMembers: proj.project_resources.map(
                  (resource: { photo_url: any }) => resource.photo_url
                ),
              })
            );
        }

        setProjectsData(formattedProjects);

        const name = leader.name || "Unknown Leader";
        setLeaderName(name);
      } catch (error) {
        console.error(error);
      }
    }
    getProjectData();
  }, [userLeaderId, userInfo.user.id, isLoggedUserLeader]);

  async function fetchUserPhoto() {
    try {
      const userApiData = await api.get(`/resources/${userInfo.user.id}`);
      const userPhotoUrl = userApiData.data.photo_url;

      return userPhotoUrl;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function getUserPhoto() {
      try {
        const photoUrl = await fetchUserPhoto();
        setUserTruePhoto(photoUrl);
      } catch (error) {
        console.error(error);
      }
    }

    getUserPhoto();
  }, [userInfo.user.id]);

  useEffect(() => {
    async function fetchData() {
      try {
        const userApiData = await api.get(`/resources/${userInfo.user.id}`);
        const leaderId = userApiData.data.leader_id;
        const userPhotoUrl = userApiData.data.photo_url;
        const userName = userApiData.data.name;
        const nameWords = userName.split(" ");
        const firstName = nameWords[0];
        const userLeaderStatus = userApiData.data.leader;
        setisLoggedUserLeader(userLeaderStatus);
        setUserTruePhoto(userPhotoUrl);
        setUserTrueName(firstName);
        setUserLeaderId(leaderId);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [userInfo.user.id]);

  return (
    <>
      <Header buttons={[]} />
      <Flex
        backgroundColor="#f8f9fb"
        height="90%"
        width="95%"
        alignItems="flex-end"
        justifyContent="flex-start"
        flexDir={"column"}
        position={"relative"}
        style={{ borderRadius: "30px", margin: "0 auto" }}
      >
        <S.Container
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            width: "100%",
            padding: "1rem",
          }}
        >
          <Flex
            style={{
              padding: "2rem",
              flexDirection: "column",
            }}
          >
            <img
              src={userTruePhoto}
              alt="Foto do colaborador"
              style={{
                borderRadius: "50%",
                width: "8vw",
                borderStyle: "solid",
                borderColor: "rgb(229 231 235)",
                borderWidth: "1px",
                height: "8vw",
                marginRight: "10px",
                marginTop: "10px",
              }}
              onError={(event) => {
                event.currentTarget.src =
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
              }}
            />
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#2a3d56",
                margin: "30px 0 0 30px",
              }}
            >
              Olá, {userTrueName}! <br /> Para onde você quer ir?
            </p>
          </Flex>
          <S.Section>
            <S.PortalCard
              style={{
                display: "grid",
                gap: "10px",
                width: "100%",
                padding: "1rem",
                marginTop: "0rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  marginTop: "20px",
                  marginBottom: "20px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                <HasPermission permissions={["view_email_app"]}>
                  <Tooltip
                    hasArrow
                    label={"Email"}
                    fontWeight={100}
                    bg="#43628B"
                  >
                    <li>
                      {/* E-MAIL */}
                      <a
                        href="https://outlook.office.com/mail/"
                        target="_blank"
                        style={{ textDecoration: "none", outline: "none" }}
                      >
                        <S.Label>
                          <img
                            src="https://i.imgur.com/ZHcbiX0.png"
                            alt="email icon"
                            className="email-icon"
                          />
                        </S.Label>
                      </a>
                    </li>
                  </Tooltip>
                </HasPermission>
                <HasPermission permissions={["view_discord_app"]}>
                <Tooltip
                    hasArrow
                    label={"Discord"}
                    fontWeight={100}
                    bg="#43628B"
                  >
                  <li>
                    {/* TEAMS */}
                    <a
                      href="https://teams.microsoft.com/l/team/19:Lraz45SGVWZnPpIUxUOU6Ik1zecEgM5Qqm_699LUtS81%40thread.tacv2/conversations?groupId=a5e908c8-92c9-47a4-9687-3bb3a418a2f9&tenantId=b01d15be-92a2-418d-8ab3-5322b51a04be"
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <S.Label>
                        <img
                          src="https://imgur.com/a/bPyYXor"
                          alt="teams icon"
                          className="discord-icon"
                        />
                      </S.Label>
                    </a>
                  </li>
                  </Tooltip>
                </HasPermission>
                <HasPermission permissions={["view_whatsapp_app"]}>
                <Tooltip
                    hasArrow
                    label={"WhatsApp"}
                    fontWeight={100}
                    bg="#43628B"
                  >
                  <li>
                    {/* WHATSAPP */}
                    <a
                      href="https://chat.whatsapp.com/8x4qKhEbnYs9uFsJt0vbSt"
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <S.Label>
                        <img
                          src="https://i.imgur.com/LiUIA2j.png"
                          alt="whatsapp icon"
                          width={40}
                          className="whatsapp-icon"
                        />
                      </S.Label>
                    </a>
                  </li>
                  </Tooltip>
                </HasPermission>
                {/* <HasPermission permissions={['view_ideias_app']}> */}
                {/* <li> */}
                {/* IDEIAS */}
                {/* <a href="https://ideias.testingcompany.com.br/" target="_blank" style={{ textDecoration: 'none' }}> */}
                {/* <S.Label>
                                            </S.Label> */}
                {/* </a> */}
                {/* </li> */}
                {/* </HasPermission> */}
                <HasPermission permissions={["view_ponto_app"]}>
                <Tooltip
                    hasArrow
                    label={"Sistema de Ponto"}
                    fontWeight={100}
                    bg="#43628B"
                  >
                  <li>
                    {/* PONTO */}
                    <a
                      href="https://ponto.testingcompany.com.br/"
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <S.Label>
                        <img
                          src="https://i.imgur.com/QIZK87O.png"
                          alt="ponto icon"
                          width={40}
                          className="ponto-icon"
                        />
                      </S.Label>
                    </a>
                  </li>
                  </Tooltip>
                </HasPermission>
              </div>
              {/* <S.BottomIcons> */}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  marginTop: "20px",
                  marginBottom: "20px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                <HasPermission permissions={["view_rh_app"]}>
                <Tooltip
                    hasArrow
                    label={"Sistema de RH"}
                    fontWeight={100}
                    bg="#43628B"
                  >
                  <li>
                  
                    {/* RH */}
                    <a
                      href="https://rh-prod.testingcompany.com.br/"
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <S.Label>
                        <img
                          src="https://i.imgur.com/HZeECiS.png"
                          alt="RH icon"
                          className="rh-icon"
                        />
                      </S.Label>
                    </a>
                  </li>
                  </Tooltip>
                </HasPermission>
                <HasPermission permissions={["view_doc_app"]}>
                <Tooltip
                    hasArrow
                    label={"Documentação/Agile"}
                    fontWeight={100}
                    bg="#43628B"
                  >
                  <li>
                    {/* DOCUMENTAÇÃO */}
                    <a
                      href="https://documentacao.testingcompany.com.br/"
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <S.Label>
                        <img
                          src="https://i.imgur.com/3HZDwTc.png"
                          alt="documentação icon"
                          className="doc-icon"
                        />
                      </S.Label>
                    </a>
                  </li>
                  </Tooltip>
                </HasPermission>
                <HasPermission permissions={["view_quali_app"]}>
                <Tooltip
                    hasArrow
                    label={"QualiGO"}
                    fontWeight={100}
                    bg="#43628B"
                  >
                  <li>
                    {/* QUALIGO */}
                    <a
                      href="https://app.testingcompany.com.br/"
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <S.Label>
                        <img
                          src="https://i.imgur.com/wOhDTe6.png"
                          alt="Qualigo icon"
                          className="quali-icon"
                        />
                      </S.Label>
                    </a>
                  </li>
                  </Tooltip>
                </HasPermission>
                <HasPermission permissions={["view_farm_app"]}>
                <Tooltip
                    hasArrow
                    label={"Farm"}
                    fontWeight={100}
                    bg="#43628B"
                  >
                  <li>
                    {/* FARM */}
                    <a
                      href="http://farm.testingcompany.com.br/"
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <S.Label>
                        <img
                          src="https://i.imgur.com/D9pDXK7.png"
                          alt="farm icon"
                          width={40}
                        />
                      </S.Label>
                    </a>
                  </li>
                  </Tooltip>
                </HasPermission>
                <HasPermission permissions={["view_farm_app"]}>
                <Tooltip
                    hasArrow
                    label={"League"}
                    fontWeight={100}
                    bg="#43628B"
                  >
                  <li>
                    {/* LEAGUE */}
                    <a
                      href="https://ideias.testingcompany.com.br/"
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <S.Label>
                        <img
                          src="https://i.imgur.com/3CFQS2w.png"
                          alt="league"
                          width={33}
                          className="league-icon"
                        />
                      </S.Label>
                    </a>
                  </li>
                  </Tooltip>
                </HasPermission>
              </div>
            </S.PortalCard>

            {/* <S.Messages>
                            <S.UnderConstructionMessages>
                                <S.UnderConstructionMessagesText>Em construção</S.UnderConstructionMessagesText>
                                <S.ConstructionIcons>
                                    <FaHardHat size={50} color='#2a3d56' />
                                </S.ConstructionIcons>
                            </S.UnderConstructionMessages>
                            <S.RecadosHeader>Recados</S.RecadosHeader>

                            <S.RecadosMessageBody>
                                <S.FullMessage>
                                    <S.MessageSenderImage>
                                        <img src="src\assets\f9ec12b186c705a8cec5_Diego.jpg" alt="Photo" />
                                    </S.MessageSenderImage>
                                    <S.MessageDetails>
                                        <S.MessageHeader>
                                            <S.MessageSenderName>Diego Pinheiro</S.MessageSenderName>
                                            <S.MessageSubject>Detetização</S.MessageSubject>
                                        </S.MessageHeader>
                                        <S.MessageBody>
                                            <S.MessageText>
                                                Boa tarde pessoal! @everyone Estou passando para avisar que na sexta-feira (10/11), a TC passará por uma dedetização. Portanto...
                                            </S.MessageText>
                                        </S.MessageBody>
                                        <a href="#" target="_blank">
                                            <S.MessageMoreDetailsButton>Ler Mais</S.MessageMoreDetailsButton>
                                        </a>
                                    </S.MessageDetails>
                                </S.FullMessage> */}
            {/* segunda mensagem */}
            {/* <S.FullMessage>
                                    <S.MessageSenderImage>
                                        <img src="src\assets\f9ec12b186c705a8cec5_Diego.jpg" alt="Photo" />
                                    </S.MessageSenderImage>
                                    <S.MessageDetails>
                                        <S.MessageHeader>
                                            <S.MessageSenderName>Diego Pinheiro</S.MessageSenderName>
                                            <S.MessageSubject>Detetização</S.MessageSubject>
                                        </S.MessageHeader>
                                        <S.MessageBody>
                                            <S.MessageText>
                                                Boa tarde pessoal! @everyone Estou passando para avisar que na sexta-feira (10/11), a TC passará por uma dedetização. Portanto...
                                            </S.MessageText>
                                        </S.MessageBody>
                                        <a href="#" target="_blank">
                                            <S.MessageMoreDetailsButton>Ler Mais</S.MessageMoreDetailsButton>
                                        </a>
                                    </S.MessageDetails>
                                </S.FullMessage> */}
            {/* terceira mensagem */}
            {/* <S.FullMessage>
                                    <S.MessageSenderImage>
                                        <img src="src\assets\f9ec12b186c705a8cec5_Diego.jpg" alt="Photo" />
                                    </S.MessageSenderImage>
                                    <S.MessageDetails>
                                        <S.MessageHeader>
                                            <S.MessageSenderName>Diego Pinheiro</S.MessageSenderName>
                                            <S.MessageSubject>Detetização</S.MessageSubject>
                                        </S.MessageHeader>
                                        <S.MessageBody>
                                            <S.MessageText>
                                                Boa tarde pessoal! @everyone Estou passando para avisar que na sexta-feira (10/11), a TC passará por uma dedetização. Portanto...
                                            </S.MessageText>
                                        </S.MessageBody>
                                        <a href="#" target="_blank">
                                            <S.MessageMoreDetailsButton>Ler Mais</S.MessageMoreDetailsButton>
                                        </a>
                                    </S.MessageDetails>
                                </S.FullMessage> */}
            {/* quarta mensagem */}
            {/* <S.FullMessage>
                                    <S.MessageSenderImage>
                                        <img src="src\assets\f9ec12b186c705a8cec5_Diego.jpg" alt="Photo" />
                                    </S.MessageSenderImage>
                                    <S.MessageDetails>
                                        <S.MessageHeader>
                                            <S.MessageSenderName>Diego Pinheiro</S.MessageSenderName>
                                            <S.MessageSubject>Detetização</S.MessageSubject>
                                        </S.MessageHeader>
                                        <S.MessageBody>
                                            <S.MessageText>
                                                Boa tarde pessoal! @everyone Estou passando para avisar que na sexta-feira (10/11), a TC passará por uma dedetização. Portanto...
                                            </S.MessageText>
                                        </S.MessageBody>
                                        <a href="#" target="_blank">
                                            <S.MessageMoreDetailsButton>Ler Mais</S.MessageMoreDetailsButton>
                                        </a>
                                    </S.MessageDetails>
                                </S.FullMessage> */}
            {/* quinta mensagem */}
            {/* <S.FullMessage>
                                    <S.MessageSenderImage>
                                        <img src="src\assets\f9ec12b186c705a8cec5_Diego.jpg" alt="Photo" />
                                    </S.MessageSenderImage>
                                    <S.MessageDetails>
                                        <S.MessageHeader>
                                            <S.MessageSenderName>Diego Pinheiro</S.MessageSenderName>
                                            <S.MessageSubject>Detetização</S.MessageSubject>
                                        </S.MessageHeader>
                                        <S.MessageBody>
                                            <S.MessageText>
                                                Boa tarde pessoal! @everyone Estou passando para avisar que na sexta-feira (10/11), a TC passará por uma dedetização. Portanto...
                                            </S.MessageText>
                                        </S.MessageBody>
                                        <a href="#" target="_blank">
                                            <S.MessageMoreDetailsButton>Ler Mais</S.MessageMoreDetailsButton>
                                        </a>
                                    </S.MessageDetails>
                                </S.FullMessage> */}
            {/* </S.RecadosMessageBody>
                        </S.Messages> */}

            {/* <S.Birthdays>
                            <S.UnderConstructionBirthdays>
                                <S.UnderConstructionBirthdaysText>Em construção</S.UnderConstructionBirthdaysText>
                                <S.ConstructionIcons>
                                    <FaHardHat size={50} color='#2a3d56' />
                                </S.ConstructionIcons>
                            </S.UnderConstructionBirthdays>
                            <S.BirthdaysTitle> */}
            {/* <S.PreviousMonthButton>
                                    <Button variant="unstyled" onClick={() => handleChangeMonth(-1)}>&lt;</Button>
                                </S.PreviousMonthButton> */}
            {/* {`Aniversariantes de ${months[currentMonthIndex]}`} */}
            {/* <S.NextMonthButton>
                                    <Button variant="unstyled" onClick={() => handleChangeMonth(1)}>&gt;</Button>
                                </S.NextMonthButton> */}
            {/* </S.BirthdaysTitle> */}
            {/* <S.BirthdayPerson>
                                <S.BirthdayPersonImage>
                                    <img src="src\assets\f9ec12b186c705a8cec5_Diego.jpg" alt="Photo" />
                                </S.BirthdayPersonImage>
                                <S.BirthdayInfo>
                                    <S.BirthdayPersonName>Diego Pinheiro</S.BirthdayPersonName>
                                    <S.BirthdayDate>12/12/1222</S.BirthdayDate>
                                </S.BirthdayInfo>
                            </S.BirthdayPerson> */}
            {/* <S.BirthdayPerson>
                                <S.BirthdayPersonImage>
                                    <img src="src\assets\f9ec12b186c705a8cec5_Diego.jpg" alt="Photo" />
                                </S.BirthdayPersonImage>
                                <S.BirthdayInfo>
                                    <S.BirthdayPersonName>Diego Pinheiro</S.BirthdayPersonName>
                                    <S.BirthdayDate>12/12/1222</S.BirthdayDate>
                                </S.BirthdayInfo>
                            </S.BirthdayPerson>
                            <S.BirthdayPerson>
                                <S.BirthdayPersonImage>
                                    <img src="src\assets\f9ec12b186c705a8cec5_Diego.jpg" alt="Photo" />
                                </S.BirthdayPersonImage>
                                <S.BirthdayInfo>
                                    <S.BirthdayPersonName>Diego Pinheiro</S.BirthdayPersonName>
                                    <S.BirthdayDate>12/12/1222</S.BirthdayDate>
                                </S.BirthdayInfo>
                            </S.BirthdayPerson>
                            <S.BirthdayPerson>
                                <S.BirthdayPersonImage>
                                    <img src="src\assets\f9ec12b186c705a8cec5_Diego.jpg" alt="Photo" />
                                </S.BirthdayPersonImage>
                                <S.BirthdayInfo>
                                    <S.BirthdayPersonName>Diego Pinheiro</S.BirthdayPersonName>
                                    <S.BirthdayDate>12/12/1222</S.BirthdayDate>
                                </S.BirthdayInfo>
                            </S.BirthdayPerson> */}
            {/* </S.Birthdays> */}

            {/* <S.Events>
                            <S.CenteredContainer>
                                <S.UnderConstruction>
                                    <S.UnderConstructionText>Em construção</S.UnderConstructionText>
                                    <S.ConstructionIcons>
                                        <FaHardHat size={50} color='#2a3d56' />
                                         <FaToolbox size={50} color='#2a3d56' /> 
                                    </S.ConstructionIcons>
                                </S.UnderConstruction>
                                <S.EventsTitle>Eventos</S.EventsTitle>
                                <S.EventsInfo>
                                    <S.EventDayNumber>15</S.EventDayNumber>
                                    <S.EventDetails>
                                        <S.EventName>Confraternização fim de ano</S.EventName>
                                        <S.EventLocation>Quinta da Estância</S.EventLocation>
                                    </S.EventDetails>
                                </S.EventsInfo>
                            </S.CenteredContainer>
                        </S.Events> */}
          </S.Section>

          <S.Colleagues
            style={{
              width: "100%",
              margin: "0",
            }}
          >
            <S.YourTeamText>Seu Time</S.YourTeamText>
            {projectsData.map((project, index) => (
              <div key={index}>
                <S.ProjectContainer>
                  <S.ProjectDetails>
                    <S.ProjectImage
                      src={project.image_url}
                      alt="Foto do projeto"
                    />
                    <S.ProjectName>{project.name}</S.ProjectName>
                  </S.ProjectDetails>
                  <S.TeamContainer>
                    <S.YourTeamMembers>
                      {project.teamMembers.map(
                        (memberPhoto: string, memberIndex: number) => (
                          <S.TeamMemberImage
                            key={memberIndex}
                            src={memberPhoto}
                            alt="Foto do time"
                          />
                        )
                      )}
                    </S.YourTeamMembers>
                  </S.TeamContainer>
                </S.ProjectContainer>
                {index !== projectsData.length - 1 && <S.Line />}
              </div>
            ))}
          </S.Colleagues>

          <S.LeaderPortrait
            style={{
              width: "100%",
              margin: "0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <S.YourLeaderText>Seu Líder</S.YourLeaderText>
            <img
              style={{
                width: "25%",
                height: "auto",
                margin: "auto",
                borderRadius: "50%",
              }}
              src={leaderPhoto ?? ""}
              alt="Foto do líder"
              onError={(event) => {
                event.currentTarget.src =
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
              }}
            />
            <S.YourLeaderName>
              {leaderName ? leaderName : "Sem líder direto."}
            </S.YourLeaderName>
          </S.LeaderPortrait>
        </S.Container>
      </Flex>
    </>
  );
}

export default Portal;
