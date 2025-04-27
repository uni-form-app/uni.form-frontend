import { useMutation } from '@tanstack/react-query';
import * as service from '../services';

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (data: FormData) => service.createProduct(data),
  });
}