import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardFooter } from "../../../../components/ui/card"
import { Product } from "../models"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="rounded-sm max-w-[300px]">
      <CardContent>
        <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
          <span className="text-gray-400 text-sm italic">Sem imagem</span>
        </div>

        <div className="flex flex-row justify-between items-center gap-1 mt-4">
          <h2 className="text-md font-semibold text-gray-900">
            {product.name}
          </h2>
          <p className="text-sm font-light">{product.price}</p>
        </div>
      </CardContent>

      <CardFooter className="flex items-center gap-1">
        <Button variant="outline" className="w-full">
          Ver mais
        </Button>
      </CardFooter>
    </Card>
  )
}
