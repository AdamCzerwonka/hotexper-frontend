import { useNavigate, useParams } from "@solidjs/router";
import {
  FaSolidBan,
  FaSolidPenToSquare,
  FaSolidTrashCan,
  FaSolidUsers,
} from "solid-icons/fa";
import {
  Component,
  createResource,
  createSignal,
  For,
  Match,
  Switch,
} from "solid-js";
import Button from "../Components/Button";
import Navigation from "../Components/Navigation";
import { GetApiPath } from "../Services/ApiService";
import User from "../Types/User";
import { useAuth } from "../Store/Auth";

type UserDetailsPageParams = {
  id: string;
};

const UserDetailsPage: Component = () => {
  const [, { header }] = useAuth();
  const params = useParams<UserDetailsPageParams>();
  const fetchUserData = async (userId: string) => {
    const url = GetApiPath(`/account/${userId}`);
    return (
      await fetch(url, {
        headers: header(),
      })
    ).json();
  };

  const navigate = useNavigate();
  const [userData] = createResource<User, string>(params.id, fetchUserData);
  const [isEditMode, setEditMode] = createSignal(false);

  return (
    <>
      <div class="max-w-screen-2xl mx-auto">
        <Navigation />
        <p>
          <Switch
            fallback={
              <>
                <div class="flex flex-row justify-between w-[500px]">
                  <Button
                    content={"Edit"}
                    Icon={<FaSolidPenToSquare />}
                    onClick={() => setEditMode((mode) => !mode)}
                  />
                  <Button
                    content={"Roles"}
                    Icon={<FaSolidUsers />}
                    onClick={() =>
                      navigate(`/users/${params.id}/roles`, { replace: false })
                    }
                  />
                  <Button
                    color="yellow"
                    content={"Disable"}
                    Icon={<FaSolidBan />}
                    onClick={() => console.log("test")}
                  />
                  <Button
                    color="red"
                    content={"Delete"}
                    Icon={<FaSolidTrashCan />}
                    onClick={() => console.log("test")}
                  />
                </div>
                {!isEditMode() && (
                  <div>
                    <p>Id: {userData()?.id}</p>
                    <p>Firstname: {userData()?.firstname}</p>
                    <p>Lastname: {userData()?.lastname}</p>
                    <p>Email: {userData()?.email}</p>
                    <p>Username: {userData()?.username}</p>
                    <h3>Roles</h3>
                    <ul>
                      <For each={userData()?.roles}>
                        {(role, i) => (
                          <li>
                            {i()}: {role}
                          </li>
                        )}
                      </For>
                    </ul>
                  </div>
                )}
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
