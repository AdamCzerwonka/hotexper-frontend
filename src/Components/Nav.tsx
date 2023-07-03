import { A } from "@solidjs/router";
import { Component, createSignal, Show } from "solid-js";
import { isLoggedIn } from "../Services/LoginService";
import {
  FaSolidArrowDown,
  FaSolidDesktop,
  FaSolidMoon,
  FaSolidSun,
} from "solid-icons/fa";
import {
  switchToAutoTheme,
  switchToDarkTheme,
  switchToLightTheme,
} from "../Services/ThemeService";

const Nav: Component = () => {
  const [name, setName] = createSignal("Adam");
  const [isOpen, setIsOpen] = createSignal(false);
  return (
    <nav>
      <ul class="flex flex-row py-6">
        <li class="mr-5">
          <A href="/">Home</A>
        </li>
        <li class="mr-5">
          <A href="/hotel">Our Hotels</A>
        </li>
        <li class="ml-auto">
          <div class="relative w-24">
            <button
              onclick={() =>
                setIsOpen((curr) => {
                  return !curr;
                })
              }
              class="flex flex-row w-full justify-between px-2 items-center"
            >
              Theme
              <FaSolidArrowDown />
            </button>
            <Show when={isOpen()}>
              <div class="absolute w-full bg-slate-600">
                <div
                  onClick={switchToDarkTheme}
                  class="flex flex-row justify-between mt-3 items-center px-2 cursor-pointer"
                >
                  Dark
                  <FaSolidMoon />
                </div>
                <div
                  onClick={switchToLightTheme}
                  class="flex flex-row justify-between mt-3 items-center px-2 cursor-pointer"
                >
                  Light
                  <FaSolidSun />
                </div>
                <div
                  onClick={switchToAutoTheme}
                  class="flex flex-row justify-between my-3 items-center px-2 cursor-pointer"
                >
                  Auto
                  <FaSolidDesktop />
                </div>
              </div>
            </Show>
          </div>
        </li>
        <Show
          when={!isLoggedIn()}
          fallback={
            <>
              <li class=" mr-5">Hello, {name()}</li>
              <li>
                <A href="/logout">Logout</A>
              </li>
            </>
          }
        >
          <li class="mr-5">
            <A href="/login">Login</A>
          </li>
          <li>
            <A href="/register">Register</A>
          </li>
        </Show>
      </ul>
    </nav>
  );
};

export default Nav;
