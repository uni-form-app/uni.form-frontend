import { ProductCard } from "./components/product";


const products = [
  {
    name: "Uniforme completo",
    price: "R$ 260,00",
    rating: 4.6,
  },
  {
    name: "Uniforme completo",
    price: "R$ 260,00",
    rating: 4.6,
  },
  {
    name: "Uniforme completo",
    price: "R$ 260,00",
    rating: 4.6,
  },
  {
    name: "Uniforme completo",
    price: "R$ 260,00",
    rating: 4.6,
  },
  {
    name: "Uniforme completo",
    price: "R$ 260,00",
    rating: 4.6,
  },
]

export const ProductContainer = () => {
  return (
    <>
      <div className="flex items-center justify-between mt-8">
        <p>Seleção de hoje</p>
        <p>Curitiba, <span className="text-blue-600">200km</span></p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </>
  );
}
