import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { toast } from "../ui/use-toast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateProductFormData, updateProductFormSchema } from "@/schemas/Products/update-product.schema";
import { useState } from "react";
import { ITasks } from "@/interfaces/tasks";
import useUpdateTask from "@/hooks/useUpdateTask";


export default function EditTask({ uuid }: ITasks) {
  const { mutateAsync: updateTask } = useUpdateTask();
  const [isOpen, setIsOpen] = useState(false);

  const { handleSubmit, reset } = useForm<updateProductFormData>({
    resolver: zodResolver(updateProductFormSchema),
  });

  const handleUpdateProduct = async (data: updateProductFormData) => {
    try {
      reset();
      await updateTask({ uuid, data });
      setIsOpen(false);
        
      toast({
        title: "Tarefa editada com sucesso!",
        variant: "default",
      });
      
    } catch (ex: any) {
      toast({
        title: "Não foi possível atualizar a tarefa",
        variant: "destructive",
        description: `${ex.response.data.message || "Erro desconhecido"}!`,
      });
    }
  };

  return (
    <>
      <div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className="w-full">
            <button className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent w-full focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => setIsOpen(true)}>
              Editar
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Dados para atualizar tarefa</DialogTitle>
              <DialogDescription>
                Adicione nos campos abaixo detalhes da tarefa editada.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(handleUpdateProduct)} className="flex flex-col gap-4 my-4">
              {/* <div>
                <TextInput name="name" label="Nome" control={control} placeholder={name} />
              </div>
              <div>
                <TextInput name="description" label="Descrição" control={control} placeholder={description} />
              </div>
              <div>
                <TextInput name="price" label="Preço" control={control} placeholder={`R$${price}`} />
              </div> */}
              <Button type="submit" size="sm" className="px-3">Salvar</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
