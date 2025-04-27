import { useMutation, useQuery } from "@tanstack/react-query";
import * as services from "../services";
import { Partner } from "../containers/PartnerContainer";
import { Create } from "../services/types";


export const usePartners = (params: { lat?: number; lng?: number; radius?: number; search?: string }) => {
  return useQuery<Partner[], Error>({
    queryKey: ["partners", params],
    queryFn: () => services.getPartners(params),
  })
}

export const useCreatePartner = () => {
  return useMutation({
    mutationFn: (data: Create) => services.createPartner(data),
  });
}