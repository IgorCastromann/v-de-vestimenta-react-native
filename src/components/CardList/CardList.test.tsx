import { buildProductsArrayMock } from "@test/mocks/product";
import CardList from ".";
import { renderWithProvider } from "@test/render";

describe("<CardList />", () => {
  it("renders no child", () => {
    const component = renderWithProvider(<CardList products={[]} />);
    const cardList = component.queryByTestId("cardlist");
    const items = component.queryAllByTestId("item");

    expect(cardList).toBeDefined();
    expect(items.length).toBe(0);
  });

  it("renders children", () => {
    const numberOfMockedProducts = 3;
    const mockedItems = buildProductsArrayMock(numberOfMockedProducts);
    const component = renderWithProvider(<CardList products={mockedItems} />);
    const items = component.queryAllByTestId("item");

    expect(items.length).toBe(mockedItems.length);
  });
});
