import {
  createContext,
  createSignal,
  ParentComponent,
  useContext,
} from "solid-js";

interface auth {
  username: string;
}

const AuthContext = createContext<auth>();
const useAuth = () => useContext(AuthContext);

const AuthProvider: ParentComponent = (props) => {
  const [username, setUsername] = createSignal("");
  const auth = [
    username(),
    {
      setUsername(username: string) {
        setUsername(username);
      },
    },
  ];
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
export { useAuth };
