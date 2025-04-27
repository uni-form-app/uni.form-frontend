import { useParams } from 'react-router-dom';
import { Button } from '../../../../components/ui/button';
import { ProductList } from '../../../Products/components/product-list';

export const ProfileContainer = () => {
  const { username } = useParams<{ username: string }>();

  console.log(username);

  return (
    <>
      <div className="flex items-center justify-between mt-8">
        <p>Anuncios de {username}</p>
        <Button variant="outline">
          Anunciar
        </Button>
      </div>
      <ProductList
        products={[]}
      />
    </>
  );
}