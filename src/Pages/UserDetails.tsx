import { useParams } from "@solidjs/router";
import { FaSolidBan, FaSolidPenToSquare, FaSolidTrashCan, FaSolidUsers } from "solid-icons/fa";
import { Component, createResource, For, Match, Switch } from "solid-js";
import Button from "../Components/Button";
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
              <>
                <div class="flex flex-row">
                  <Button
                    content={"Edit"}
                    Icon={<FaSolidPenToSquare />}
                    onClick={() => console.log("test")}
                  />
                  <Button
                    content={"Roles"}
                    Icon={<FaSolidUsers />}
                    onClick={() => console.log("test")}
                  />
                  <Button
                    content={"Disable"}
                    Icon={<FaSolidBan />}
                    onClick={() => console.log("test")}
                  />
                  <Button
                    content={"Delete"}
                    Icon={<FaSolidTrashCan />}
                    onClick={() => console.log("test")}
                  />
                </div>
                <div>
                  <p>Id: {userData().id}</p>
                  <p>Firstname: {userData().firstname}</p>
                  <p>Lastname: {userData().lastname}</p>
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
              </>
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
