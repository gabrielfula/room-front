import { TableHead, TableHeader, TableRow } from "../ui/table";

interface ITableHead {
  head: string[]
}

export default function TableHeadRow({ head }: ITableHead) {
  return (
    <TableHeader>
      <TableRow>
        {head.map((item, index) => (
          <TableHead key={index} className="text-center">{item}</TableHead>
        ))}
      </TableRow>
    </TableHeader>  
  )
}
