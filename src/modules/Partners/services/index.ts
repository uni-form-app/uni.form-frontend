import { Partner } from "..";
import { api } from "../../../integrations/api";

export const getPartners = async (args: {
  lat: number;
  lng: number;
  radius: number;
  search?: string;
}): Promise<Partner[]> => {
  const { lat, lng, radius, search } = args;
  const response = await api.get<Partner[]>("/partners", {
    params: { lat, lng, radius, search },
  });
  return response.data;
};