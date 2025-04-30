"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Upload, X } from "lucide-react"

const categorias = ["Camiseta", "Calça", "Bermuda", "Moletom", "Jaqueta", "Saia", "Vestido", "Kit", "Outro"]

export default function NovoProduto() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [imagens, setImagens] = useState<string[]>([])

  const handleImagemUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // No MVP, apenas simularemos o upload com URLs de placeholder
      const novasImagens = [...imagens]

      for (let i = 0; i < e.target.files.length; i++) {
        if (novasImagens.length < 5) {
          novasImagens.push(`/placeholder.svg?height=200&width=200&text=Imagem ${novasImagens.length + 1}`)
        }
      }

      setImagens(novasImagens)
    }
  }

  const removerImagem = (index: number) => {
    const novasImagens = [...imagens]
    novasImagens.splice(index, 1)
    setImagens(novasImagens)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (imagens.length === 0) {
      toast({
        title: "Adicione pelo menos uma imagem",
        description: "É necessário adicionar pelo menos uma imagem do produto.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulação de envio para o MVP
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Produto anunciado com sucesso!",
        description: "Seu anúncio foi publicado e já está disponível para venda.",
      })
      router.push("/produtos/meus")
    }, 1500)
  }

  return (
    <div className="container py-8">
      <Button variant="ghost" className="mb-6 pl-0" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Novo anúncio</CardTitle>
          <CardDescription>Preencha os dados abaixo para criar seu anúncio de uniforme.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome do produto</Label>
              <Input id="nome" placeholder="Ex: Camiseta Escolar Azul Tamanho M" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria</Label>
              <Select required>
                <SelectTrigger id="categoria">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preco">Preço (R$)</Label>
              <Input id="preco" type="number" min="0" step="0.01" placeholder="0,00" required />
              <p className="text-xs text-muted-foreground">Deixe 0,00 para doação.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                placeholder="Descreva detalhes como estado de conservação, tamanho, cor, etc."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Imagens do produto</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {imagens.map((imagem, index) => (
                  <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                    <img
                      src={imagem || "/placeholder.svg"}
                      alt={`Imagem ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => removerImagem(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                {imagens.length < 5 && (
                  <label className="flex flex-col items-center justify-center border border-dashed rounded-md aspect-square cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center justify-center p-4">
                      <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground text-center">Clique para adicionar</span>
                    </div>
                    <Input type="file" accept="image/*" className="hidden" onChange={handleImagemUpload} multiple />
                  </label>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Adicione até 5 imagens do produto. A primeira imagem será a principal.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Publicando..." : "Publicar anúncio"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
