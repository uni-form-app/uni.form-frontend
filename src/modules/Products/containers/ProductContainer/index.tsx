// containers/ProductContainer.tsx
import { ProductList } from "../../components/product-list";
import { useProducts } from "../../queries/queries";

export const ProductContainer = () => {
  const { data: products = [] } = useProducts({
    sortBy: "price",
    order: "asc",
  });

  return (
    <>
      <div className="flex items-center justify-between mt-8">
        <p>Seleção de hoje</p>
        <p>
          Curitiba, <span className="text-blue-600">120km</span>
        </p>
      </div>
      <ProductList
        products={products}
      />
    </>
  );
};
