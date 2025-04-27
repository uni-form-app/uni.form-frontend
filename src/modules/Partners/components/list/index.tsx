import { Partner } from "../../containers/PartnerContainer";

interface PartnerContainerProps {
  data: Partner[];
  isLoading: boolean;
}

export const PartnerList = (props: PartnerContainerProps) => {
  const { data, isLoading } = props;

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="w-full">
      <ul className="space-y-4">
        {data.map((partner) => (
          <li key={partner.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{partner.name}</h2>
            <p>{partner.address}, {partner.city}</p>
            {partner.distance && (
              <p className="text-sm text-gray-500">
                {partner.distance.toFixed(2)} km
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
};