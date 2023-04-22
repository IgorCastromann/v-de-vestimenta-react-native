import { buildProductsArrayMock } from "@test/mocks/product";
import productService from "./productService";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(buildProductsArrayMock(2)),
  })
) as jest.Mock;

describe("ProductService", () => {
  it("should fetch the list of products", async () => {
    const products = await productService.listProducts();
    const idx = "0";

    expect(products.length).toBe(2);
    expect(products[idx].id).toBe(idx);
    expect(products[idx].name).toBe(`product-${idx}`);
  });
});
