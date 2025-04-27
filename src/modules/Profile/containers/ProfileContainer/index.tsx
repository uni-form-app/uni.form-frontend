import { useParams } from 'react-router-dom';
import { ProductList } from '../../../Products/components/product-list';
import { Modal } from '../../../../components/modal';
import { useForm } from 'react-hook-form';
import { Form } from '../../components/form';

type Inputs = {
  name: string;
  description: string;
  size: string;
  school: string;
  price: number;
  image: FileList;
}

export const ProfileContainer = () => {
  const { username } = useParams<{ username: string }>();

  const {
    register,
    handleSubmit,
  } = useForm<Inputs>()

  const onSubmit = (data: Inputs) => {
    console.log(data);

    // Para ver os arquivos:
    console.log(data.image);

    // Exemplo de enviar como FormData:
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('size', data.size);
    formData.append('school', data.school);
    formData.append('price', String(data.price));

    // Para múltiplos arquivos:
    Array.from(data.image).forEach((file) => {
      formData.append('images', file);
    });

    // Agora você pode enviar `formData` com fetch, axios, etc.
  }


  return (
    <>
      <div className="flex items-center justify-between mt-8">
        <p>Anúncios de {username}</p>
        <Modal
          triggerText="Anunciar"
          title="Novo Anúncio"
          description="Preencha as informações para criar um novo anúncio."
          buttonProps={{ variant: "default" }}
        >
          <Form
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </Modal>
      </div>
      <ProductList products={[]} />
    </>
  );
}
