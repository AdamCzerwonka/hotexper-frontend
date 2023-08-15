import { Outlet, useNavigate } from "@solidjs/router";
import { Component, createEffect, Show } from "solid-js";
import { useAuth } from "../Store/Auth";

const RouteGuard: Component = () => {
  const navigate = useNavigate();
  const [data] = useAuth();

  createEffect(() => {
    if (!data.isLoggedIn) {
      navigate("login", { replace: false });
    }
  });
  
  return (
    <Show when={data.isLoggedIn}>
      <Outlet />
    </Show>
  );
};

export default RouteGuard;
