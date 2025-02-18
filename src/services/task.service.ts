import { productFormData } from "@/schemas/Tasks/products.schema";
import { authInstance } from "./axios";
import { updateProductFormData } from "@/schemas/Tasks/update-product.schema";

export class TaskService {
  static async list() {
    try {
      const response = await authInstance({
        method: "GET",
        url: "/tasks",
      })

      return response.data.data;
    } catch (error) {
      throw error
    }
  }

  static async getByUuid(uuid: string) {
    try {
      const response = await authInstance({
        method: "GET",
        url: `/tasks/details/${uuid}`,
      })

      return response.data;
    } catch (error) {
      throw error
    }
  }

  static async create(data: productFormData) {
    try {
      const response = await authInstance({
        method: "POST",
        url: "/tasks/create",
        data
      })

      return response.data;
    } catch (error) {
      throw error
    }
  }

  static async delete(uuid: string) {
    try {
      const response = await authInstance({
        method: "DELETE",
        url: `/tasks/delete/${uuid}`,
      })

      return response.data;
    } catch (error) {
      throw error
    }
  }

  static async update(uuid: string, data: updateProductFormData) {
    try {
      const response = await authInstance({
        method: "PUT",
        url: `/tasks/update/${uuid}`,
        data,
      })

      return response.data;
    } catch (error) {
      throw error
    }
  }
}