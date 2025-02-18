import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useForm } from "react-hook-form";
import { toast } from "../ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductFormSchema, productFormData } from "@/schemas/Products/products.schema";
import { useState } from "react";
import useCreateTasks from "@/hooks/useCreateTasks";

export default function CreateTask() {
  const { mutateAsync } = useCreateTasks();
  const [isOpen, setIsOpen] = useState(false);

  const { handleSubmit, reset } = useForm<productFormData>({
    resolver: zodResolver(createProductFormSchema),
  });

  const handleCreateProduct = async (data: productFormData) => {
    try {
      reset();
      const response = await mutateAsync(data);

      response && response.success ? setIsOpen(false) : null;
      
      toast({
        title: "Tarefa criada com sucesso!",
        variant: "default",
      });
      
    } catch (ex: any) {
      toast({
        title: "Não foi possível criar a tarefa",
        variant: "destructive",
        description: `${ex.response.data.message || "Erro desconhecido"}!`,
      });
    }
  };

  return (
    <>
      <div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <Button className="space-x-2" onClick={() => setIsOpen(true)}>
              <Plus color="#fff" strokeWidth={2} size={22} />
              Criar Tarefa
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Dados da nova tarefa</DialogTitle>
              <DialogDescription>
                Adicione nos campos abaixo detalhes da tarefa.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(handleCreateProduct)} className="flex flex-col gap-4 my-4">
              {/* add fields here */}
              <Button type="submit" size="sm" className="px-3">Criar</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
