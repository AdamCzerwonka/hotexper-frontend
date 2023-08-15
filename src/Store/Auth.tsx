import {
  createContext,
  createSignal,
  ParentComponent,
  useContext,
} from "solid-js";
import { createStore } from "solid-js/store";

const tokenKey = "jwt-token";

interface AuthState {
  username?: string;
  token?: string;
  isLoggedIn: boolean;
}

export interface JwtPaload {
  id: string;
  sub: string;
  email: string;
  userId: string;
  jti: string;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}

const parseToken = (token: string | null): JwtPaload | undefined => {
  if (token) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  return undefined;
};

const useAuthContextValue = () => {
  const [data, setAuthStore] = createStore<AuthState>({
    token: localStorage.getItem(tokenKey) ?? undefined,
    isLoggedIn: localStorage.getItem(tokenKey) !== null,
    username: parseToken(localStorage.getItem(tokenKey))?.sub,
  });
  return [
    data,
    {
      login: (token: string) => {
        setAuthStore("token", token);
        localStorage.setItem(tokenKey, token);
        setAuthStore("isLoggedIn", true);

        const tokenData = parseToken(data.token || "");
        setAuthStore("username", tokenData?.sub);
      },
      logout: () => {
        localStorage.removeItem(tokenKey);
        setAuthStore("isLoggedIn", false);
        setAuthStore("username", undefined);
        setAuthStore("token", undefined);
      },
    },
  ] as const;
};

type AuthContextType = ReturnType<typeof useAuthContextValue>;

const AuthContext = createContext<AuthContextType>();

const AuthProvider: ParentComponent = (props) => {
  const contextValue = useAuthContextValue();
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;

export default AuthProvider;
