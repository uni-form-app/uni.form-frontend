import { AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import { PendingOrders } from "../components/PendingOrders";
import { DeliveredOrders } from "../components/DeliveredOrders";

export const PurchasesContainer = () => {
  const pedidos = [
    {
      id: 1,
      produto: {
        id: 1,
        nome: "Camiseta Escolar Azul",
        preco: 35.9,
        imagem: "/placeholder.svg?height=100&width=100",
      },
      status: "pendente",
      dataPedido: "15/04/2023",
      pontoRetirada: {
        nome: "Escola Municipal Central",
        endereco: "Rua das Flores, 123",
      },
    },
    {
      id: 2,
      produto: {
        id: 2,
        nome: "Calça Uniforme Cinza",
        preco: 45.5,
        imagem: "/placeholder.svg?height=100&width=100",
      },
      status: "entregue",
      dataPedido: "10/03/2023",
      dataEntrega: "15/03/2023",
      pontoRetirada: {
        nome: "Papelaria do Bairro",
        endereco: "Av. Principal, 456",
      },
    },
  ];

  const pedidosPendentes = pedidos.filter((pedido) => pedido.status === "pendente");
  const pedidosEntregues = pedidos.filter((pedido) => pedido.status === "entregue");

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">Meus pedidos</h1>

      {pedidos.length === 0 ? (
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
            <TabsTrigger value="pendentes">Pendentes ({pedidosPendentes.length})</TabsTrigger>
            <TabsTrigger value="entregues">Entregues ({pedidosEntregues.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pendentes">
            <PendingOrders pedidosPendentes={pedidosPendentes} />
          </TabsContent>

          <TabsContent value="entregues">
            <DeliveredOrders pedidosEntregues={pedidosEntregues} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};