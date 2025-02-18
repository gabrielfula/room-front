import { taskFormData } from "@/schemas/Tasks/tasks.schema";
import { queryClient } from "@/services/react-query";
import { TaskService } from "@/services/task.service";
import { useMutation } from "@tanstack/react-query";


export default  function useCreateTasks() {
  return useMutation({
    mutationFn: async (data: taskFormData) => await TaskService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"]
      });
    }
  })
}
