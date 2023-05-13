import { Route, Routes } from "@solidjs/router";
import type { Component } from "solid-js";
import Home from "./Pages/Home";
import LoginPage from "./Pages/Login";
import Register from "./Pages/Register";
import LogoutPage from "./Pages/Logout";
import RegisterSuccessful from "./Pages/RegisterSuccessful";

const App: Component = () => {
  return (
    <>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={Register} />
        <Route path="/logout" component={LogoutPage} />
        <Route path="/register/success" component={RegisterSuccessful} />
      </Routes>
    </>
  );
};

export default App;
