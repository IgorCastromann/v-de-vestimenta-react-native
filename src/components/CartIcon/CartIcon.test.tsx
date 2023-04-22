import { renderWithProvider } from "@test/render";
import { fireEvent } from "@testing-library/react-native";
import CartIcon from "./index";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockedNavigate: any = {
  navigate: jest.fn(),
};

describe("<CartIcon />", () => {
  it("snapshot", () => {
    const component = renderWithProvider(
      <CartIcon navigation={mockedNavigate} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("navigates to Cart screen on press", () => {
    const { queryByTestId } = renderWithProvider(
      <CartIcon navigation={mockedNavigate} />
    );
    const cartIcon = queryByTestId("cartIcon");
    fireEvent.press(cartIcon);

    expect(mockedNavigate.navigate).toHaveBeenCalledWith("Cart");
    expect(mockedNavigate.navigate).toHaveBeenCalledTimes(1);
    expect(cartIcon.props.style[0].color).toEqual("black");
  });

  it("does not render the cart quantity if the quantity is zero", () => {
    const component = renderWithProvider(
      <CartIcon navigation={mockedNavigate} />
    );

    const cartItems = component.queryByTestId("sum-cart-items");

    expect(cartItems).toBe(null);
  });
});
