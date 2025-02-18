import { TaskService } from "@/services/task.service";
import { useQuery } from "@tanstack/react-query";

export default function useFetchTasks(filters?: string) {
  return useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => TaskService.list(filters),
  });
}