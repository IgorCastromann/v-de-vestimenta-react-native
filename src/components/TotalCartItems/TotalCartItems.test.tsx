import TotalCartItems from "./index";
import { act } from "@testing-library/react-native";
import productStore from "@src/store/productStore";
import { runInAction } from "mobx";
import { buildProductMock } from "@test/mocks/product";
import { renderWithProvider } from "@test/render";
import { TotalCartItemsController } from "./controller";
jest.useFakeTimers();

describe("<TotalCartItems />", () => {
  it("renders correctly", () => {
    const component = renderWithProvider(<TotalCartItems />);
    const expectedQuantity = "2";

    act(() => {
      runInAction(() => {
        productStore.cartList = [
          { ...buildProductMock(), cartQuantity: +expectedQuantity },
        ];
      });
    });

    const cartQuantity = component.queryByText(expectedQuantity);

    expect(cartQuantity).toBeDefined();
  });

  describe("TotalCartItemsController", () => {
    let totalCartItemsController: TotalCartItemsController;

    beforeEach(() => {
      productStore.cartList = [];
      totalCartItemsController = new TotalCartItemsController();
    });
    describe("TotalCartItemsController", () => {
      it("should return correctly the amount of items in cart", () => {
        expect(totalCartItemsController.cartItemsQuantity).toBe(0);

        productStore.addToCart(buildProductMock());

        expect(totalCartItemsController.cartItemsQuantity).toBe(1);
      });

      it("should return 9+ it there is more than 9 items", () => {
        expect(totalCartItemsController.cartItemsQuantity).toBe(0);

        for (let i = 0; i < 15; i++) {
          productStore.addToCart(buildProductMock());
        }

        expect(totalCartItemsController.cartItemsQuantity).toBe("9+");
      });
    });
  });
});
