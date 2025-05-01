import { AlertCircle, MapPin, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../../../components/ui/card";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { Label } from "../../../components/ui/label";
import { Separator } from "../../../components/ui/separator";

type Props = {

}
export const CartContainer = () => {
  const itens = [
    {
      id: 1,
      produto: {
        id: 1,
        nome: "Camiseta Escolar Azul",
        preco: 35.9,
        imagem: "/placeholder.svg?height=100&width=100",
      },
      quantidade: 1,
    },
  ]

  const pontoRetiradaSelecionado = [
    { id: 1, nome: "Escola Municipal Central", endereco: "Rua das Flores, 123" },
    { id: 2, nome: "Papelaria do Bairro", endereco: "Av. Principal, 456" },
    { id: 3, nome: "Livraria Educativa", endereco: "Rua dos Livros, 789" },
  ]

  const handlePontoRetiradaChange = (value: string) => {
    console.log("Ponto de retirada selecionado:", value);
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">Carrinho de compras</h1>

      {itens.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
            <ShoppingBag className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-medium mb-2">Seu carrinho está vazio</h2>
          <p className="text-muted-foreground mb-6">Adicione produtos ao seu carrinho para continuar.</p>
          <Button asChild>
            <Link to="/">Explorar produtos</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Itens do carrinho</h2>

                <div className="space-y-6">
                  {itens.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-20 h-20 rounded overflow-hidden shrink-0">
                        <img
                          src={item.produto.imagem || "/placeholder.svg"}
                          alt={item.produto.nome}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">
                              <Link to={`/produtos/${item.produto.id}`} className="hover:underline">
                                {item.produto.nome}
                              </Link>
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">Quantidade: {item.quantidade}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">R$ {item.produto.preco.toFixed(2).replace(".", ",")}</div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-muted-foreground hover:text-destructive"
                              onClick={() => { }}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remover
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Ponto de retirada</h2>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground mb-4">
                    Selecione um ponto de retirada para o seu pedido:
                  </p>

                  <RadioGroup
                    value={pontoRetiradaSelecionado[0].id.toString()}
                    onValueChange={handlePontoRetiradaChange}
                    className="space-y-3"
                  >
                    {pontoRetiradaSelecionado.map((ponto) => (
                      <div
                        key={ponto.id}
                        className={`flex items-start space-x-3 rounded-md border p-3`}
                      >
                        <RadioGroupItem value={ponto.id.toString()} id={`ponto-${ponto.id}`} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={`ponto-${ponto.id}`} className="flex-1 cursor-pointer">
                            <div className="font-medium">{ponto.nome}</div>
                            <div className="text-sm text-muted-foreground flex items-center mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {ponto.endereco}
                            </div>
                          </Label>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Resumo do pedido</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>R$ 200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxa de serviço (5%)</span>
                    <span>R$ 200</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>R$ 200</span>
                  </div>

                  <div className="bg-muted p-3 rounded-md text-sm flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                    <p>
                      Ao finalizar a compra, você concorda com os termos de uso e política de privacidade da plataforma.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Button className="w-full" onClick={() => { }}
                // disabled={isLoading}
                >
                  {/* {isLoading ? "Processando..." : "Finalizar compra"} */}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}