import { useLocation, useNavigate } from "@solidjs/router";
import { Component, onMount } from "solid-js";
import { GetApiPath } from "../Services/ApiService";

const VerifyEmail: Component = () => {
  const location = useLocation();
  const navigate = useNavigate();
  onMount(async () => {
    const params = location.search
      .substring(1)
      .split("&")
      .reduce((prev, curr, _) => {
        const splitIndex = curr.indexOf("=");
        const valueName = curr.substring(0, splitIndex);
        const value = curr.substring(splitIndex + 1);
        prev[valueName] = value;
        return prev;
      }, {});

    const url = GetApiPath(`/account/${params["userId"]}/verify`);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: params["token"] }),
    });

    if (response.status == 200) {
      navigate("/login", { replace: false });
    }
  });

  return (
    <>
      <h1>Successful register verify your email</h1>
    </>
  );
};

export default VerifyEmail;
