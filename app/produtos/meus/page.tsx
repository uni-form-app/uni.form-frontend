"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { Plus, MoreVertical, Edit, Trash, AlertCircle } from "lucide-react"

// Dados simulados para o MVP
const meusAnuncios = [
  {
    id: 1,
    nome: "Camiseta Escolar Azul",
    preco: 35.9,
    descricao: "Camiseta escolar azul marinho, tamanho M, usada apenas por 3 meses.",
    imagem: "/placeholder.svg?height=200&width=200",
    categoria: "Camiseta",
    status: "ativo",
  },
  {
    id: 2,
    nome: "Calça Uniforme Cinza",
    preco: 45.5,
    descricao: "Calça de uniforme escolar cinza, tamanho 12, em ótimo estado.",
    imagem: "/placeholder.svg?height=200&width=200",
    categoria: "Calça",
    status: "ativo",
  },
  {
    id: 3,
    nome: "Moletom Escolar Verde",
    preco: 60.0,
    descricao: "Moletom verde com logo da escola, tamanho G, seminovo.",
    imagem: "/placeholder.svg?height=200&width=200",
    categoria: "Moletom",
    status: "vendido",
  },
]

export default function MeusAnuncios() {
  const { toast } = useToast()
  const [anuncios, setAnuncios] = useState(meusAnuncios)
  const [anuncioParaExcluir, setAnuncioParaExcluir] = useState<number | null>(null)

  const excluirAnuncio = () => {
    if (anuncioParaExcluir) {
      setAnuncios(anuncios.filter((anuncio) => anuncio.id !== anuncioParaExcluir))
      toast({
        title: "Anúncio excluído",
        description: "O anúncio foi excluído com sucesso.",
      })
      setAnuncioParaExcluir(null)
    }
  }

  const anunciosAtivos = anuncios.filter((anuncio) => anuncio.status === "ativo")
  const anunciosVendidos = anuncios.filter((anuncio) => anuncio.status === "vendido")

  return (
    <div className="container py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold">Meus anúncios</h1>
        <Button asChild>
          <Link href="/produtos/novo">
            <Plus className="mr-2 h-4 w-4" />
            Novo anúncio
          </Link>
        </Button>
      </div>

      {anuncios.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
            <AlertCircle className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-medium mb-2">Nenhum anúncio encontrado</h2>
          <p className="text-muted-foreground mb-6">Você ainda não possui nenhum anúncio publicado.</p>
          <Button asChild>
            <Link href="/produtos/novo">
              <Plus className="mr-2 h-4 w-4" />
              Criar anúncio
            </Link>
          </Button>
        </div>
      ) : (
        <Tabs defaultValue="ativos" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="ativos">Ativos ({anunciosAtivos.length})</TabsTrigger>
            <TabsTrigger value="vendidos">Vendidos ({anunciosVendidos.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="ativos">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {anunciosAtivos.map((anuncio) => (
                <Card key={anuncio.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <Image
                      src={anuncio.imagem || "/placeholder.svg"}
                      alt={anuncio.nome}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="mb-2">
                        {anuncio.categoria}
                      </Badge>
                      <AlertDialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="-mr-2">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Ações</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/produtos/editar/${anuncio.id}`} className="cursor-pointer">
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Editar</span>
                              </Link>
                            </DropdownMenuItem>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                className="text-destructive cursor-pointer"
                                onClick={() => setAnuncioParaExcluir(anuncio.id)}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Excluir</span>
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir anúncio</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir este anúncio? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={excluirAnuncio}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    <h3 className="font-medium text-lg line-clamp-1">{anuncio.nome}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mt-1">{anuncio.descricao}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <span className="font-bold text-lg">R$ {anuncio.preco.toFixed(2).replace(".", ",")}</span>
                    <Button variant="secondary" size="sm" asChild>
                      <Link href={`/produtos/${anuncio.id}`}>Ver anúncio</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vendidos">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {anunciosVendidos.map((anuncio) => (
                <Card key={anuncio.id} className="overflow-hidden opacity-75">
                  <div className="aspect-square relative">
                    <Image
                      src={anuncio.imagem || "/placeholder.svg"}
                      alt={anuncio.nome}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <Badge className="text-lg py-1 px-3">Vendido</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2">
                      {anuncio.categoria}
                    </Badge>
                    <h3 className="font-medium text-lg line-clamp-1">{anuncio.nome}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mt-1">{anuncio.descricao}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <span className="font-bold text-lg">R$ {anuncio.preco.toFixed(2).replace(".", ",")}</span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
