import { type FC, type PropsWithChildren } from "react";
import { VStack } from "native-base";

const ScreenLayout: FC<PropsWithChildren> = ({ children }) => (
  <VStack safeAreaX safeAreaBottom height="100%" testID="screen-layout">
    {children}
  </VStack>
);

export default ScreenLayout;
