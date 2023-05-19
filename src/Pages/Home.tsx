import { Component, Show } from "solid-js";
import {
  switchToAutoTheme,
  switchToDarkTheme,
  switchToLightTheme,
} from "../Services/ThemeService";
import Nav from "../Components/Nav";

const Home: Component = () => {
  return (
    <>
      <Nav />
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
