import { AlertCircle, Badge, CheckCircle2, Clock, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../../components/ui/card";


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
  ]


  const pedidosPendentes = pedidos.filter((pedido) => pedido.status === "pendente")
  const pedidosEntregues = pedidos.filter((pedido) => pedido.status === "entregue")


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
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Confirmar recebimento
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="entregues">
            <div className="space-y-4">
              {pedidosEntregues.map((pedido) => (
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
                            <Badge className="mb-2 bg-green-500 hover:bg-green-600">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Entregue
                            </Badge>
                            <h3 className="font-medium">
                              <Link to={`/produtos/${pedido.produto.id}`} className="hover:underline">
                                {pedido.produto.nome}
                              </Link>
                            </h3>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Entregue em {pedido.dataEntrega}</div>
                            <div className="font-bold">R$ {pedido.produto.preco.toFixed(2).replace(".", ",")}</div>
                          </div>
                        </div>
                        <div className="mt-4 flex items-start gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">{pedido.pontoRetirada.nome}</p>
                            <p>{pedido.pontoRetirada.endereco}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}