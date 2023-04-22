import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { type NavigationRoutes } from "@src/routes/types";
import TotalCartItems from "@src/components/TotalCartItems";
import { useColorModeValue } from "native-base";

interface CartIconProps {
  navigation: NavigationRoutes;
}
const CartIcon = ({ navigation }: CartIconProps) => {
  const theme = useColorModeValue("light", "dark");

  return (
    <>
      <AntDesign
        name="shoppingcart"
        size={24}
        color={theme === "light" ? "black" : "white"}
        testID="cartIcon"
        onPress={() => {
          navigation.navigate("Cart");
        }}
      />
      <TotalCartItems />
    </>
  );
};

export default CartIcon;
