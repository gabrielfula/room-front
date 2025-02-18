import { useSearchParams } from "react-router-dom";

export default function StatusFilter() {
     
     const [searchParams, setSearchParams] = useSearchParams();

     const filteredStatus = searchParams.get("status") || "";

     const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
          const status = event.target.value;
          setSearchParams((prev) => {
               if (status) {
                    prev.set("status", status);
               } else {
                    prev.delete("status");
               }
               return prev;
          });
     };

    return (
          <div className="pl-6 flex items-center gap-4">
               <p>Filtrar por</p>
               <select onChange={handleStatusChange} className="border rounded p-2" value={filteredStatus}>
                    <option value="">Status</option>
                    <option value="PENDING">Pendente</option>
                    <option value="COMPLETED">Completo</option>
               </select>
          </div>
    );
}