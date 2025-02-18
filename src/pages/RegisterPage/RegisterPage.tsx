import TextInput from "@/components/InputText/InputText";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import useCreateUser from "@/hooks/useCreateUser";
import { registerFormData, registerFormSchema } from "@/schemas/Login/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {

  const { mutateAsync } = useCreateUser();

  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);

  const { 
    handleSubmit,
    control,
  } = useForm<registerFormData>({
    resolver: zodResolver(registerFormSchema)
  });

  const handleCreateUser = async (data: registerFormData) => {
    try {
      await mutateAsync(data);

      toast({
        title: "Usuário cadastrado com sucesso!",
        variant: "default",
      });

      navigate("/");
      
    } catch (ex: any) {
      toast({
        title: "Não foi possível concluir o cadastro",
        variant: "destructive",
        description: `${ex.response.data.message || "Erro desconhecido"}!`,
      });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <div className="flex flex-col gap-5">
          <div>
            <TextInput name="mail" type="email" label="E-mail" control={control} placeholder="E-mail..." />
          </div>
          <div>
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
        </div>  
        <Button type="submit" className="w-full mt-5">
          Cadastrar
        </Button>
      </form>
    </>
  )
}
