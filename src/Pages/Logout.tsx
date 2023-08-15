import { Navigate } from "@solidjs/router";
import { Component, onMount } from "solid-js";
import { useAuth } from "../Store/Auth";

const LogoutPage: Component = () => {
  const [data, { logout }] = useAuth();
  onMount(() => {
    logout();
  });

  return <Navigate href="/login" />;
};

export default LogoutPage;
