import { api } from "../../../integrations/api";

export const createProduct = async (data: FormData) => {
  const response = await api.post('/products', data);
  return response.data;
};
