import { MapPin } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { Label } from "../../../components/ui/label";
import { Control, Controller } from "react-hook-form";

interface Partner {
  id: string;
  name: string;
  address: string;
  distance?: number;
}

interface PickupPointsProps {
  partners: Partner[];
  control: Control<any>;
  name: string;
}

export const PickupPoints = ({ partners, control, name }: PickupPointsProps) => {
  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <h2 className="text-lg font-medium mb-4">Ponto de retirada</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Selecione um ponto de retirada para o seu pedido:
        </p>

        <Controller
          control={control}
          name={name}
          render={({ field, fieldState: { error } }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="space-y-3"
            >
              {partners.map((partner) => (
                <div key={partner.id} className="flex items-center space-x-3 rounded-md border p-3">
                  <RadioGroupItem
                    defaultChecked
                    value={partner.id.toString()}
                    id={`ponto-${partner.id}`}
                    className="mt-1"
                  />
                  {error && <p className="text-red-600 text-sm mt-1">{error.message}</p>}
                  <div className="flex-1">
                    <Label htmlFor={`ponto-${partner.id}`} className="flex-1 cursor-pointer">
                      <div className="font-sm">{partner.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {partner.address} - {partner.distance}km
                      </div>
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
          )}
        />
      </CardContent>
    </Card>
  );
};
