import { useState, useCallback, useEffect } from "react"
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
import { useUploadProduct } from "../../queries/queries"

const formSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  preco: z.coerce.number().min(0, "O preço deve ser positivo"),
  descricao: z.string().min(1, "A descrição é obrigatória"),
  imagem: z
    .instanceof(File, { message: "A imagem é obrigatória" })
    .refine((file) => file.size > 0, {
      message: "A imagem não pode estar vazia",
    }).optional(),
})

type FormValues = z.infer<typeof formSchema>

const ImagePreview = ({ preview, onRemove, onFileChange }: { preview: string | null; onRemove: () => void; onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => (
  preview ? (
    <div className="relative aspect-square rounded-md overflow-hidden border">
      <img src={preview} alt="Preview da imagem" className="w-full h-full object-cover" />
      <Button
        type="button"
        variant="destructive"
        size="icon"
        className="absolute top-1 right-1 h-6 w-6"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  ) : (
    <label className="flex flex-col items-center justify-center border border-dashed rounded-md aspect-square cursor-pointer hover:bg-muted/50 transition-colors">
      <div className="flex flex-col items-center justify-center p-4">
        <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
        <span className="text-sm text-muted-foreground text-center">Clique para adicionar</span>
      </div>
      <Input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
    </label>
  )
);

export const CreateProductContainer = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { mutate: uploadProduct, isPending } = useUploadProduct();

  const onSubmit = useCallback((data: FormValues) => {
    uploadProduct(
      {
        name: data.nome,
        price: data.preco,
        description: data.descricao,
        size: "M", // substitua conforme necessário
        school: "Escola Teste", // substitua conforme necessário
        image: data.imagem!,
      },
      {
        onSuccess: () => reset(),
      }
    );
  }, [uploadProduct, reset]);

  const handleImagemPreview = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("imagem", file, { shouldValidate: true });
    }
  }, [setValue]);

  const removerImagem = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setValue("imagem", undefined, { shouldValidate: true });
  }, [preview, setValue]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

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
                <ImagePreview preview={preview} onRemove={removerImagem} onFileChange={handleImagemPreview} />
              </div>
              {errors.imagem && <p className="text-sm text-red-500">{errors.imagem.message}</p>}
              <p className="text-xs text-muted-foreground">
                Adicione uma imagem do produto.
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => reset()}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Publicando..." : "Publicar anúncio"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
