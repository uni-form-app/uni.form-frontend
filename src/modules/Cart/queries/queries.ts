import { useQuery } from '@tanstack/react-query';
import * as service from '../services';

export const usePartners = (params: service.Partners) => {
  return useQuery({
    queryKey: ['partners', params],
    queryFn: () => service.partners(params),
  })
}