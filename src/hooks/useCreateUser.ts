import { registerFormData } from "@/schemas/Login/register.schema";
import { AuthService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";


export default  function useCreateUser() {
  return useMutation({
    mutationFn: async (data: registerFormData) => await AuthService.create(data)
  })
}
