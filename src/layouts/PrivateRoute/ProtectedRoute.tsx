import { useAuth } from "@/context/useAuth";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoutes({ children }: PropsWithChildren) {

  const { token } = useAuth();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate("/", { replace: true });
    }

  }, [navigate, token])

  return children;
}