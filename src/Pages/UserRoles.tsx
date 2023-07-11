import { useParams } from "@solidjs/router";
import { Component, createSignal, For, onMount } from "solid-js";
import Nav from "../Components/Nav";
import { GetApiPath } from "../Services/ApiService";

const UserRolesPage: Component = () => {
  let orginalRoles: string[] = [];
  const fetchRoles = async () => {
    const url = GetApiPath("/role");
    return (await fetch(url)).json();
  };

  const fetchUserRoles = async (userId: string) => {
    const url = GetApiPath(`/account/${userId}/role`);
    return (await fetch(url)).json();
  };

  const saveUserRoles = () => {
    const url = GetApiPath(`/account/${params.id}/role`);
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({roles: userRoles()})
    }).then((response) => {
      console.log(response);
    });
  };

  const addToRole = () => {
    if (selectedAdd() === "") {
      return;
    }

    const role = selectedAdd();

    if (userRoles().includes(role)) {
      return;
    }

    setUserRoles((roles) => [role, ...roles]);
    setSelectedAdd("");
    setAllRoles((roles) => [...roles.filter((item) => item !== role)]);
  };

  const removeFromRole = () => {
    if (selectedRemove() === "") {
      return;
    }

    const role = selectedRemove();

    setAllRoles((roles) => [role, ...roles]);
    setSelectedRemove("");
    setUserRoles((roles) => [...roles.filter((item) => item !== role)]);
  };

  onMount(() => {
    Promise.all([fetchRoles(), fetchUserRoles(params.id)]).then(
      (values: string[][]) => {
        let roles = values[0];
        let userRoles = values[1];

        roles = roles.filter((item) => !userRoles.includes(item));

        orginalRoles = userRoles.slice();
        setAllRoles(roles);
        setUserRoles(userRoles);
      }
    );
  });

  const params = useParams();
  const [allRoles, setAllRoles] = createSignal<string[]>([]);
  const [userRoles, setUserRoles] = createSignal<string[]>([]);
  const [selectedAdd, setSelectedAdd] = createSignal<string>("");
  const [selectedRemove, setSelectedRemove] = createSignal<string>("");
  return (
    <>
      <div class="max-w-screen-2xl mx-auto">
        <Nav />
        <p>You are modifing roles for: {params.id}</p>
        <div class="flex flex-row">
          <div class="w-80">
            <For each={allRoles()}>
              {(role, _) => (
                <div
                  class="text-center"
                  classList={{ "bg-red-100": selectedAdd() === role }}
                  onClick={() => {
                    if (selectedAdd() === role) {
                      setSelectedAdd("");
                    } else {
                      setSelectedAdd(role);
                    }
                  }}
                >
                  {role}
                </div>
              )}
            </For>
          </div>
          <div class="w-80">
            <For each={userRoles()}>
              {(role, _) => (
                <div
                  class="text-center"
                  classList={{ "bg-blue-100": selectedRemove() === role }}
                  onClick={() => {
                    if (selectedRemove() === role) {
                      setSelectedRemove("");
                    } else {
                      setSelectedRemove(role);
                    }
                  }}
                >
                  {role}
                </div>
              )}
            </For>
          </div>
        </div>
        <button onClick={addToRole}>Add</button>
        <button onClick={removeFromRole}>Remove</button>
        <button onClick={saveUserRoles}>Save</button>
      </div>
    </>
  );
};

export default UserRolesPage;
