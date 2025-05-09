"use client"

import type React from "react"

import { Link } from "react-router-dom"
import { Button } from "../../../../components/ui/button"
import { useProducts } from "../../queries/queries"
import { Search, ArrowUpDown } from "lucide-react"
import { Input } from "../../../../components/ui/input"
import { ProductCard } from "../../components/product"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu"

export const ProductContainer = () => {
  const [search, setSearch] = useState<string | undefined>(undefined)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [sortBy, setSortBy] = useState<'price' | 'createdAt' | 'name'>("price")

  const { data: products = [] } = useProducts({
    sortBy,
    order: sortOrder,
    search,
  })

  // useEffect(() => {
  //   refetch()
  // }, [search, sortOrder, sortBy])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value || undefined)
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  return (
    <>
      <div className="container mx-auto py-6">
        <section className="mb-10 rounded-lg p-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Uniformes escolares sustentáveis</h1>
            <p className="text-lg mb-6">
              Compre e venda uniformes escolares usados. Economize dinheiro e ajude o meio ambiente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/product/new">Anunciar uniforme</Link>
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
                <Input
                  type="search"
                  placeholder="Buscar uniformes..."
                  className="pl-8"
                  value={search || ""}
                  onChange={handleSearchChange}
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <ArrowUpDown className="h-4 w-4" />
                    <span className="sr-only">Ordenar</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className={sortBy === "price" ? "font-medium" : ""}
                    onClick={() => setSortBy("price")}
                  >
                    Preço {sortBy === "price" && (sortOrder === "asc" ? "(menor para maior)" : "(maior para menor)")}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={sortBy === "name" ? "font-medium" : ""}
                    onClick={() => setSortBy("name")}
                  >
                    Nome {sortBy === "name" && (sortOrder === "asc" ? "(A-Z)" : "(Z-A)")}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={sortBy === "createdAt" ? "font-medium" : ""}
                    onClick={() => setSortBy("createdAt")}
                  >
                    Data {sortBy === "createdAt" && (sortOrder === "asc" ? "(mais antigos)" : "(mais recentes)")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={toggleSortOrder}>
                    Ordem: {sortOrder === "asc" ? "Crescente ↑" : "Decrescente ↓"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
  )
}
