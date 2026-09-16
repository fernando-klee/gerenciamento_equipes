import { useRef, useState } from "react";

import { MdDashboard } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsPersonFill, BsFileEarmarkBarGraphFill } from "react-icons/bs";
import { RiFileList3Line } from "react-icons/ri";
import { BiWindows } from "react-icons/bi";
import { IoRocketOutline } from "react-icons/io5";

import { Button } from "@chakra-ui/react";

import useOutsideClick from "../OutsideClick";
import * as S from "./styles";
import { HasPermission } from "../HasPermission";

import visaoGeral from "../../assets/visaogeral.svg";
import clientes from "../../assets/clientes.svg";
import colaboradores from "../../assets/colaboradores.svg";
import dashboard from "../../assets/dashboard.svg";
import escalas from "../../assets/escalas.svg";
import portal from "../../assets/logoPortal.svg";
import projetos from "../../assets/projetos.svg";
import skills from "../../assets/skills.svg";
import logoCompleta from "../../assets/logo_completa.svg";

const MobileSidebar: React.FC = () => {
  const [mobileVisible, setMobileVisible] = useState(false);
  const ref = useRef<any>(false);

  useOutsideClick(ref, () => {
    setMobileVisible(false);
  });

  return (
    <S.Container ref={ref}>
      <S.ResponsibleContainer>
        <Button
          backgroundColor={"transparent"}
          color={"white"}
          marginRight="5px"
          onClick={() => setMobileVisible(true)}
        >
          <GiHamburgerMenu size="25px" />
        </Button>
        <S.Content mobileVisible={mobileVisible}>
          <S.Header>
            <img
              width="130px"
              height="150px"
              src={logoCompleta}
              alt="Icone do menu"
            />
          </S.Header>
          <S.Body>
            <S.MenuList>
              <S.Item to="/" onClick={() => setMobileVisible(false)}>
                <S.IconContainer>
                  <img
                    width="25px"
                    height="25px"
                    className="logoIcon"
                    src={portal}
                    alt="Icone de visão geral"
                  />
                </S.IconContainer>
                <span>Portal</span>
              </S.Item>
              <HasPermission permissions={["view_geral_vision"]}>
                <S.Item
                  to="/visao-geral"
                  onClick={() => setMobileVisible(false)}
                >
                  <S.IconContainer>
                    <img
                      width="25px"
                      height="25px"
                      className="logoIcon"
                      src={visaoGeral}
                      alt="Icone de visão geral"
                    />
                  </S.IconContainer>
                  <span>Visão Geral</span>
                </S.Item>
              </HasPermission>
              <HasPermission permissions={["view_dashboard_menu"]}>
                <S.Item to="/dashboard" onClick={() => setMobileVisible(false)}>
                  <S.IconContainer>
                    <img
                      width="25px"
                      height="25px"
                      className="logoIcon"
                      src={dashboard}
                      alt="Icone de dashboard"
                    />
                  </S.IconContainer>
                  <span>Dashboard</span>
                </S.Item>
              </HasPermission>
              <HasPermission
                permissions={[
                  "view_projects",
                  "create_project",
                  "update_project",
                ]}
              >
                <S.Item to="/projetos" onClick={() => setMobileVisible(false)}>
                  <S.IconContainer>
                    <img
                      width="25px"
                      height="25px"
                      className="logoIcon"
                      src={projetos}
                      alt="Icone de projetos"
                    />
                  </S.IconContainer>
                  <span>Projetos</span>
                </S.Item>
              </HasPermission>
              <HasPermission
                permissions={[
                  "view_customers",
                  "create_customer",
                  "update_customer",
                  "delete_customer",
                ]}
              >
                <S.Item to="/clientes" onClick={() => setMobileVisible(false)}>
                  <S.IconContainer>
                    <img
                      width="25px"
                      height="25px"
                      className="logoIcon"
                      src={clientes}
                      alt="Icone de clientes"
                    />
                  </S.IconContainer>
                  <span>Clientes</span>
                </S.Item>
              </HasPermission>
              <HasPermission
                permissions={[
                  "view_resources",
                  "create_resource",
                  "update_resource",
                ]}
              >
                <S.Item to="/recursos" onClick={() => setMobileVisible(false)}>
                  <S.IconContainer>
                    <img
                      width="25px"
                      height="25px"
                      className="logoIcon"
                      src={colaboradores}
                      alt="Icone de colaboradores"
                    />
                  </S.IconContainer>
                  <span>Colaboradores</span>
                </S.Item>
              </HasPermission>
              <HasPermission
                permissions={[
                  "view_skills",
                  "create_skill",
                  "update_skill",
                  "delete_skill",
                ]}
              >
                <S.Item to="/skills" onClick={() => setMobileVisible(false)}>
                  <S.IconContainer>
                    <img
                      width="25px"
                      height="25px"
                      className="logoIcon"
                      src={skills}
                      alt="Icone de skills"
                    />
                  </S.IconContainer>
                  <span>Skills</span>
                </S.Item>
              </HasPermission>
              <S.Item to="/escalas" onClick={() => setMobileVisible(false)}>
                <S.IconContainer>
                  <img
                    width="25px"
                    height="25px"
                    className="logoIcon"
                    src={escalas}
                    alt="Icone de equipes"
                  />
                </S.IconContainer>
                <span>Escalas</span>
              </S.Item>
            </S.MenuList>
          </S.Body>
        </S.Content>
      </S.ResponsibleContainer>
    </S.Container>
  );
};

export default MobileSidebar;
