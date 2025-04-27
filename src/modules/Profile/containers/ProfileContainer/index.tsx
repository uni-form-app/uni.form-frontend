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
}

export const ProfileContainer = () => {
  const { username } = useParams<{ username: string }>();

  const {
    register,
    handleSubmit,
  } = useForm<Inputs>()

  const onSubmit = (data: Inputs) => {
    console.log(data);
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
