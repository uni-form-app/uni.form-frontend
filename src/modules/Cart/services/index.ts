import { api } from "../../../integrations/api";

export interface Partners {
  lat?: number,
  lng?: number,
  radius?: number
}

interface Response {
  id: string;
  name: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  ownerId: string;
  createdAt: string;
  distance?: number;
}


export const partners = async (args: Partners) => {
  const response = await api.get<Response[]>('/partners', {
    params: { ...args }
  });
  return response.data;
};