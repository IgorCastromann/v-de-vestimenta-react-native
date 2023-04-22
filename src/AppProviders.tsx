import { NavigationContainer } from "@react-navigation/native";
import { extendTheme, NativeBaseProvider } from "native-base";
import { type FC, type PropsWithChildren } from "react";

const config = {
  useSystemColorMode: true,
};

const customTheme = extendTheme({ config });

const AppProviders: FC<PropsWithChildren> = ({ children }) => (
  <NativeBaseProvider theme={customTheme}>
    <NavigationContainer>{children}</NavigationContainer>
  </NativeBaseProvider>
);

export default AppProviders;
