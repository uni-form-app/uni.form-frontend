import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardFooter } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { Button } from "../../../components/ui/button";

interface OrderSummaryProps {
  subtotal: number;
  serviceTax: number;
  total: number;
  isLoading: boolean;
  onCheckout: () => void;
}

export const OrderSummary = ({ subtotal, serviceTax, total, isLoading, onCheckout }: OrderSummaryProps) => {
  return (
    <Card className="sticky top-20">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-lg font-medium mb-4">Resumo do pedido</h2>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Taxa de serviço (5%)</span>
          <span>R$ {serviceTax.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
        <div className="bg-muted p-3 rounded-md text-sm flex items-start gap-2">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <p>
            Ao finalizar a compra, você concorda com os termos de uso e política de privacidade da plataforma.
          </p>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Button className="w-full" onClick={onCheckout} disabled={isLoading}>
          {isLoading ? "Processando..." : "Finalizar compra"}
        </Button>
      </CardFooter>
    </Card>
  );
};