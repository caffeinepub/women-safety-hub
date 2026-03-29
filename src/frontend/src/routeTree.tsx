import Layout from "@/components/Layout";
import Admin from "@/pages/Admin";
import Chatbot from "@/pages/Chatbot";
import FAQ from "@/pages/FAQ";
import Feedback from "@/pages/Feedback";
import Helpline from "@/pages/Helpline";
import Home from "@/pages/Home";
import IncidentReport from "@/pages/IncidentReport";
import Laws from "@/pages/Laws";
import Quiz from "@/pages/Quiz";
import Resources from "@/pages/Resources";
import SafetyTips from "@/pages/SafetyTips";
import Stories from "@/pages/Stories";
import { Outlet, createRootRoute, createRoute } from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const lawsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/laws",
  component: Laws,
});
const helplineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/helpline",
  component: Helpline,
});
const chatbotRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chatbot",
  component: Chatbot,
});
const feedbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/feedback",
  component: Feedback,
});
const safetyTipsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/safety-tips",
  component: SafetyTips,
});
const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quiz",
  component: Quiz,
});
const storiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/stories",
  component: Stories,
});
const resourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resources",
  component: Resources,
});
const faqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/faq",
  component: FAQ,
});
const incidentReportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/incident-report",
  component: IncidentReport,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: Admin,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  lawsRoute,
  helplineRoute,
  chatbotRoute,
  feedbackRoute,
  safetyTipsRoute,
  quizRoute,
  storiesRoute,
  resourcesRoute,
  faqRoute,
  incidentReportRoute,
  adminRoute,
]);
