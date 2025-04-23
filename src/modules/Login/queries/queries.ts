import { useMutation } from '@tanstack/react-query';
import * as service from '../services';

export const useLogin = () => {
  return useMutation({
    mutationFn: service.login
  })
}