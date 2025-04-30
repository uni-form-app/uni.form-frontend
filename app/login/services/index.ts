import { api } from "@/integrations/api";

export const login = async (args: { username: string; password: string }) => {
  const response = await api.post('/auth/login', { ...args });
  return response.data;
};