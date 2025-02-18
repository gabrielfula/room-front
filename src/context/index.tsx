import { useCookie } from "@/hooks/useCookie";
import { createContext, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { IAuthContext } from "./interface/iauth";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken, clearCookie] = useCookie("token", null);

  const navigate = useNavigate();

  const login = async (access_token: string) => {
    setToken(access_token);
  };

  const signout = async () => {
    clearCookie("token")
    setToken(null);
    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{ 
        login, 
        signout, 
        token 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};