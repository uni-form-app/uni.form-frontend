import { Link } from "react-router-dom"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardFooter } from "../../../../components/ui/card"
import { Product } from "../models"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = "http://localhost:8080/public/" + product.ProductImages[0].path
  return (
    <Link to={`/produtos/${product.id}`} key={product.id}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow pt-0 rounded-sm">
        <div className="aspect-square relative">
          <img src={imageUrl} alt={product.name} className="object-cover" />
        </div>
        <CardContent>
          {/* <Badge variant="outline" className="mb-2">
                      {product.categoria}
                    </Badge> */}
          <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mt-1">{product.description}</p>
        </CardContent>
        <CardFooter className="pt-0 flex justify-between items-center">
          <span className="font-bold text-lg">R$ {product.price}</span>
          <Button variant="secondary" size="sm">
            Ver detalhes
          </Button>
        </CardFooter>
      </Card>
    </Link>

  )
}
