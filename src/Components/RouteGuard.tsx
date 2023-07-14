import { Outlet, useNavigate } from "@solidjs/router";
import { Component, createEffect, Show } from "solid-js";
import { isLoggedIn } from "../Services/LoginService";

const RouteGuard: Component = () => {
  const navigate = useNavigate();
  createEffect(() => {
    if (!isLoggedIn()) {
      navigate("login", { replace: false });
    }
  });

  return (
    <Show when={isLoggedIn()}>
      <Outlet />
    </Show>
  );
};

export default RouteGuard;
