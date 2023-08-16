import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  REGISTER_SUCCESS: "/register/success",
  REGISTER_VERIFY: "/register/verify",
  USERS: "/users",
  USER: "/users/:id",
  USER_ROLES: "/users/:id/roles",
  HOTELS: "/hotels",
} as const;

const anonymousRoutes = [
  {
    path: ROUTES.HOME,
    component: lazy(() => import("./Pages/Home")),
  },
  {
    path: ROUTES.LOGIN,
    component: lazy(() => import("./Pages/Login")),
  },
  {
    path: ROUTES.REGISTER,
    component: lazy(() => import("./Pages/Register")),
  },
  {
    path: ROUTES.REGISTER_SUCCESS,
    component: lazy(() => import("./Pages/RegisterSuccessful")),
  },
  {
    path: ROUTES.REGISTER_VERIFY,
    component: lazy(() => import("./Pages/VerifyEmail")),
  },
] satisfies RouteDefinition[];

const authRoutes = [
  {
    path: ROUTES.USERS,
    component: lazy(() => import("./Pages/Users")),
  },
  { path: ROUTES.USER, component: lazy(() => import("./Pages/UserDetails")) },
  {
    path: ROUTES.USER_ROLES,
    component: lazy(() => import("./Pages/UserRoles")),
  },
  {
    path: ROUTES.HOTELS,
    component: lazy(() => import("./Pages/Hotels")),
  },
] satisfies RouteDefinition[];

export const routing = [
  ...anonymousRoutes,
  {
    path: "/",
    component: lazy(() => import("./Components/RouteGuard")),
    children: [...authRoutes],
  },
] satisfies RouteDefinition[];
