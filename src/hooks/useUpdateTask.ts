import { updateProductFormData } from "@/schemas/Tasks/update-product.schema";
import { TaskService } from "@/services/task.service";
import { queryClient } from "@/services/react-query";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateTask() {
  return useMutation({
    mutationFn: async ({ uuid, data }: { uuid: string, data: updateProductFormData }) => await TaskService.update(uuid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"]
      });
    }
  })
}
