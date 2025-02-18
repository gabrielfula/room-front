import { TaskService } from "@/services/task.service";
import { useQuery } from "@tanstack/react-query";

export default function useFetchTaskByUuid(uuid: string) {
  return useQuery({
    queryKey: ["taskByUuid", uuid],
    queryFn: async () => await TaskService.getByUuid(uuid),
  });
}