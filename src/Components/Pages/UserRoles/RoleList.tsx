import { Component, createSignal, For } from "solid-js";

interface RoleListProps {
  allRoles: string[];
  userRoles: string[];
}

const RoleList: Component<RoleListProps> = (props: RoleListProps) => {
  const [selectedAdd, setSelectedAdd] = createSignal<string>("");
  const [selectedRemove, setSelectedRemove] = createSignal<string>("");
  const [allRoles, setAllRoles] = createSignal<string[]>([]);
  const [userRoles, setUserRoles] = createSignal<string[]>([]);

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

  return (
    <div class="flex flex-row">
      <div class="w-80">
        <For each={props.allRoles}>
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
        <For each={props.userRoles}>
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
      <button onClick={addToRole}>Add</button>
      <button onClick={removeFromRole}>Remove</button>
      <button onClick={saveUserRoles}>Save</button>
    </div>
  );
};

export default RoleList;
