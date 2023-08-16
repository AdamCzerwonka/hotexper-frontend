import { Navigate, Outlet } from "@solidjs/router";
import { Component, Show } from "solid-js";
import { useAuth } from "../Store/Auth";

const RouteGuard: Component = () => {
  const [data] = useAuth();

  return (
    <Show when={data.isLoggedIn} fallback={<Navigate href="/login" />}>
      <Outlet />
    </Show>
  );
};

export default RouteGuard;
