import { GetApiPath } from "./ApiService";

interface UserLoginData {
  email: string;
  password: string;
}

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

``

export { fetchToken };
export type { UserLoginData };
