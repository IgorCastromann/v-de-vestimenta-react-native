import { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { Center } from "native-base";
import { TotalCartItemsController } from "./controller";

const TotalCartItems = () => {
  const controller = useMemo(() => new TotalCartItemsController(), []);

  if (!controller.cartItemsQuantity) return null;
  return (
    <Center
      rounded="full"
      bg="red.500"
      boxSize={4}
      position="absolute"
      right={-8}
      top={-8}
      _text={{
        color: "white",
        textAlign: "center",
        fontWeight: "700",
        fontSize: "8",
      }}
    >
      {controller.cartItemsQuantity}
    </Center>
  );
};

export default observer(TotalCartItems);
