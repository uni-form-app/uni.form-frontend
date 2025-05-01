import { useQuery } from '@tanstack/react-query';
import * as service from '../services';
import { Product } from '../components/models';

type Params = {
  sortBy?: 'price' | 'createdAt' | 'name';
  order?: 'asc' | 'desc';
  search?: string;
};

export const useProducts = (params: Params) => {
  return useQuery<Product[], Error>({
    queryKey: ['products', params],
    queryFn: () => service.products(params),
  });
}

export const useProduct = (id: string) => {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => service.product(id),
  });
}