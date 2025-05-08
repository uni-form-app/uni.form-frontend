import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Order } from "../services";
import { usePayment } from "../queries/queries";

export const PendingOrders = ({ orders }: { orders: Order[] }) => {
  const { mutate: pay } = usePayment()

  const handlePayment = (orderId: string) => {
    pay({ orderId })
  }

  return (
    <div className="space-y-4">
      {orders.map((order, i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-20 h-20 rounded overflow-hidden shrink-0">
                <img
                  src={`http://localhost:8080/public/${order.product.ProductImages[0].path || ""}`}
                  alt={order.product.name}
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <Badge className="mb-2">
                      <Clock className="mr-1 h-3 w-3" />
                      Pagamento pendente
                    </Badge>
                    <h3 className="font-medium">
                      <Link to={`/products/${order.product.id}`} className="hover:underline">
                        {order.product.name}
                      </Link>
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Pedido em {order.confirmedAt}</div>
                    <div className="font-bold">R$ {order.product.price}</div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">{order.partner.city}</p>
                      <p>{order.partner.address}</p>
                    </div>
                  </div>
                  <Button className="sm:self-end" onClick={() => handlePayment(order.id)}>
                    Pagamento
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