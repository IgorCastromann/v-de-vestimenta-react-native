export interface Product {
  name: string;
  image: string;
  price: string;
  description: string;
  department: Department;
  country: string;
  quantity: number;
  id: string;
}

export type Department = "shoes" | "clothes" | "acessory";

const baseUrl = "https://6413209fa68505ea732a0fc8.mockapi.io/api/v1/";
class ProductService {
  public listProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${baseUrl}/products`);
    const products = await response.json();

    return products;
  };
}

const productService = new ProductService();

export default productService;
