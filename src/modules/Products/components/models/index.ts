export type Product = {
  id: string;
  name: string;
  description: string;
  size: string;
  school: string;
  condition: number;
  price: number;
  status: 'AVAILABLE' | 'UNAVAILABLE' | string;
  createdAt: string;
  sellerId: string;
  ProductImages: any[];
}