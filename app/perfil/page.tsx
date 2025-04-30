"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Wallet, CreditCard, ArrowDownUp } from "lucide-react"

// Dados simulados para o MVP
const transacoes = [
  {
    id: 1,
    tipo: "entrada",
    valor: 45.5,
    descricao: "Venda: Calça Uniforme Cinza",
    data: "15/03/2023",
  },
  {
    id: 2,
    tipo: "saida",
    valor: 35.9,
    descricao: "Compra: Camiseta Escolar Azul",
    data: "15/04/2023",
  },
  {
    id: 3,
    tipo: "taxa",
    valor: 2.28,
    descricao: "Taxa de serviço (5%)",
    data: "15/03/2023",
  },
]

export default function Perfil() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [saldo, setSaldo] = useState(7.32)

  const atualizarPerfil = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulação para o MVP
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      })
    }, 1500)
  }

  const sacarSaldo = () => {
    setIsLoading(true)

    // Simulação para o MVP
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Solicitação de saque enviada",
        description: "O valor será transferido para sua conta em até 3 dias úteis.",
      })
      setSaldo(0)
    }, 1500)
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">Meu perfil</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="dados" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="dados">Dados pessoais</TabsTrigger>
              <TabsTrigger value="endereco">Endereço</TabsTrigger>
            </TabsList>

            <TabsContent value="dados">
              <Card>
                <CardHeader>
                  <CardTitle>Dados pessoais</CardTitle>
                  <CardDescription>Atualize suas informações pessoais.</CardDescription>
                </CardHeader>
                <form onSubmit={atualizarPerfil}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome</Label>
                        <Input id="nome" defaultValue="Maria" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sobrenome">Sobrenome</Label>
                        <Input id="sobrenome" defaultValue="Silva" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" defaultValue="maria@exemplo.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input id="telefone" type="tel" defaultValue="(11) 98765-4321" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input id="cpf" defaultValue="123.456.789-00" required />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Salvando..." : "Salvar alterações"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="endereco">
              <Card>
                <CardHeader>
                  <CardTitle>Endereço</CardTitle>
                  <CardDescription>Atualize seu endereço de entrega.</CardDescription>
                </CardHeader>
                <form onSubmit={atualizarPerfil}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cep">CEP</Label>
                        <Input id="cep" defaultValue="01234-567" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="numero">Número</Label>
                        <Input id="numero" defaultValue="123" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="logradouro">Logradouro</Label>
                      <Input id="logradouro" defaultValue="Rua das Flores" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="complemento">Complemento</Label>
                      <Input id="complemento" defaultValue="Apto 101" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bairro">Bairro</Label>
                        <Input id="bairro" defaultValue="Centro" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cidade">Cidade</Label>
                        <Input id="cidade" defaultValue="São Paulo" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estado">Estado</Label>
                      <Input id="estado" defaultValue="SP" required />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Salvando..." : "Salvar alterações"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Meu saldo</CardTitle>
              <CardDescription>Gerencie seu saldo na plataforma.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Saldo disponível</span>
                </div>
                <span className="text-2xl font-bold">R$ {saldo.toFixed(2).replace(".", ",")}</span>
              </div>

              <Separator className="my-4" />

              <Button onClick={sacarSaldo} disabled={saldo <= 0 || isLoading} className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                {isLoading ? "Processando..." : "Sacar saldo"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Histórico de transações</CardTitle>
              <CardDescription>Suas transações recentes na plataforma.</CardDescription>
            </CardHeader>
            <CardContent>
              {transacoes.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">Nenhuma transação encontrada.</p>
              ) : (
                <div className="space-y-4">
                  {transacoes.map((transacao) => (
                    <div key={transacao.id} className="flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <div
                          className={`rounded-full p-2 ${
                            transacao.tipo === "entrada"
                              ? "bg-green-100 text-green-600"
                              : transacao.tipo === "saida"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-red-100 text-red-600"
                          }`}
                        >
                          <ArrowDownUp className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{transacao.descricao}</p>
                          <p className="text-sm text-muted-foreground">{transacao.data}</p>
                        </div>
                      </div>
                      <span
                        className={`font-medium ${transacao.tipo === "entrada" ? "text-green-600" : "text-red-600"}`}
                      >
                        {transacao.tipo === "entrada" ? "+" : "-"}
                        R$ {transacao.valor.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
