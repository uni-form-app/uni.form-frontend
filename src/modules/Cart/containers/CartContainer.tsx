import { useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from '../../../hooks/useCart';
import { useOrders, usePartners } from "../queries/queries";
import { useLocation } from "../../../hooks/useLocation";
import { CartItems } from "../components/CartItems";
import { PickupPoints } from "../components/PickupPoints";
import { OrderSummary } from "../components/OrderSummary";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

type FormValues = {
  productId: string;
  pickupPointId: string;
};

const formSchema = z.object({
  productId: z.string().min(1, { message: "Produto é obrigatório" }),
  pickupPointId: z.string().min(1, { message: "Ponto de retirada é obrigatório" }),
});

export const CartContainer = () => {
  const { cart, removeFromCart } = useCart();

  const {
    handleSubmit,
    control,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (cart) {
      setValue("productId", cart.id);
    }
  }, [cart, setValue]);

  const subtotal = cart ? Number(cart.price) : 0;
  const serviceTax = subtotal * 0.05;
  const total = subtotal + serviceTax;
  const mavigate = useNavigate()


  const { location } = useLocation();
  const { data: partners = [], isLoading } = usePartners({
    lat: location?.latitude,
    lng: location?.longitude,
    radius: 20,
  });

  const { mutate: create } = useOrders()

  const handleRemoveItem = () => {
    removeFromCart();
    setValue("productId", "");
  };

  const handleCheckout = (data: any) => {
    create({
      partnerId: data.pickupPointId,
      ...data,
    })

    handleRemoveItem()

    mavigate('/orders')
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">Carrinho de compras</h1>

      {!cart ? (
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
        <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartItems cart={cart} onRemoveItem={handleRemoveItem} />
            <PickupPoints
              partners={partners}
              control={control}
              name="pickupPointId"
            />
          </div>

          <div>
            <OrderSummary
              subtotal={subtotal}
              serviceTax={serviceTax}
              total={total}
              isLoading={isLoading}
              onCheckout={handleSubmit(handleCheckout)}
            />
          </div>
        </form>
      )}
    </div>
  );
};
