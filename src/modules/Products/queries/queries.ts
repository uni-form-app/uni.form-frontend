import { useQuery } from '@tanstack/react-query';
import * as service from '../services';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: service.products
  })
}