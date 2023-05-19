import { A } from "@solidjs/router";
import { Component, Show } from "solid-js";
import { isLoggedIn } from "../Services/LoginService";
import { switchToLightTheme } from "../Services/ThemeService";

const Home: Component = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <A href="/">Home</A>
          </li>
          <Show
            when={!isLoggedIn()}
            fallback={
              <li>
                <A href="/logout">Logout</A>
              </li>
            }
          >
            <li>
              <A href="/login">Login</A>
            </li>
            <li>
              <A href="/register">Register</A>
            </li>
          </Show>
        </ul>
      </nav>
      <button onclick={() => switchToLightTheme()} class="border-2 border-black">
        Switch theme
      </button>
    </>
  );
};

export default Home;
