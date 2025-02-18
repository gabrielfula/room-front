import { taskFormData } from "@/schemas/Tasks/tasks.schema";
import { authInstance } from "./axios";
import { updateTaskFormData } from "@/schemas/Tasks/update-task.schema";

export class TaskService {
  static async list(filters?: any) {
    try {
      const response = await authInstance({
        method: "GET",
        url: `/tasks?${filters}`,
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

  static async create(data: taskFormData) {
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
        url: `/tasks/${uuid}`,
      })

      return response.data;
    } catch (error) {
      throw error
    }
  }

  static async update(uuid: string, data: updateTaskFormData) {
    try {
      const response = await authInstance({
        method: "PUT",
        url: `/tasks/edit/${uuid}`,
        data,
      })

      return response.data;
    } catch (error) {
      throw error
    }
  }
}