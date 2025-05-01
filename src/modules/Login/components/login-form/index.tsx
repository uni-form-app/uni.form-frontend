// components/LoginForm.tsx
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Label } from "../../../../components/ui/label";

type LoginData = {
  username: string;
  password: string;
};

type LoginFormProps = {
  register: UseFormRegister<LoginData>;
  errors: FieldErrors<LoginData>;
  onSubmit: () => void;
  isPending?: boolean;
};

export const LoginForm = ({ register, errors, onSubmit, isPending = false }: LoginFormProps) => (
  <Card className="w-[400px] mx-auto mt-20">
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>Entre com seu nome de usuário e senha.</CardDescription>
    </CardHeader>
    <form onSubmit={onSubmit}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Usuário</Label>
          <Input
            id="username"
            {...register("username")}
            placeholder="Digite seu nome de usuário"
          />
          <p className="text-sm text-red-500">{errors.username?.message}</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Digite sua senha"
          />
          <p className="text-sm text-red-500">{errors.password?.message}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Entrando..." : "Entrar"}
        </Button>
      </CardFooter>
    </form>
  </Card>
);
