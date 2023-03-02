export type Rating = {
  rate: number;
  count: number;
};

export type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  rating: Rating;
};
