import { Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../../components/ui/card";

interface CartItem {
  id: string;
  name: string;
  price: number;
  ProductImages: { path: string }[];
}

interface CartItemsProps {
  cart: CartItem[];
  onRemoveItem: (productId: string) => void;
}

export const CartItems = ({ cart, onRemoveItem }: CartItemsProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-medium mb-4">Itens do carrinho</h2>
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative w-20 h-20 rounded overflow-hidden shrink-0 bg-gray-100">
                <img
                  src={`http://localhost:8080/public/${item.ProductImages[0]?.path ?? ""}`}
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">
                      <Link to={`/product/${item.id}`} className="hover:underline">
                        {item.name}
                      </Link>
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">R$ {item.price}</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-muted-foreground hover:text-destructive"
                      onClick={() => onRemoveItem(item.id)}
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
  );
};