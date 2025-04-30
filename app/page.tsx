import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"

// Dados simulados para o MVP
const produtos = [
  {
    id: 1,
    nome: "Camiseta Escolar Azul",
    preco: 35.9,
    descricao: "Camiseta escolar azul marinho, tamanho M, usada apenas por 3 meses.",
    imagem: "/placeholder.svg?height=200&width=200",
    categoria: "Camiseta",
  },
  {
    id: 2,
    nome: "Calça Uniforme Cinza",
    preco: 45.5,
    descricao: "Calça de uniforme escolar cinza, tamanho 12, em ótimo estado.",
    imagem: "/placeholder.svg?height=200&width=200",
    categoria: "Calça",
  },
  {
    id: 3,
    nome: "Moletom Escolar Verde",
    preco: 60.0,
    descricao: "Moletom verde com logo da escola, tamanho G, seminovo.",
    imagem: "/placeholder.svg?height=200&width=200",
    categoria: "Moletom",
  },
  {
    id: 4,
    nome: "Bermuda Uniforme Azul",
    preco: 30.0,
    descricao: "Bermuda de uniforme escolar azul marinho, tamanho 10, usada poucas vezes.",
    imagem: "/placeholder.svg?height=200&width=200",
    categoria: "Bermuda",
  },
  {
    id: 5,
    nome: "Kit Uniforme Completo",
    preco: 120.0,
    descricao: "Kit completo de uniforme escolar, tamanho 14, contém 2 camisetas, 1 calça e 1 bermuda.",
    imagem: "/placeholder.svg?height=200&width=200",
    categoria: "Kit",
  },
  {
    id: 6,
    nome: "Camiseta Educação Física",
    preco: 25.0,
    descricao: "Camiseta para aulas de educação física, tamanho P, como nova.",
    imagem: "/placeholder.svg?height=200&width=200",
    categoria: "Camiseta",
  },
]

export default function Home() {
  return (
    <div className="container mx-auto py-6">
      <section className="mb-10 rounded-lg p-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Uniformes escolares sustentáveis</h1>
          <p className="text-lg mb-6">
            Compre, venda ou doe uniformes escolares usados. Economize dinheiro e ajude o meio ambiente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/produtos/novo">Anunciar uniforme</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#produtos">Ver anúncios</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="produtos" className="mb-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">Uniformes disponíveis</h2>
          <div className="flex w-full md:w-auto gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar uniformes..." className="pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filtrar</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {produtos.map((produto) => (
            <Link href={`/produtos/${produto.id}`} key={produto.id}>
              <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square relative">
                  <Image src={produto.imagem || "/placeholder.svg"} alt={produto.nome} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2">
                    {produto.categoria}
                  </Badge>
                  <h3 className="font-medium text-lg line-clamp-1">{produto.nome}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mt-1">{produto.descricao}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <span className="font-bold text-lg">R$ {produto.preco.toFixed(2).replace(".", ",")}</span>
                  <Button variant="secondary" size="sm">
                    Ver detalhes
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10 bg-slate-50 rounded-lg p-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Como funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <span className="font-bold text-green-600">1</span>
              </div>
              <h3 className="font-medium mb-2">Anuncie seu uniforme</h3>
              <p className="text-sm text-muted-foreground">
                Tire fotos e crie um anúncio com os detalhes do uniforme que deseja vender ou doar.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <span className="font-bold text-green-600">2</span>
              </div>
              <h3 className="font-medium mb-2">Escolha um ponto de retirada</h3>
              <p className="text-sm text-muted-foreground">
                Selecione um dos nossos parceiros locais para entregar e retirar os uniformes.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <span className="font-bold text-green-600">3</span>
              </div>
              <h3 className="font-medium mb-2">Finalize a transação</h3>
              <p className="text-sm text-muted-foreground">
                Após a confirmação da entrega, o pagamento é liberado para o vendedor.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
