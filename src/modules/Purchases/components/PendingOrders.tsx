import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export const PendingOrders = ({ pedidosPendentes }: { pedidosPendentes: any[] }) => {
  return (
    <div className="space-y-4">
      {pedidosPendentes.map((pedido) => (
        <Card key={pedido.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-20 h-20 rounded overflow-hidden shrink-0">
                <img
                  src={pedido.produto.imagem || "/placeholder.svg"}
                  alt={pedido.produto.nome}
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <Badge className="mb-2">
                      <Clock className="mr-1 h-3 w-3" />
                      Pendente
                    </Badge>
                    <h3 className="font-medium">
                      <Link to={`/produtos/${pedido.produto.id}`} className="hover:underline">
                        {pedido.produto.nome}
                      </Link>
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Pedido em {pedido.dataPedido}</div>
                    <div className="font-bold">R$ {pedido.produto.preco.toFixed(2).replace(".", ",")}</div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">{pedido.pontoRetirada.nome}</p>
                      <p>{pedido.pontoRetirada.endereco}</p>
                    </div>
                  </div>
                  <Button className="sm:self-end">
                    Confirmar recebimento
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};