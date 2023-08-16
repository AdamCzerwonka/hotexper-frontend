import { useRoutes } from "@solidjs/router";
import { Component, onMount } from "solid-js";
import { switchTheme } from "./Services/ThemeService";
import AuthProvider from "./Store/Auth";
import { routing } from "./routing";

const App: Component = () => {
  const Routes = useRoutes(routing);
  onMount(() => {
    switchTheme();
  });

  return (
    <>
      <AuthProvider>
        <div class="dark:bg-slate-800 dark:text-white w-screen min-h-screen">
          <Routes />
        </div>
      </AuthProvider>
    </>
  );
};

export default App;
