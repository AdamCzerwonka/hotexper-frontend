import { Component, createResource, For } from "solid-js";
import Nav from "../Components/Nav";

const UsersPage: Component = () => {
  interface User {
    id: string;
    username: string;
    email: string;
  }

  const fetchUsers = async () => {
    return (await fetch("http://localhost:5062/api/account")).json();
  };

  const [users] = createResource<User[]>(fetchUsers);
  return (
    <>
      <div class="max-w-screen-2xl mx-auto">
        <Nav />
        {JSON.stringify(users())}
        <For each={users()}>
          {(user, _) => (
            <div>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <a href={"/users/"+user.id}>More info</a>
            </div>
          )}
        </For>
      </div>
    </>
  );
};

export default UsersPage;
