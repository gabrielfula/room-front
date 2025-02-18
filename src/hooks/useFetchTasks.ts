import { TaskService } from "@/services/task.service";
import { useQuery } from "@tanstack/react-query";

export default function useFetchTasks() {
   return useQuery({
    queryKey: ["tasks"],
    queryFn: TaskService.list
  })
}
