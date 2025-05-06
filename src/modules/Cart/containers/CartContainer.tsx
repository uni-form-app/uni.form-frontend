import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import { useCart } from '../../../hooks/useCart';
import { usePartners } from "../queries/queries";
import { useLocation } from "../../../hooks/useLocation";
import { CartItems } from "../components/CartItems";
import { PickupPoints } from "../components/PickupPoints";
import { OrderSummary } from "../components/OrderSummary";

export const CartContainer = () => {
  const { cart, removeFromCart } = useCart();
  const [selectedPickupPointId, setSelectedPickupPointId] = useState<string>("1");
  const [isLoading, setIsLoading] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + Number(item.price), 0);
  const serviceTax = subtotal * 0.05;
  const total = subtotal + serviceTax;

  const { location } = useLocation();

  const { data: partners = [] } = usePartners({
    lat: location?.latitude,
    lng: location?.longitude,
    radius: 20
  });

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handlePickupPointChange = (value: string) => {
    setSelectedPickupPointId(value);
  };

  const handleCheckout = () => {
    setIsLoading(true);
    // Simulate a request
    setTimeout(() => {
      alert("Purchase completed!");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">Carrinho de compras</h1>

      {cart.length === 0 ? (
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
            <CartItems cart={cart} onRemoveItem={handleRemoveItem} />
            <PickupPoints
              partners={partners}
              selectedPickupPointId={selectedPickupPointId}
              onPickupPointChange={handlePickupPointChange}
            />
          </div>

          <div>
            <OrderSummary
              subtotal={subtotal}
              serviceTax={serviceTax}
              total={total}
              isLoading={isLoading}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      )}
    </div>
  );
};
