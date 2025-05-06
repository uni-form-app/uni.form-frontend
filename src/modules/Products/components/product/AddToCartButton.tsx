import React from "react";
import { Button } from "../../../../components/ui/button";

interface AddToCartButtonProps {
  onAddToCart: () => void;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ onAddToCart }) => {
  return (
    <Button className="w-full" variant="default" onClick={onAddToCart}>
      Adicionar ao carrinho
    </Button>
  );
};