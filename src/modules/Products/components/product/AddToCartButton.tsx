import React from "react";
import { Button } from "../../../../components/ui/button";
import { Link } from "react-router-dom";

interface AddToCartButtonProps {
  onAddToCart: () => void;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ onAddToCart }) => {
  return (
    <Button asChild className="w-full" variant="default">
      <Link to="/cart" onClick={onAddToCart}>
        Adicionar ao carrinho
      </Link>
    </Button>
  );
};