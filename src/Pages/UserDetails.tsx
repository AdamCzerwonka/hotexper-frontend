import { useParams } from "@solidjs/router";
import { Component, createResource, Match, Suspense, Switch } from "solid-js";

const UserDetailsPage: Component = () => {
  interface User {
    id: string;
    username: string;
  }

  const params = useParams();
  const fetchUserData = async (userId: string) => {
    return (await fetch(`http://localhost:5062/api/account/${userId}`)).json();
  };

  const [userData] = createResource<User, string>(params.id, fetchUserData);

  return (
    <p>
    <Switch fallback={JSON.stringify(userData())}>
    <Match when={userData.loading}>
    ...loading
    </Match>
    <Match when={userData.error}>
    error
    </Match>
    </Switch>
    </p>
  );
};

export default UserDetailsPage;
