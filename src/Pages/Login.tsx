import { Navigate } from "@solidjs/router";
import { Component, Show, createSignal } from "solid-js";
import { Login, UserLoginData, isLoggedIn } from "../Services/LoginService";

const LoginPage: Component = () => {
  const [login, setLogin] = createSignal("");
  const [password, setPassword] = createSignal("");

  const onSubmit = (e: Event) => {
    e.preventDefault();

    const data: UserLoginData = {
      Email: login(),
      Password: password(),
    };

    Login(data);
  };

  return (
    <Show when={!isLoggedIn()} fallback={<Navigate href={"/"} />}>
      <form onSubmit={onSubmit}>
        <div>
          <label>Login</label>
          <input
            value={login()}
            onInput={(e) => setLogin(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            value={password()}
            onInput={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <button>Login</button>
      </form>
    </Show>
  );
};

export default LoginPage;
