import { Badge } from "../../../components/ui/badge";
import { Card, CardContent } from "../../../components/ui/card";
import { CheckCircle2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Order } from "../services";

export const OrdersList = ({ orders }: { orders: Order[] }) => {

  const statusMap: Record<string, string> = {
    'PENDING': "Pendente",
    'PAYMENT_CONFIRMED': "Pagamento Confirmado",
    'ON_DELIVERY': "Em Transito",
    'DELIVERED': "Entregue",
    'CANCELLED': "Cancelado"
  }

  return (
    <div className="space-y-4">
      {orders.map((order, i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-20 h-20 rounded overflow-hidden shrink-0">
                <img
                  src={"/placeholder.svg"}
                  alt={order.product.name}
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <Badge className="mb-2 bg-green-500 hover:bg-green-600">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      {statusMap[order.status]}
                    </Badge>
                    <h3 className="font-medium">
                      <Link to={`/product/${order.product.id}`} className="hover:underline">
                        {order.product.name}
                      </Link>
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Entregue em {new Date(order.confirmedAt || new Date()).toLocaleString()}</div>
                    <div className="font-bold">R$ {order.product.price}</div>
                  </div>
                </div>
                <div className="mt-4 flex items-start gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>
                    <p>{order.partner.city} - {order.partner.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};