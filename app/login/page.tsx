"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "./queries/queries"

const loginSchema = z.object({
  username: z.string().min(1, "Usuário é obrigatório"),
  password: z.string().min(8, "Senha é obrigatória"),
})

const registerSchema = z.object({
  username: z.string().min(1, "Usuário é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
})

type LoginSchema = z.infer<typeof loginSchema>
type RegisterSchema = z.infer<typeof registerSchema>

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { mutate: login, isPending } = useAuth()

  const loginForm = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  })

  const registerForm = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", email: "", password: "" },
  })

  const onSubmitLogin = (data: LoginSchema) => {
    login(data, {
      onSuccess: async (data) => {
        document.cookie = `token=${data.token}; path=/; max-age=86400;`

        toast({ title: "Login realizado", description: "Você será redirecionado." });
        router.push("/")
      },
      onError: () => {
        toast({ title: "Erro no login", description: "Credenciais inválidas.", variant: "destructive" })
      },
    })
  }

  const onSubmitRegister = (data: RegisterSchema) => {
    setTimeout(() => {
      toast({ title: "Conta criada com sucesso!" })
      router.push("/")
    }, 1000)
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Cadastro</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Entre com seu nome de usuário e senha.</CardDescription>
            </CardHeader>
            <form onSubmit={loginForm.handleSubmit(onSubmitLogin)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Usuário</Label>
                  <Controller
                    control={loginForm.control}
                    name="username"
                    render={({ field }) => <Input id="username" {...field} />}
                  />
                  <p className="text-sm text-red-500">{loginForm.formState.errors.username?.message}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Controller
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => <Input id="password" type="password" {...field} />}
                  />
                  <p className="text-sm text-red-500">{loginForm.formState.errors.password?.message}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Entrando..." : "Entrar"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Cadastro</CardTitle>
              <CardDescription>Crie sua conta preenchendo os dados abaixo.</CardDescription>
            </CardHeader>
            <form onSubmit={registerForm.handleSubmit(onSubmitRegister)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-username">Usuário</Label>
                  <Controller
                    control={registerForm.control}
                    name="username"
                    render={({ field }) => <Input id="reg-username" {...field} />}
                  />
                  <p className="text-sm text-red-500">{registerForm.formState.errors.username?.message}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Controller
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => <Input id="email" type="email" {...field} />}
                  />
                  <p className="text-sm text-red-500">{registerForm.formState.errors.email?.message}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Senha</Label>
                  <Controller
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => <Input id="reg-password" type="password" {...field} />}
                  />
                  <p className="text-sm text-red-500">{registerForm.formState.errors.password?.message}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">Criar conta</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
