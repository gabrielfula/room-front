import Error from "@/components/Error/Error";
import Loading from "@/components/Loading/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useFetchTaskByUuid from "@/hooks/useFetchTaskByUuid";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function DetailsPage() {

  const { uuid } = useParams();

  const { data: response, isLoading, error } = useFetchTaskByUuid(uuid!);

  const navigate = useNavigate()

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return (
    <>
      <Card>
        <div className="flex justify-between items-center pr-16">
          <CardHeader>
            <CardTitle>Detalhes da tarefa</CardTitle>
            <CardDescription>Detalhes específico de cada tarefa.</CardDescription>
          </CardHeader>
          <div>
            <Button className="space-x-2" onClick={() => navigate("/tarefa")}>
              <ArrowLeft color="#fff" strokeWidth={2} size={22} />
              Voltar
            </Button>
          </div>
        </div> 
        <CardContent>
          <div className="mt-7 flex gap-16">
            <div className="flex gap-2">
              <p className="font-bold">Título: </p>
              <p>{response.data.title}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold">Descrição: </p>
              <p>{response.data.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
