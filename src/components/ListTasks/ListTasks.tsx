import { ITasks } from "@/interfaces/tasks";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoveHorizontalIcon } from "lucide-react";

import DetailsTask from "../DetailsTask/DetailsTask";
import DeleteTask from "../DeleteTask/DeleteTask";
import EditTask from "../EditTask/EditTask";

export default function ListTasks({ title, description, status, uuid }: ITasks) {
  
  return (
    <TableBody>
      <TableRow className="text-center">
        <TableCell>{title}</TableCell>
        <TableCell>{description}</TableCell>
        <TableCell>{status}</TableCell>
        <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <MoveHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <EditTask 
              uuid={uuid} 
              title={title} 
              description={description}
              status={status}
            />
            <DeleteTask name={title} uuid={uuid} />
            <DetailsTask uuid={uuid} />
          </DropdownMenuContent>
        </DropdownMenu>
        </TableCell>
      </TableRow>
    </TableBody>
  )
}
