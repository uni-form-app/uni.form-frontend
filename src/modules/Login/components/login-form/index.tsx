// components/LoginForm.tsx
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type LoginData = {
  username: string;
  password: string;
};

type LoginFormProps = {
  register: UseFormRegister<LoginData>;
  errors: FieldErrors<LoginData>;
  onSubmit: () => void;
};

export const LoginForm = ({ register, errors, onSubmit }: LoginFormProps) => (
  <div className="flex flex-col items-center justify-center h-screen w-screen">
    <Card className="w-full max-w-sm shadow-2xl">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold">Acesse a plataforma</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Faça login ou registre-se para começar a vender e comprar ainda hoje.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-4">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <Input
              placeholder="Digite seu usuário"
              type="text"
              {...register("username", {
                required: "O usuario é obrigatório",
              })}
            />
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Digite sua senha"
              type="password"
              {...register("password", {
                required: "A senha é obrigatória",
                minLength: {
                  value: 8,
                  message: "A senha deve ter no mínimo 8 caracteres",
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="text-end">
            <a href="#" className="text-sm font-medium text-primary hover:underline">
              Esqueceu sua senha?
            </a>
          </div>

          <Button className="mt-2 w-full" type="submit">
            Entrar
          </Button>
        </form>

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
