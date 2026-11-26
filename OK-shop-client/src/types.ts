export type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
};
