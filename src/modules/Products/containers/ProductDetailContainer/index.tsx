import { useCallback, useMemo } from "react";
import { Separator } from "../../../../components/ui/separator";
import { useParams } from "react-router-dom";
import { useProduct } from "../../queries/queries";
import { useCart } from "../../../../hooks/useCart";
import { ProductImage } from "../../components/product/ProductImage";
import { ProductInfo } from "../../components/product/ProductInfo";
import { SellerInfo } from "../../components/product/SellerInfo";
import { AddToCartButton } from "../../components/product/AddToCartButton";

export const ProductDetailContainer = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const { data: product, isLoading, error } = useProduct(id || "");

  const imageUrl = useMemo(() => {
    if (product?.ProductImages?.[0]?.path) {
      return `http://localhost:8080/public/${product.ProductImages[0].path}`;
    }
    return "";
  }, [product]);

  const handleAddToCart = useCallback(() => {
    if (product) {
      addToCart(product);
    }
  }, [addToCart, product]);

  if (isLoading) {
    return <div>Carregando produto...</div>;
  }

  if (error || !product) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImage imageUrl={imageUrl} altText={product.name} />

        <div className="space-y-6">
          <ProductInfo
            name={product.name}
            price={product.price}
            description={product.description}
          />
          <Separator />
          <SellerInfo
            sellerName={"Implementar"}
          />
          <Separator />
          <AddToCartButton onAddToCart={handleAddToCart} />
        </div>
      </div>
    </div>
  );
};
