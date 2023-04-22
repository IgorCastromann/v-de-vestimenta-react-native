import { buildProductMock, buildProductsArrayMock } from "@test/mocks/product";
import { ProductStore } from "./productStore";

describe("ProductStore", () => {
  let productStore: ProductStore;

  beforeEach(() => {
    productStore = new ProductStore();
  });

  describe("addToCart", () => {
    it("should add product to cart list and modal visibility has to be true", () => {
      const product = buildProductMock();

      productStore.addToCart(product);

      expect(productStore.cartList).toEqual([{ ...product, cartQuantity: 1 }]);
      expect(productStore.isModalVisible).toBe(true);
    });
  });

  describe("removeFromCart", () => {
    it("should remove product from cart list and decrease cart quantity", () => {
      const [product1, product2] = buildProductsArrayMock(2);

      productStore.addToCart(product1);
      productStore.addToCart(product2);

      expect(productStore.getCartQuantity()).toBe(2);

      productStore.removeFromCart(product1.id);

      expect(productStore.cartList).toEqual([{ ...product2, cartQuantity: 1 }]);
      expect(productStore.getCartQuantity()).toBe(1);
    });

    it("should remove product from cart list and set cart quantity to 0 if it was the only item in the cart", () => {
      const product = buildProductMock();
      productStore.addToCart(product);

      productStore.removeFromCart(product.id);

      expect(productStore.cartList).toEqual([]);
      expect(productStore.getCartQuantity()).toBe(0);
    });
  });

  describe("getCartQuantity", () => {
    it("should return the sum of the cart quantities of all products in the cart list", () => {
      const [product1, product2, product3] = buildProductsArrayMock(3);

      productStore.addToCart(product1);
      productStore.addToCart(product2);
      productStore.addToCart(product3);

      expect(productStore.getCartQuantity()).toEqual(3);
    });

    it("should return 0 if the cart list is empty", () => {
      expect(productStore.getCartQuantity()).toEqual(0);
    });
  });

  describe("setModalVisibility", () => {
    it("should set the isModalVisible state to the provided value", () => {
      productStore.setModalVisibility(true);

      expect(productStore.isModalVisible).toBeTruthy();

      productStore.setModalVisibility(false);

      expect(productStore.isModalVisible).toBeFalsy();
    });
  });

  describe("setSelectedProduct", () => {
    it("should set the selectedProduct state to the provided product", () => {
      const product = buildProductMock();

      productStore.setSelectedProduct(product);

      expect(productStore.selectedProduct).toEqual(product);
    });
  });

  describe("setSearch", () => {
    it("should set the search state to the provided string", () => {
      productStore.setSearch("test");

      expect(productStore.search).toEqual("test");
    });
  });
});
