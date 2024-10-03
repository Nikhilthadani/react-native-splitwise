import { createContext, useContext, useEffect, useState } from "react";
import {
  createUser,
  getUserById,
  checkSession,
  createSession,
  deleteAllSession,
} from "../sql/executer";
import { getAllGroupsOfUser } from "../sql/group";
const AuthContext = createContext({
  login: (id) => {},
  signUp: async (name, email) => {},
  isLoggedIn: false,
  user: { name: "", email: "", id: 0 },
});
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "", email: "", id: 0 });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkAuthState() {
      const session = await checkSession();
      console.log("Session: ", session);

      if (!session || session.length == 0) {
        return;
      }

      if (session.length > 1) {
        await deleteAllSession();
        return;
      }
      const user = await getUserById(session[0].id);
      setUser(user);
      setIsLoggedIn(true);
      getAllGroupsOfUser(user.id);
    }
    checkAuthState();
  }, []);

  const login = async (id) => {
    try {
      const user = await getUserById(id);
      console.log("IN LOGIN----->", user);
      setUser(user);
      setIsLoggedIn(true);
      await createSession(user.id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const signUp = async (name, email) => {
    try {
      const user = await createUser(name, email);
      console.log("IN SIGNUP----->", user);
      await createSession(user.id);
      setUser(user);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
