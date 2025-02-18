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
import { useState } from "react";
import FormTask from "../FormTask/FormTask";


export default function CreateTask() {
 
  const [isOpen, setIsOpen] = useState(false);

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
            <FormTask mode="create" />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
