import { useForm } from "react-hook-form";
import { toast } from "../ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateTasks from "@/hooks/useCreateTasks";
import useUpdateTask from "@/hooks/useUpdateTask";
import { createTasksFormSchema, taskFormData } from "@/schemas/Tasks/tasks.schema";
import TextInput from "../InputText/InputText";
import { ITasks } from "@/interfaces/tasks";
import { Button } from "../ui/button";
import { useState } from "react";

type FormTaskProps = {
  mode: "edit" | "create";
  task?: ITasks;
  onSuccess?: () => void;
};

export default function FormTask({ mode, task, onSuccess }: FormTaskProps) {
  const { mutateAsync: createTask } = useCreateTasks();
  const { mutateAsync: updateTask } = useUpdateTask();
  const [status, setStatus] = useState<"COMPLETED" | "PENDING">(task?.status || "PENDING");

  const { control, handleSubmit, reset } = useForm<taskFormData>({
    resolver: zodResolver(createTasksFormSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || "",
    },
  });

  const handleAction = async (data: taskFormData) => {
    try {
      const response = mode === "create"
        ? await createTask({ ...data, status })
        : await updateTask({ uuid: task!.uuid, data: { ...data, status } });

      if (response?.data) {
        onSuccess?.();
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
      
      <label className="text-sm font-medium">Status</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as "PENDING" | "COMPLETED")}
        className="border rounded-md p-2"
      >
        <option value="PENDING">Pendente</option>
        <option value="COMPLETED">Concluído</option>
      </select>

      <Button type="submit" size="sm" className="px-3">
        {mode === "create" ? "Criar" : "Salvar"}
      </Button>
    </form>
  );
}
