import { createContext, useContext, useEffect, useState } from "react";
import {
  createUser,
  getUserById,
  checkSession,
  createSession,
  deleteAllSession,
} from "../sql/executer";
import { getAllGroupsOfUser } from "../sql/group";
import Connection from "../sql/login/AuthOperations";
const AuthContext = createContext({
  login: (id) => {},
  signUp: async (name, phone) => {},
  isLoggedIn: false,
  user: { name: "", email: "", id: 0 },
  logout: async () => {},
});
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "", phone: "", id: 0 });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    Connection.getConnection();
    async function checkAuthState() {
      const session = await checkSession();
      console.log("Session: ", session);

      if (!session || session.length == 0) {
        return;
      }

      if (session.length > 1) {
        await deleteAllSession();
      }

      console.log("sessionid-> ", session[0].id);
      const userDetails = await getUserById(session[0].id);
      console.log(userDetails);

      setUser(userDetails);
      setIsLoggedIn(true);
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
  const logout = async () => {
    try {
      await deleteAllSession();
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
