import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../../../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card"
import { Label } from "../../../../components/ui/label"
import { Input } from "../../../../components/ui/input"
import { Textarea } from "../../../../components/ui/textarea"
import { Upload, X } from "lucide-react"

const formSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  preco: z.coerce.number().min(0, "O preço deve ser positivo"),
  descricao: z.string().min(1, "A descrição é obrigatória"),
  imagens: z.any().optional(), // você pode ajustar isso para validar melhor os arquivos
})

type FormValues = z.infer<typeof formSchema>

export const CreateProductContainer = () => {
  const [imagem, setImagem] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormValues) => {
    console.log("Formulário enviado:", data)
    console.log("Imagem:", imagem)
    // integração com backend
  }

  const handleImagemUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImagem(url)
    }
  }

  const removerImagem = () => {
    setImagem(null)
  }

  return (
    <div className="container py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Novo anúncio</CardTitle>
          <CardDescription>
            Preencha os dados abaixo para criar seu anúncio de uniforme.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome do produto</Label>
              <Input id="nome" {...register("nome")} placeholder="Ex: Camiseta Escolar Azul Tamanho M" />
              {errors.nome && <p className="text-sm text-red-500">{errors.nome.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="preco">Preço (R$)</Label>
              <Input
                id="preco"
                type="number"
                step="0.01"
                min="0"
                {...register("preco")}
                placeholder="0,00"
              />
              {errors.preco && <p className="text-sm text-red-500">{errors.preco.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                rows={4}
                {...register("descricao")}
                placeholder="Descreva detalhes como estado de conservação, tamanho, cor, etc."
              />
              {errors.descricao && <p className="text-sm text-red-500">{errors.descricao.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Imagem do produto</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {imagem && (
                  <div className="relative aspect-square rounded-md overflow-hidden border">
                    <img src={imagem} alt="Imagem do produto" className="w-full h-full object-cover" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={removerImagem}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {!imagem && (
                  <label className="flex flex-col items-center justify-center border border-dashed rounded-md aspect-square cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center justify-center p-4">
                      <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground text-center">Clique para adicionar</span>
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImagemUpload}
                    />
                  </label>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Adicione uma imagem do produto.
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
            <Button type="submit">Publicar anúncio</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
