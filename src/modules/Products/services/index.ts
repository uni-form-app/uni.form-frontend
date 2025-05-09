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


type UploadProductArgs = {
  image: File;
  name: string;
  description: string;
  size: string;
  school: string;
  price: number;
};

export const uploadProduct = async (args: UploadProductArgs): Promise<Product> => {
  const formData = new FormData();
  formData.append("image", args.image);
  formData.append("name", args.name);
  formData.append("description", args.description);
  formData.append("size", args.size);
  formData.append("school", args.school);
  formData.append("price", String(args.price));

  const response = await api.post<Product>("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};