import { render } from "@testing-library/react-native";
import { NativeBaseProvider } from "native-base";
import { ReactNode } from "react";

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

export const renderWithProvider = (children: ReactNode) =>
  render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      {children}
    </NativeBaseProvider>
  );
