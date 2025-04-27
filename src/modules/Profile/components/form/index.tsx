import { UseFormRegister, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';

type Inputs = {
  name: string;
  description: string;
  size: string;
  school: string;
  price: number;
  image: FileList;
}

type FormProps = {
  register: UseFormRegister<Inputs>;
  handleSubmit: UseFormHandleSubmit<Inputs>;
  onSubmit: SubmitHandler<Inputs>;
}

export const Form = ({ register, handleSubmit, onSubmit }: FormProps) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input {...register("name")} placeholder="Nome" className="border p-2" />
      <Input {...register("description")} placeholder="Descrição" className="border p-2" />
      <Input {...register("size")} placeholder="Tamanho" className="border p-2" />
      <Input {...register("school")} placeholder="Escola" className="border p-2" />
      <Input {...register("price")} type="number" placeholder="Preço" className="border p-2" />
      <Input
        {...register("image")}
        type="file"
        accept="image/*"
        multiple
        className="border p-2"
      />
      <Button type="submit">Criar Anúncio</Button>
    </form>
  );
}
