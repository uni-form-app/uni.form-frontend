import { Calendar, User } from "lucide-react"
import { Separator } from "../../../../components/ui/separator"

const produto = {
  id: 1,
  nome: "Uniforme Escolar",
  preco: 100.0,
  descricao: "Uniforme escolar em ótimo estado.",
  vendedor: {
    nome: "João Silva",
    avaliacao: 4.5,
  },
  imagens: [
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/301",
    "https://via.placeholder.com/302",
  ],
}

const pontosRetirada = [
  {
    id: 1,
    nome: "Escola Municipal Central",
    endereco: "Rua das Flores, 123 - Centro",
  },
  {
    id: 2,
    nome: "Centro Comunitário Bairro Sul",
    endereco: "Av. Brasil, 456 - Bairro Sul",
  },
]

export const ProductDetailContainer = () => {

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden border">
            <img
              src={produto.imagens[0] || "/placeholder.svg"}
              alt={produto.nome}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{produto.nome}</h1>
            <p className="text-2xl font-bold mt-2">
              R$ {produto.preco.toFixed(2).replace(".", ",")}
            </p>
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
                    25/10/2023
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
