import { api } from "../../../integrations/api";
import { Product } from "../components/models";

export const products = async (): Promise<Product[]> => {

  const response = await api.get<Product[]>('/products');

  return response.data;
};
