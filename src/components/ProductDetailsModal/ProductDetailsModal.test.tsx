import { RootStackScreenComponent } from "@src/routes/types";
import productStore from "@src/store/productStore";
import { buildProductMock } from "@test/mocks/product";
import { renderWithProvider } from "@test/render";
import ProductDetailsModal from ".";
import { ProductDetailsModalController } from "./controller";

const mockNavigation = {} as RootStackScreenComponent<"Home">["navigation"];

const product = buildProductMock();

describe("<ProductDetailsModal />", () => {
  it("renders the product name and description", () => {
    const { getByText } = renderWithProvider(
      <ProductDetailsModal navigation={mockNavigation} product={product} />
    );

    expect(getByText(product.name)).toBeDefined();
    expect(getByText(product.description)).toBeDefined();
  });

  describe("ProductDetailsModalController", () => {
    let controller: ProductDetailsModalController;

    beforeEach(() => {
      productStore.cartList = [];
      controller = new ProductDetailsModalController(product, mockNavigation);
    });

    describe("handleMoveToCart", () => {
      it("should add a item to cart", () => {
        expect(productStore.cartList.length).toEqual(0);

        controller.handleMoveToCart(jest.fn());

        expect(productStore.cartList.length).toEqual(1);
      });
    });
    describe("handleCloseModal", () => {
      it("should set modal visibility to false", () => {
        productStore.setModalVisibility(true);
        expect(productStore.isModalVisible).toBeTruthy();

        controller.handleCloseModal();
        expect(productStore.isModalVisible).toBeFalsy();
      });
    });
    describe("hasItemInCart", () => {
      it("should set modal visibility to false", () => {
        productStore.addToCart(product);

        expect(controller.hasItemInCart).toBeTruthy();
      });
    });
  });
});
