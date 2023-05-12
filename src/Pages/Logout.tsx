import { Navigate } from "@solidjs/router";
import { Component, onMount } from "solid-js";
import { Logout } from "../Services/LoginService";

const LogoutPage: Component = () => {
  onMount(() => {
    Logout();
  });

  return <Navigate href="/login" />;
};

export default LogoutPage;
