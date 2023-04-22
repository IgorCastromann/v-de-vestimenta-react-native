import { Product } from "@src/services/productService";

export const buildProductMock = (id = "1"): Product => ({
  id,
  name: `product-${id}`,
  price: "10",
  quantity: 1,
  image: "",
  description: "description",
  department: "shoes",
  country: "",
});

export const buildProductsArrayMock = (length: number): Product[] =>
  [...Array(length)].map((_, i) => buildProductMock(i.toString()));
