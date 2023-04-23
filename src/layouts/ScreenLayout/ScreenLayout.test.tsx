import ScreenLayout from "./index";
import { VStack } from "native-base";
import { renderWithProvider } from "@test/render";

describe("<ScreenLayout />", () => {
  it("renders children inside a VStack", () => {
    const { getByTestId } = renderWithProvider(
      <ScreenLayout>
        <VStack testID="child" />
      </ScreenLayout>
    );
    const child = getByTestId("child");
    expect(child).toBeDefined();
  });

  it("sets height to 100%", () => {
    const { getByTestId } = renderWithProvider(
      <ScreenLayout>
        <VStack testID="child" />
      </ScreenLayout>
    );
    const screenLayout = getByTestId("screen-layout");
    expect(screenLayout.props.style.height).toBe("100%");
  });
});
