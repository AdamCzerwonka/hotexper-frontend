import { A } from "@solidjs/router";
import { Component, Show } from "solid-js";
import { isLoggedIn } from "../Services/LoginService";
import {
  switchToAutoTheme,
  switchToDarkTheme,
  switchToLightTheme,
} from "../Services/ThemeService";

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
      <button onclick={() => switchToDarkTheme()} class="border-2 border-black">
        Dark theme
      </button>
      <button
        onclick={() => switchToLightTheme()}
        class="border-2 border-black"
      >
        Light theme
      </button>
      <button onclick={() => switchToAutoTheme()} class="border-2 border-black">
        Use preferences
      </button>
    </>
  );
};

export default Home;
