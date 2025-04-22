import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

export const LoginContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <Card className="w-full max-w-sm shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">Acesse a plataforma</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Faça login ou registre-se para começar a vender e comprar ainda hoje.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-4">
          <Input placeholder="Digite seu email" type="email" />
          <Input placeholder="Digite sua senha" type="password" />

          <div className="text-end">
            <a href="#" className="text-sm font-medium text-primary hover:underline">
              Esqueceu sua senha?
            </a>
          </div>

          <Button className="mt-2 w-full">Entrar</Button>

          <p className="text-sm text-center text-muted-foreground mt-4">
            Ainda não tem uma conta?{" "}
            <a href="#" className="text-primary font-medium hover:underline">
              Cadastre-se
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
