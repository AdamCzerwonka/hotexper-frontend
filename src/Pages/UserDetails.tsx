import { useParams } from "@solidjs/router";
import { Component, createResource, For, Match, Switch } from "solid-js";
import Nav from "../Components/Nav";
import { GetApiPath } from "../Services/ApiService";
import { AuthHeader } from "../Services/LoginService";
import User from "../Types/User";

type UserDetailsPageParams = {
  id: string;
};

const UserDetailsPage: Component = () => {
  const params = useParams<UserDetailsPageParams>();
  const fetchUserData = async (userId: string) => {
    const url = GetApiPath(`/account/${userId}`);
    return (
      await fetch(url, {
        headers: AuthHeader(),
      })
    ).json();
  };

  const [userData] = createResource<User, string>(params.id, fetchUserData);

  return (
    <>
      <div class="max-w-screen-2xl mx-auto">
        <Nav />
        <p>
          <Switch
            fallback={
              <div>
                <p>Id: {userData().id}</p>
                <p>Email: {userData().email}</p>
                <p>Username: {userData().username}</p>
                <h3>Roles</h3>
                <ul>
                  <For each={userData().roles}>
                    {(role, i) => (
                      <li>
                        {i()}: {role}
                      </li>
                    )}
                  </For>
                </ul>
                <a href={`/users/${params.id}/roles`}>Manage roles</a>
              </div>
            }
          >
            <Match when={userData.loading}>...loading</Match>
            <Match when={userData.error}>error</Match>
          </Switch>
        </p>
      </div>
    </>
  );
};

export default UserDetailsPage;
