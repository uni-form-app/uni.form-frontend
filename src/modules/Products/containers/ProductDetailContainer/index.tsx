import { Calendar, User } from "lucide-react"
import { Separator } from "../../../../components/ui/separator"
import { useParams } from "react-router-dom"
import { useProduct } from "../../queries/queries"
import { Button } from "../../../../components/ui/button"

export const ProductDetailContainer = () => {
  const { id } = useParams()

  if (!id) {
    return <div>Produto não encontrado</div>
  }

  const { data: product } = useProduct(id)

  if (!product) {
    return <div>Produto não encontrado</div>
  }

  const imageUrl = "http://localhost:8080/public/" + product.ProductImages[0].path

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden border">
            <img
              src={imageUrl}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold mt-2">
              R$ {product.price}
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="font-medium text-lg mb-2">Descrição</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <Separator />

          <div>
            <h2 className="font-medium text-lg mb-2">Vendedor</h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <User className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">João</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>⭐ 4</span>
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    25/10/2023
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <Button className="w-full" variant="default">
              Adicionar ao carrinho
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
