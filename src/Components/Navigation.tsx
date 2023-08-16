import { A } from "@solidjs/router";
import { Component, createSignal, For, Show } from "solid-js";
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
import { useAuth } from "../Store/Auth";
import { ROUTES } from "../routing";

const Navigation: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [data] = useAuth();

  const pages = [
    {
      path: ROUTES.HOME,
      label: "Home",
    },
    {
      path: ROUTES.HOTELS,
      label: "Hotels",
    },
    {
      path: ROUTES.USERS,
      label: "Users",
    },
  ] satisfies { path: string; label: string }[];

  return (
    <nav>
      <ul class="flex flex-row py-6">
        <div class="flex flex-row gap-x-4">
          <For each={pages}>
            {(item) => (
              <li>
                <A href={item.path}>{item.label}</A>
              </li>
            )}
          </For>
        </div>
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
          when={!data.isLoggedIn}
          fallback={
            <>
              <li class=" mr-5">Hello, {data.username}</li>
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

export default Navigation;
