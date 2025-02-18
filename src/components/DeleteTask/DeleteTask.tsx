import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "../ui/use-toast";
import useDeleteTask from "@/hooks/useDeleteTask";

interface IDeleteTask {
  name: string;
  uuid: string;
}

export default function DeleteTask({ name, uuid }: IDeleteTask) {

  const { mutateAsync: deleteTask } = useDeleteTask();

  const handleDelete = async (uuid: string) => {

    try {
      await deleteTask(uuid);

      toast({
        title: "Excluído",
        variant: "default",
        description: "Tarefa excluída com sucesso",
      });
    } catch (ex: any) {
      toast({
        title: "Não foi possível criar a Tarefa",
        variant: "destructive",
        description: `${ex.response.data.message || "Erro desconhecido"}!`,
      });
    }
  }

  return (
    <>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <button className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent w-full focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              Deletar
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirmar exclusão</DialogTitle>
              <DialogDescription>
                Você tem certeza que deseja excluir a tarefa <span className="font-semibold">{name}</span> ?
              </DialogDescription>
            </DialogHeader>
            <div>
              <Button type="submit" size="sm" className="px-3" onClick={() => handleDelete(uuid)}>Excluir</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
