import { createSignal } from "solid-js";
import { GetApiPath } from "./ApiService";

interface UserLoginData {
  email: string;
  password: string;
}

const tokenKey = "jwt-token";

const fetchToken = async (data: UserLoginData) => {
  const url = GetApiPath("/login");
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

const AuthHeader = () => {
  return {
    Authorization: `Bearer ${GetToken()}`,
  };
};

export { isLoggedIn, Login, fetchToken, Logout, GetToken, AuthHeader };
export type { UserLoginData };
