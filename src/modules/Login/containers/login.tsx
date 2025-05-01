import { useForm } from "react-hook-form";
import { LoginForm } from "../components/login-form";
import { useLogin } from "../queries/queries";
import { useLocalStorage } from "../../../providers/local-storage";
import { useNavigate } from "react-router-dom";

type LoginData = {
  username: string;
  password: string;
};

export const LoginContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const { mutate: login, isPending } = useLogin();
  const { store } = useLocalStorage()
  const navigate = useNavigate();

  const onSubmit = (params: LoginData) => {
    login(
      { ...params },
      {
        onSuccess: (response: { token: string }) => {
          store("token", response.token);
          navigate("/");
        },
      },
    )
  };

  return (
    <LoginForm
      register={register}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      isPending={isPending}
    />
  );
};
