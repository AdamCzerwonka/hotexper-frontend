import { createSignal } from "solid-js";

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

const url = "http://localhost:5062/api/login";

const fetchToken = async (data: UserLoginData) => {
  let response: Response;
  response = await fetch(url, {
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

export { isLoggedIn, Login, fetchToken, Logout, GetToken };
export type { UserLoginData };
