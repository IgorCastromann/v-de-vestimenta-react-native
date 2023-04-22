import { act } from "@testing-library/react-native";
import renderer from "react-test-renderer";

import App from "./App";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

describe("<App />", () => {
  it("has 1 child", () => {
    let tree: any;
    act(() => {
      tree = renderer.create(<App />);
    });
    expect(tree.toJSON().children.length).toBe(1);
  });
});
