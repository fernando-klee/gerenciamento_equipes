import { Switch } from "react-router-dom";
import { ResourcesProvider } from "../context/ResourceContext";
import Customers from "../pages/Customers";
import Dashboard from "../pages/Dashboard";
import GeralVision from "../pages/GeralVision";
import Skills from "../pages/Skills";
import MyProfile from "../pages/MyProfile/Profile";
import Projects from "../pages/Projects";
import Resources from "../pages/Resources";
import Roles from "../pages/Roles";
import Users from "../pages/Users";
import Router from "./Router";
import PageBlankRouter from "./PageBlankRouter";
import ErrorRouter from "./ErrorRouter";
import NotFound from "../pages/Errors/NotFound";
import ResourceProjects from "../pages/ResourceProfile/ResourceProjects";
import MyProfileProjects from "../pages/MyProfile/ResourceProjects";
import MyProfileFeedbacks from "../pages/MyProfile/Feedbacks";
import Feedbacks from "../pages/ResourceProfile/Feedbacks";
import MyProfileRouter from "./MyProfileRouter";
import ResourceProfileRouter from "./ResourceProfileRouter";
import Profile from "../pages/ResourceProfile/Profile";
import ResourceSkill from "../pages/ResourceProfile/ResourceSkill";
import MyProfileSkill from "../pages/MyProfile/ResourceSkill";
import MyProfileInformation from "../pages/MyProfile/ResourceInformation";
import WorkSchedule from "../pages/WorkSchedule";
import CreateSchedule from "../pages/WorkSchedule/CreateSchedule";
import Portal from "../pages/Portal";
import ResumeLetter from "../pages/ResourceProfile/ResumeLetter";
import EditSchedule from "../pages/WorkSchedule/EditSchedule";
import Organogram from "../pages/Resources/Organogram";
import MyProfileOneOnOne from '../pages/MyProfile/OneOnOne'
import ResourceOneOnOne from '../pages/ResourceProfile/OneOnOne'

export default function Routes() {
  return (
    <ResourcesProvider>
      <Switch>
        <MyProfileRouter exact path="/meu-perfil/" component={MyProfile} />
        <MyProfileRouter
          exact
          path="/meu-perfil/projetos"
          component={MyProfileProjects}
        />
        <MyProfileRouter
          exact
          path="/meu-perfil/feedbacks"
          component={MyProfileFeedbacks}
        />
        <MyProfileRouter
          exact
          path="/meu-perfil/skills"
          component={MyProfileSkill}
        />
        <MyProfileRouter
          exact
          path="/meu-perfil/one-on-one"
          component={MyProfileOneOnOne}
        />
        <MyProfileRouter
          exact
          path="/meu-perfil/informacoes"
          component={MyProfileInformation}
        />
        <Router exact path="/" component={Portal} />

        <Router
          exact
          path="/recursos"
          component={Resources}
          permissions={["view_resources", "create_resource", "update_resource"]}
        />
        <ResourceProfileRouter
          exact
          path="/recursos/:resource_id"
          component={Profile}
          permissions={["view_resources"]}
        />
        <ResourceProfileRouter
          exact
          path="/recursos/:resource_id/projetos"
          component={ResourceProjects}
          permissions={["view_resources"]}
        />
        <ResourceProfileRouter
          exact
          path="/recursos/:resource_id/feedbacks"
          component={Feedbacks}
          permissions={["view_resources"]}
        />
        <ResourceProfileRouter
          exact
          path="/recursos/:resource_id/skills"
          component={ResourceSkill}
          permissions={["view_resources"]}
        />
        <ResourceProfileRouter
          exact
          path="/recursos/:resource_id/one-on-one"
          component={ResourceOneOnOne}
          permissions={["view_resources"]}
        />

        <Router
          exact
          path="/dashboard"
          component={Dashboard}
          permissions={["view_dashboard_menu"]}
        />
        <Router
          exact
          path="/clientes"
          component={Customers}
          permissions={[
            "view_customers",
            "create_customer",
            "update_customer",
            "delete_customer",
          ]}
        />
        <Router
          exact
          path="/projetos"
          component={Projects}
          permissions={["view_projects", "create_project", "update_project"]}
        />
        <Router
          exact
          path="/usuarios"
          component={Users}
          permissions={[
            "view_users",
            "create_user",
            "update_user",
            "delete_user",
          ]}
        />

        <Router
          exact
          path="/grupo-de-permissoes"
          component={Roles}
          permissions={[
            "view_roles",
            "create_role",
            "update_role",
            "delete_role",
          ]}
        />
        <Router
          exact
          path="/skills"
          component={Skills}
          permissions={[
            "view_skills",
            "create_skill",
            "update_skill",
            "delete_skill",
          ]}
        />
        <Router
          exact
          path="/escalas"
          component={WorkSchedule}
          permissions={["view_work_schedule", "create_work_schedule"]}
        />
        <Router
          exact
          path="/escalas/criar"
          component={CreateSchedule}
          permissions={["create_work_schedule"]}
        />
        <Router
          exact
          path="/escalas/editar"
          component={EditSchedule}
          permissions={["create_work_schedule"]}
        />
        <Router exact path="/visao-geral" component={GeralVision} />

        <PageBlankRouter
          exact
          path="/carta-de-apresentacao/:resource_id"
          component={ResumeLetter}
        />
        <PageBlankRouter exact path="/organograma" component={Organogram} />

        <ErrorRouter exact component={NotFound} />
      </Switch>
    </ResourcesProvider>
  );
}
