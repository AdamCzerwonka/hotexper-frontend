import { Navigate } from "@solidjs/router";
import { Component, Show, createSignal } from "solid-js";
import {
  fetchToken,
  UserLoginData,
  isLoggedIn,
  Login,
} from "../Services/LoginService";

const LoginPage: Component = () => {
  const [login, setLogin] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [errorMsg, setErrorMsg] = createSignal("");

  const onSubmit = (e: Event) => {
    e.preventDefault();

    const data: UserLoginData = {
      Email: login(),
      Password: password(),
    };

    fetchToken(data)
      .then((res) => {
        if (res.token) {
          Login(res.token);
        }

        if (res.error) {
          setErrorMsg(res.error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Show when={!isLoggedIn()} fallback={<Navigate href={"/"} />}>
      <div class="flex flex-col items-center justify-center h-screen place-items-center  mx-auto">
        <form
          class="flex flex-col border-2 border-black p-10"
          onSubmit={onSubmit}
        >
          <h1 class="text-5xl text-center pb-10">Login</h1>
          <Show when={errorMsg()}>
            <p>{errorMsg()}</p>
          </Show>
          <div class="flex flex-col pb-5">
            <input
              class="border-red-500 border-2 p-1.5"
              value={login()}
              onInput={(e) => setLogin(e.target.value)}
              type="text"
            />
            <label class="text-sm">Login</label>
          </div>
          <div class="flex flex-col pb-5">
            <input
              class="border-red-500 border-2 p-2 w-80"
              value={password()}
              onInput={(e) => setPassword(e.target.value)}
              type="password"
            />
            <label class="text-sm">Password</label>
          </div>
          <button class="border-4 border-red-500 p-2.5 text-lg font-bold">
            Login
          </button>
          <div>
            <span>Forgot password</span>
          </div>
        </form>
      </div>
    </Show>
  );
};

export default LoginPage;
