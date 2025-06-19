type Product = {
  id: number;
  name: string;
  price: number;
};

type Category = {
  id: number;
  name: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Product 1",
    price: 30.0,
  },
  {
    id: 2,
    name: "Product 2",
    price: 50.0,
  },
  {
    id: 3,
    name: "Product 3",
    price: 70.0,
  },
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Electronics",
  },
  {
    id: 2,
    name: "Beauty",
  },
  {
    id: 3,
    name: "Gardening",
  },
];
