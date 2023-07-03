import { Route, Routes } from "@solidjs/router";
import { Component, onMount } from "solid-js";
import Home from "./Pages/Home";
import LoginPage from "./Pages/Login";
import Register from "./Pages/Register";
import LogoutPage from "./Pages/Logout";
import RegisterSuccessful from "./Pages/RegisterSuccessful";
import VerifyEmail from "./Pages/VerifyEmail";
import { switchTheme } from "./Services/ThemeService";
import Hotels from "./Pages/Hotels";
import UsersPage from "./Pages/Users";
import UserDetailsPage from "./Pages/UserDetails";

const App: Component = () => {
  onMount(() => {
    switchTheme();
  });

  return (
    <>
      <div class="dark:bg-slate-800 dark:text-white w-screen h-screen">
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/logout" component={LogoutPage} />
          <Route path="/hotel" component={Hotels}/>
          <Route path="/register" component={Register} />
          <Route path="/users" component={UsersPage} />
          <Route path="/users/:id" component={UserDetailsPage}/>
          <Route path="/register/success" component={RegisterSuccessful} />
          <Route path="/register/verify" component={VerifyEmail} />
        </Routes>
      </div>
    </>
  );
};

export default App;
