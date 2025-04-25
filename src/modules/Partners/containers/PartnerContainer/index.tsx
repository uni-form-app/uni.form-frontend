import { useLocation } from "../../../../hooks/useLocation";
import { PartnerList } from "../../components/list";
import { usePartners } from "../../queries/queries";

export interface Partner {
  id: string;
  name: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
}

export const PartnerContainer = () => {
  const { location } = useLocation();
  const radius = 100; // TODO: pegar dinamicamente

  const { data: partners = [], isLoading } = usePartners({
    lat: location?.latitude || 0,
    lng: location?.longitude || 0,
    radius,
  });

  return (
    <PartnerList
      data={partners}
      isLoading={isLoading}
    />
  )
};
