import { useQuery } from "@tanstack/react-query";
import { getPartners } from "../services";
import { Partner } from "..";

// export const usePartners = (params: { lat: number; lng: number; radius: number }) => {
//   return useQuery(["partners", params], () => getPartners(params));
// };

export const usePartners = (params: { lat: number; lng: number; radius: number; search?: string }) => {
  return useQuery<Partner[], Error>({
    queryKey: ["partners", params],
    queryFn: () => getPartners(params),
  })
}