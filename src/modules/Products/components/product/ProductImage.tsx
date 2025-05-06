import React from "react";

interface ProductImageProps {
  imageUrl: string;
  altText: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ imageUrl, altText }) => {
  return (
    <div className="space-y-4">
      <div className="aspect-square relative rounded-lg overflow-hidden border">
        <img
          src={imageUrl}
          alt={altText}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};