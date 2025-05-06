import React from "react";
import { Separator } from "../../../../components/ui/separator";

interface ProductInfoProps {
  name: string;
  price: number;
  description: string;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ name, price, description }) => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-2xl font-bold mt-2">R$ {price}</p>
      </div>

      <Separator />

      <div>
        <h2 className="font-medium text-lg mb-2">Descrição</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </>
  );
};