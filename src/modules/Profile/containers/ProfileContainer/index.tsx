import { useParams } from 'react-router-dom';
import { ProductList } from '../../../Products/components/product-list';
import { Modal } from '../../../../components/modal';
import { useForm } from 'react-hook-form';
import { Form } from '../../components/form';
import { useCreateProduct } from '../../queries/queries';

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

  const { mutate: create } = useCreateProduct()

  const onSubmit = (data: Inputs) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('size', data.size);
    formData.append('school', data.school);
    formData.append('price', String(data.price));

    Array.from(data.image).forEach((file) => {
      formData.append('image', file);
    });

    create(formData)
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
