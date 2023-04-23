import productStore from "@src/store/productStore";
import { act } from "@testing-library/react-native";
import { runInAction } from "mobx";
import React from "react";
import { buildProductMock } from "@test/mocks/product";
import Item from "./index";
import { renderWithProvider } from "@test/render";
import { ItemController } from "./controller";
import { formatToBRL } from "@src/utils/formatters";

describe("<Item />", () => {
  afterEach(() => {
    jest.clearAllMocks();
    act(() => {
      runInAction(() => {
        productStore.cartList = [];
      });
    });
  });
  it("renders correctly", () => {
    const component = renderWithProvider(<Item product={buildProductMock()} />);
    const item = component.queryByTestId("item");
    const incrementButton = component.queryByTestId("button-increment");
    const decrementButton = component.queryByTestId("button-decrement");

    expect(incrementButton).toBeNull();
    expect(decrementButton).toBeNull();
    expect(item).toBeDefined();
  });

  describe("ItemController", () => {
    const mockProduct = buildProductMock();

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("handleSetSelectProduct", () => {
      it("should set selected product in product store and set modal visibility to true", () => {
        const itemController = new ItemController(mockProduct);
        itemController.handleSetSelectProduct();

        expect(productStore.selectedProduct).toEqual(mockProduct);
        expect(productStore.isModalVisible).toEqual(true);
      });
    });

    describe("formattedPrice", () => {
      it("should format the price to BRL format", () => {
        const itemController = new ItemController(mockProduct);

        expect(itemController.formattedPrice).toEqual(
          formatToBRL(Number(mockProduct.price))
        );
      });
    });
  });
});
