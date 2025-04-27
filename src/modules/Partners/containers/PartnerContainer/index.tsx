import { useForm } from "react-hook-form";
import { Modal } from "../../../../components/modal";
import { useLocation } from "../../../../hooks/useLocation";
import { Form } from "../../components/form";
import { PartnerList } from "../../components/list";
import { useCreatePartner, usePartners } from "../../queries/queries";

type Inputs = {
  name: string;
  address: string;
  city: string;
}
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
    lat: location?.latitude,
    lng: location?.longitude,
    radius,
  });

  const {
    register,
    handleSubmit,
  } = useForm<Inputs>()

  const { mutate: create } = useCreatePartner();

  const onSubmit = (data: Inputs) => {
    if (!location) {
      return;
    }

    create({
      ...data,
      latitude: location?.latitude,
      longitude: location?.longitude,
    });
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold mb-4">Parceiros Próximos</h1>
        <Modal
          triggerText="Seja um Parceiro"
          title="Novo Parceiro"
          description="Preencha as informações para adicionar um novo parceiro."
          buttonProps={{ variant: "default" }}
        >
          <Form
            onSubmit={onSubmit}
            register={register}
            handleSubmit={handleSubmit}
          />
        </Modal>
      </div>
      <PartnerList
        data={partners}
        isLoading={isLoading}
      />
    </div>
  )
};
