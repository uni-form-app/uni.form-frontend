import { useMutation } from '@tanstack/react-query';
import * as service from '../services';

export const useAuth = () => {
  return useMutation({
    mutationFn: service.login
  })
}