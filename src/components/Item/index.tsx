import React, { useMemo } from "react";
import { type Product } from "@src/services/productService";
import { TouchableOpacity } from "react-native";
import { observer } from "mobx-react-lite";
import { VStack, Image, Center, Text, useColorModeValue } from "native-base";
import { ItemController } from "./controller";

interface ItemProps {
  product: Product;
}
const Item = ({ product }: ItemProps) => {
  const bg = useColorModeValue("white", "#3B3B3B");
  const controller = useMemo(() => new ItemController(product), [product]);

  return (
    <TouchableOpacity onPress={controller.handleSetSelectProduct} testID="item">
      <VStack
        padding={1}
        bgColor={bg}
        width="150"
        rounded="lg"
        justifyContent="center"
        alignItems="center"
        shadow={2}
        marginTop="5"
      >
        <Title name={product.name} />
        <Image
          size={"xl"}
          rounded="lg"
          source={{
            uri: product.image,
          }}
          alt={`${product.name}`}
        />
        <Footer price={controller.formattedPrice} />
      </VStack>
    </TouchableOpacity>
  );
};

export default observer(Item);

interface TitleProps {
  name: string;
}
const Title = ({ name }: TitleProps) => (
  <Center padding={1} height="16">
    <Text
      alignContent="center"
      fontSize="md"
      fontWeight="bold"
      testID="item-text"
    >
      {name}
    </Text>
  </Center>
);

interface FooterProps {
  price: string;
}
const Footer = ({ price }: FooterProps) => (
  <VStack>
    <Text fontSize="xs" lineHeight="md" px={4}>
      por uma bagatela de apenas:
    </Text>
    <Text fontSize="sm" fontWeight="bold" lineHeight="md" px={4}>
      {price}
    </Text>
  </VStack>
);
