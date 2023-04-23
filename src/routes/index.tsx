import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@src/screens/Home";
import Cart from "@src/screens/Cart";
import CartIcon from "@src/components/CartIcon";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { Input, useColorMode, useColorModeValue } from "native-base";
import { useState } from "react";
import { type NavigationRoutes } from "./types";
import productStore from "@src/store/productStore";

const Stack = createNativeStackNavigator();

export default function Stacks() {
  const { toggleColorMode, colorMode } = useColorMode();
  const theme = useColorModeValue("light", "dark");
  const bg = useColorModeValue("ghostwhite", "#242424");

  const [isSearching, setIsSearching] = useState(false);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          ...baseOptions(bg, colorMode, navigation),
          headerTitle: "V de Vestimenta",
          headerLeft: () => (
            <>
              <MaterialCommunityIcons
                name="theme-light-dark"
                size={24}
                color={theme === "light" ? "black" : "white"}
                onPress={toggleColorMode}
              />
              <AntDesign
                name="search1"
                size={24}
                style={{ marginLeft: 16, marginRight: 8 }}
                color={theme === "light" ? "black" : "white"}
                onPress={() => {
                  setIsSearching(!isSearching);
                  productStore.setSearch("");
                }}
              />
              {isSearching ? (
                <Input
                  placeholder="Buscar por"
                  clearButtonMode="always"
                  autoFocus
                  width={"56"}
                  onChangeText={(val) => productStore.setSearch(val)}
                />
              ) : null}
            </>
          ),
        })}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={({ navigation }) => ({
          ...baseOptions(bg, colorMode, navigation),
          headerTitle: "Carrinho de compras",
        })}
      />
    </Stack.Navigator>
  );
}

const baseOptions = (
  bg: string,
  colorMode: "light" | "dark",
  navigation: NavigationRoutes
) => {
  return {
    contentStyle: {
      backgroundColor: bg,
    },
    headerStyle: {
      backgroundColor: colorMode === "light" ? "white" : "black",
    },
    headerTintColor: colorMode !== "light" ? "white" : "black",
    headerRight: () => <CartIcon navigation={navigation} />,
  };
};
