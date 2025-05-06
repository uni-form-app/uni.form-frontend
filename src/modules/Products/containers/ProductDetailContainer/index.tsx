import { Separator } from "../../../../components/ui/separator";
import { useParams } from "react-router-dom";
import { useProduct } from "../../queries/queries";
import { useCart } from '../../../../hooks/useCart';
import { ProductImage } from "../../components/product/ProductImage";
import { ProductInfo } from "../../components/product/ProductInfo";
import { SellerInfo } from "../../components/product/SellerInfo";
import { AddToCartButton } from "../../components/product/AddToCartButton";

export const ProductDetailContainer = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  if (!id) {
    return <div>Produto não encontrado</div>;
  }

  const { data: product } = useProduct(id);

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  const imageUrl = "http://localhost:8080/public/" + product.ProductImages[0].path;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImage imageUrl={imageUrl} altText={product.name} />

        <div className="space-y-6">
          <ProductInfo name={product.name} price={product.price} description={product.description} />
          <Separator />
          <SellerInfo sellerName="João" rating={4} joinDate="25/10/2023" />
          <Separator />
          <AddToCartButton onAddToCart={handleAddToCart} />
        </div>
      </div>
    </div>
  );
};
