import { queryClient } from "@/services/react-query";
import { TaskService } from "@/services/task.service";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteTask() {
  return useMutation({
    mutationFn: async (uuid: string) => await TaskService.delete(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"]
      });
    }
  })
}
