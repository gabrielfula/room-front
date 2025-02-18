import { TaskService } from "@/services/task.service";
import { queryClient } from "@/services/react-query";
import { useMutation } from "@tanstack/react-query";
import { updateTaskFormData } from "@/schemas/Tasks/update-task.schema";

export default function useUpdateTask() {
  return useMutation({
    mutationFn: async ({ uuid, data }: { uuid: string, data: updateTaskFormData }) => await TaskService.update(uuid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"]
      });
    }
  })
}
