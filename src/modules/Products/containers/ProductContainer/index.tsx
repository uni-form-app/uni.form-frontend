// containers/ProductContainer.tsx
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { useProducts } from "../../queries/queries";
import { Filter, Search } from "lucide-react";
import { Input } from "../../../../components/ui/input";
import { ProductCard } from "../../components/product";

export const ProductContainer = () => {
  const { data: products = [] } = useProducts({
    sortBy: "price",
    order: "asc",
  });

  return (
    <>
      <div className="container mx-auto py-6">
        <section className="mb-10 rounded-lg p-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Uniformes escolares sustentáveis</h1>
            <p className="text-lg mb-6">
              Compre, venda ou doe uniformes escolares usados. Economize dinheiro e ajude o meio ambiente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/produtos/novo">Anunciar uniforme</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="produtos" className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold">Uniformes disponíveis</h2>
            <div className="flex w-full md:w-auto gap-2">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar uniformes..." className="pl-8" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filtrar</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="mb-10 bg-slate-50 rounded-lg p-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Como funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <span className="font-bold text-green-600">1</span>
                </div>
                <h3 className="font-medium mb-2">Anuncie seu uniforme</h3>
                <p className="text-sm text-muted-foreground">
                  Tire fotos e crie um anúncio com os detalhes do uniforme que deseja vender ou doar.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <span className="font-bold text-green-600">2</span>
                </div>
                <h3 className="font-medium mb-2">Escolha um ponto de retirada</h3>
                <p className="text-sm text-muted-foreground">
                  Selecione um dos nossos parceiros locais para entregar e retirar os uniformes.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <span className="font-bold text-green-600">3</span>
                </div>
                <h3 className="font-medium mb-2">Finalize a transação</h3>
                <p className="text-sm text-muted-foreground">
                  Após a confirmação da entrega, o pagamento é liberado para o vendedor.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
