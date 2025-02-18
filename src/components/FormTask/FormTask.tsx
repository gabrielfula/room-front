import { useForm } from "react-hook-form";
import { toast } from "../ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateTasks from "@/hooks/useCreateTasks";
import useUpdateTask from "@/hooks/useUpdateTask";
import { createTasksFormSchema, taskFormData } from "@/schemas/Tasks/tasks.schema";
import TextInput from "../InputText/InputText";
import { ITasks } from "@/interfaces/tasks";
import { Button } from "../ui/button";

type FormTaskProps = {
  mode: "edit" | "create";
  task?: ITasks;
};

export default function FormTask({ mode, task }: FormTaskProps) {
  const { mutateAsync: createTask } = useCreateTasks();
  const { mutateAsync: updateTask } = useUpdateTask();

  const { control, handleSubmit, reset } = useForm<taskFormData>({
     resolver: zodResolver(createTasksFormSchema),
     defaultValues: {
          title: task?.title || "",
          description: task?.description || "",
     },
  });

  const handleAction = async (data: taskFormData) => {
     try {
          if (mode === "create") {
               await createTask(data);
          } else if (mode === "edit" && task?.uuid) {
               await updateTask({ uuid: task.uuid, data });
          }

          reset();

          toast({
               title: `Tarefa ${mode === "create" ? "criada" : "editada"} com sucesso!`,
               variant: "default",
          });
     } catch (ex: any) {
          toast({
               title: `Não foi possível ${mode === "create" ? "criar" : "editar"} a tarefa`,
               variant: "destructive",
               description: `${ex.response?.data?.message || "Erro desconhecido"}!`,
          });
     }
  };

  return (
    <form onSubmit={handleSubmit(handleAction)} className="flex flex-col gap-4 my-4">
      <TextInput
        name="title"
        type="text"
        label="Título"
        control={control}
        placeholder={task?.title || "Digite um título para a tarefa"}
      />
      <TextInput
        name="description"
        type="text"
        label="Descrição"
        control={control}
        placeholder={task?.description || "Digite uma descrição detalhada"}
      />
      <Button type="submit" size="sm" className="px-3">
        {mode === "create" ? "Criar" : "Salvar"}
      </Button>
    </form>
  );
}
