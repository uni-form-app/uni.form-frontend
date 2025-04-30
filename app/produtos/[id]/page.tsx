"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { MapPin, User, Calendar, ArrowLeft } from "lucide-react"

// Dados simulados para o MVP
const produto = {
  id: 1,
  nome: "Camiseta Escolar Azul",
  preco: 35.9,
  descricao:
    "Camiseta escolar azul marinho, tamanho M, usada apenas por 3 meses. Em ótimo estado de conservação, sem manchas ou furos. Ideal para alunos do ensino fundamental.",
  imagens: [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ],
  categoria: "Camiseta",
  vendedor: {
    nome: "Maria Silva",
    avaliacao: 4.8,
    dataRegistro: "Jan 2023",
  },
}

// Pontos de retirada simulados
const pontosRetirada = [
  { id: 1, nome: "Escola Municipal Central", endereco: "Rua das Flores, 123" },
  { id: 2, nome: "Papelaria do Bairro", endereco: "Av. Principal, 456" },
  { id: 3, nome: "Livraria Educativa", endereco: "Rua dos Livros, 789" },
]

export default function ProdutoDetalhes({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [imagemAtiva, setImagemAtiva] = useState(0)
  const [pontoRetiradaSelecionado, setPontoRetiradaSelecionado] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleComprar = () => {
    if (!pontoRetiradaSelecionado) {
      toast({
        title: "Selecione um ponto de retirada",
        description: "É necessário selecionar um ponto de retirada para continuar.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulação de compra para o MVP
    setTimeout(() => {
      setIsLoading(false)
      setIsDialogOpen(false)
      toast({
        title: "Pedido realizado com sucesso!",
        description: "Você será redirecionado para a página de pedidos.",
      })
      router.push("/pedidos")
    }, 1500)
  }

  return (
    <div className="container py-8">
      <Button variant="ghost" className="mb-6 pl-0" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden border">
            <Image
              src={produto.imagens[imagemAtiva] || "/placeholder.svg"}
              alt={produto.nome}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {produto.imagens.map((imagem, index) => (
              <button
                key={index}
                className={`relative w-20 h-20 rounded border overflow-hidden ${
                  index === imagemAtiva ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setImagemAtiva(index)}
              >
                <Image
                  src={imagem || "/placeholder.svg"}
                  alt={`${produto.nome} - imagem ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-2">
              {produto.categoria}
            </Badge>
            <h1 className="text-3xl font-bold">{produto.nome}</h1>
            <p className="text-2xl font-bold mt-2">R$ {produto.preco.toFixed(2).replace(".", ",")}</p>
          </div>

          <Separator />

          <div>
            <h2 className="font-medium text-lg mb-2">Descrição</h2>
            <p className="text-muted-foreground">{produto.descricao}</p>
          </div>

          <Separator />

          <div>
            <h2 className="font-medium text-lg mb-2">Vendedor</h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <User className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">{produto.vendedor.nome}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>⭐ {produto.vendedor.avaliacao}</span>
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {produto.vendedor.dataRegistro}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">Comprar</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Selecione um ponto de retirada</DialogTitle>
                <DialogDescription>
                  Escolha onde deseja retirar o produto após a confirmação da compra.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <RadioGroup
                  value={pontoRetiradaSelecionado}
                  onValueChange={setPontoRetiradaSelecionado}
                  className="space-y-3"
                >
                  {pontosRetirada.map((ponto) => (
                    <Card
                      key={ponto.id}
                      className={`cursor-pointer border ${
                        pontoRetiradaSelecionado === ponto.id.toString() ? "border-primary" : ""
                      }`}
                    >
                      <CardContent className="p-4 flex items-start gap-4">
                        <RadioGroupItem value={ponto.id.toString()} id={`ponto-${ponto.id}`} className="mt-1" />
                        <Label htmlFor={`ponto-${ponto.id}`} className="flex-1 cursor-pointer">
                          <div className="font-medium">{ponto.nome}</div>
                          <div className="text-sm text-muted-foreground flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {ponto.endereco}
                          </div>
                        </Label>
                      </CardContent>
                    </Card>
                  ))}
                </RadioGroup>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isLoading}>
                  Cancelar
                </Button>
                <Button onClick={handleComprar} disabled={!pontoRetiradaSelecionado || isLoading}>
                  {isLoading ? "Processando..." : "Confirmar compra"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
