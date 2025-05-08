import { useMutation, useQuery } from '@tanstack/react-query';
import * as service from '../services';

interface UseOrdersProps {
  status?: service.OrderStatus | service.OrderStatus[];
}

export const useOrders = (props: UseOrdersProps) => {
  return useQuery<service.Order[], Error>({
    queryKey: ['orders', props.status],
    queryFn: () => service.orders({ status: props.status }),
  });
};

export const usePayment = () => {
  return useMutation({
    mutationFn: service.payment,
  })
}

