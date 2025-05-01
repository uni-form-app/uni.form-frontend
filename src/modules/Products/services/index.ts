import { api } from "../../../integrations/api";
import { Product } from "../components/models";

export const products = async (args: {
  sortBy?: 'price' | 'createdAt' | 'name';
  order?: 'asc' | 'desc';
  search?: string;
}): Promise<Product[]> => {
  const { sortBy, order, search } = args;

  const response = await api.get<Product[]>('/products', {
    params: {
      sortBy,
      order,
      search,
    },
  });

  return response.data;
};

export const product = async (id: string): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};