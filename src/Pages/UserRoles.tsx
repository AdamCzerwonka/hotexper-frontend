import { useParams } from "@solidjs/router";
import { Component, createSignal, For, onMount } from "solid-js";
import Nav from "../Components/Nav";

const UserRolesPage: Component = () => {
  const fetchRoles = async () => {
    return (await fetch("http://localhost:5062/api/role")).json();
  };

  const fetchUserRoles = async (userId: string) => {
    return (
      await fetch(`http://localhost:5062/api/account/${userId}/role`)
    ).json();
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
    setUserRoles((roles) => [
      ...roles.filter((item) => item !== role),
    ]);
  };

  onMount(() => {
    Promise.all([fetchRoles(), fetchUserRoles(params.id)]).then(
      (values: string[][]) => {
        let roles = values[0];
        let userRoles = values[1];

        roles = roles.filter((item) => !userRoles.includes(item));

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
      </div>
    </>
  );
};

export default UserRolesPage;
