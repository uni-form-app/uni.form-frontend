import { api } from "../../../integrations/api";
import qs from 'qs';
import { ProductImage } from "../../Products/components/models";

export type OrderStatus = "pending" | "payment_confirmed" | "on_delivery" | "delivered" | "cancelled";

export interface Order {
  id: string
  product: {
    id: string;
    name: string;
    price: string;
    productImage: ProductImage[]
  };
  partner: {
    id: string;
    address: string;
    city: string;
  };
  status: OrderStatus;
  confirmedAt: string | null;
  createdAt: string;
}

export interface OrderArgs {
  status?: OrderStatus | OrderStatus[];
}

export const orders = async (args: OrderArgs) => {
  const { status } = args
  const response = await api.get<Order[]>(`/orders/`, {
    params: {
      status
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
  return response.data;
};

interface PaymentArgs {
  orderId: string
}

export const payment = async (args: PaymentArgs) => {
  return api.post(`/orders/${args.orderId}/pay`)
}