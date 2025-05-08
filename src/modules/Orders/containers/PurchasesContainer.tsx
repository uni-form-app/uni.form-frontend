import { AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import { PendingOrders } from "../components/PendingOrders";
import { useOrders } from "../queries/queries";
import { OrdersList } from "../components/Orders";

export const OrdersContainer = () => {
  const { data: pendingOrders = [] } = useOrders({
    status: ['pending']
  });

  const { data: Orders = [] } = useOrders({
    status: ['delivered', "cancelled", "on_delivery", "payment_confirmed"]
  });

  const hasNoOrders = pendingOrders.length === 0 && Orders.length === 0;

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">Meus pedidos</h1>

      {hasNoOrders ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
            <AlertCircle className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-medium mb-2">Nenhum pedido encontrado</h2>
          <p className="text-muted-foreground mb-6">Você ainda não realizou nenhum pedido.</p>
          <Button asChild>
            <Link to="/">Explorar produtos</Link>
          </Button>
        </div>
      ) : (
        <Tabs defaultValue="pendentes" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="pendentes">Pendentes ({pendingOrders.length})</TabsTrigger>
            <TabsTrigger value="others">outros ({Orders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pendentes">
            <PendingOrders orders={pendingOrders} />
          </TabsContent>

          <TabsContent value="others">
            <OrdersList orders={Orders} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
