import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import { ITasks } from "@/interfaces/tasks";
import FormTask from "../FormTask/FormTask";

type EditTaskProps = {
  task: ITasks
};


export default function EditTask({ task }: EditTaskProps) {

  const [isOpen, setIsOpen] = useState(false);


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
            <FormTask mode="edit" task={task} onSuccess={() => setIsOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
