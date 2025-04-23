import { Product } from "../models";
import { ProductCard } from "../product";

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products, }: ProductListProps) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </>
  );
};
