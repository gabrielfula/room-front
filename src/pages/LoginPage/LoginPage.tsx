import { Button } from "@/components/ui/button";

import { useAuth } from "@/context/useAuth";
import { AuthService } from "@/services/auth.service";
import { Link, useNavigate } from "react-router-dom";


import TextInput from "@/components/InputText/InputText";
import { useToast } from "@/components/ui/use-toast";


import { loginFormData, loginFormSchema } from "@/schemas/Login/login.schema";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";


export default function LoginPage() {
  const { login } = useAuth();

  const { toast } = useToast()

  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  const { 
    handleSubmit,
    control,
  } = useForm<loginFormData>({
    resolver: zodResolver(loginFormSchema)
  });

  const handleLogin = async (data: loginFormData) => {
    try {
      const response = await AuthService.login(data.email, data.password);

      login(response.token);
      
      toast({
        title: "Login efetuado",
        variant: "default",
        // description: `${response.message}!`
      });

      navigate("/tarefa");
    } catch (error: any) {
      toast({
        title: "Não foi possível efetuar o login",
        variant: "destructive",
        description: `${error.response.data.message}!`
      })
    }
  }

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
        <div className="space-y-2">
          <TextInput
            name="email"
            type="email"
            label={"Email"}
            control={control}
            placeholder="Ex: teste@gmail.com"
          />
        </div>
        <div className="space-y-2">
          <div className="relative">
            <TextInput
              name="password"
              type={isVisible ? "text" : "password"}
              label={"Senha"}
              control={control}
              placeholder="Ex: ******"
              className="pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex pt-5 items-center justify-center h-full w-10"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? (
                <EyeOff size={17} strokeWidth={1.75} />
              ) : (
                <Eye size={17} strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Não possui uma conta ainda?
          <Link
            to={"/cadastro"}
            className="font-medium underline underline-offset-4 hover:text-primary pl-1"
          >
            Cadastrar-se
          </Link>
        </p>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  )
}
