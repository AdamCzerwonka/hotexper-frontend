import { createSignal } from "solid-js";
import { GetApiPath } from "./ApiService";

interface UserLoginData {
  Email: string;
  Password: string;
}

const tokenKey = "jwt-token";

const IsTokenPresent = () => {
  let token = localStorage.getItem(tokenKey);
  return token ? true : false;
};

const [isLoggedIn, setLoggedIn] = createSignal(IsTokenPresent());

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

const Login = (token: string) => {
  localStorage.setItem(tokenKey, token);
  setLoggedIn(true);
};

const Logout = () => {
  localStorage.removeItem(tokenKey);
  setLoggedIn(false);
};

const GetToken = () => {
  let token = localStorage.getItem(tokenKey);
  if (!token) {
    setLoggedIn(false);
    return null;
  }

  return token;
};

const AuthHeader = () => {
    return {
        "Authorization": `Bearer ${GetToken()}`
    };
}

export { isLoggedIn, Login, fetchToken, Logout, GetToken, AuthHeader };
export type { UserLoginData };
