import { registerFormData } from "@/schemas/Login/register.schema";
import { authInstance, instance } from "./axios";

export class AuthService {
  
  static async login(username: string, password: string) {
    try {
      const response = await instance({
        method: "POST",
        url: "/auth/signin",
        data: { 
          username, 
          password 
        }
      });

      return response.data;
    } catch (error) {
      throw error
    }
  }

  static async create(data: registerFormData) {
    try {
      const response = await authInstance({
        method: "POST",
        url: "/auth/register",
        data
      })

      return response.data;
    } catch (error) {
      throw error
    }
  }
}