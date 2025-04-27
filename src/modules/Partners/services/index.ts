import { api } from "../../../integrations/api";
import { Partner } from "../containers/PartnerContainer";
import { Create } from "./types";

export const getPartners = async (args: {
  lat?: number;
  lng?: number;
  radius?: number;
  search?: string;
}): Promise<Partner[]> => {
  const { lat, lng, radius, search } = args;
  const response = await api.get<Partner[]>("/partners", {
    params: { lat, lng, radius, search },
  });
  return response.data;
};

export const createPartner = async (data: Create) => {
  const response = await api.post("/partners", data);
  return response.data;
};