import { Component, createResource, For } from "solid-js";
import Nav from "../Components/Nav";
import SideNav from "../Components/SideNav";
import { GetApiPath } from "../Services/ApiService";

const UsersPage: Component = () => {
  interface User {
    id: string;
    username: string;
    email: string;
  }

  const fetchUsers = async () => {
    const url = GetApiPath("/account");
    return (await fetch(url)).json();
  };

  const [users] = createResource<User[]>(fetchUsers);
  return (
    <>
      <div class="container mx-auto">
        <Nav />
        <div class="flex flex-row">
          <SideNav />
          <main role="main" class="w-full sm:w-2/3 md:w-4/5 px-2">
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <For each={users()}>
                  {(user, _) => (
                    <tr>
                      <td>{user.username}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <a href={"/users/" + user.id}>More info</a>
                      </td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </main>
        </div>
      </div>
    </>
  );
};

export default UsersPage;
