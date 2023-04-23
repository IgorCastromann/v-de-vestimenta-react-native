import { type NavigationRoutes } from "@src/routes/types";
import { type Product } from "@src/services/productService";
import productStore from "@src/store/productStore";
import { observer } from "mobx-react-lite";
import {
  Actionsheet,
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  Text,
  useToast,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { ProductDetailsModalController } from "./controller";
import { useMemo } from "react";
import ToastTemplate from "@src/components/ToastTemplate";

interface ProductDetailModalProps {
  navigation: NavigationRoutes;
  product: Product;
}
const ProductDetailsModal = ({
  navigation,
  product,
}: ProductDetailModalProps) => {
  const controller = useMemo(
    () => new ProductDetailsModalController(product, navigation),
    [product, navigation]
  );
  const toast = useToast();

  if (!product) return null;
  return (
    <Actionsheet
      isOpen={productStore.isModalVisible}
      onClose={controller.handleCloseModal}
      height="full"
    >
      <Actionsheet.Content>
        <HeaderDetails name={product.name} />
        <Divider borderColor="gray.300" />
        <BodyDetails description={product.description} />
        <ActionDetails
          handleAddToCart={() =>
            controller.handleMoveToCart(() =>
              toast.show({
                placement: "top",
                render: () => (
                  <ToastTemplate
                    type="success"
                    message="Item adicionado ao carrinho!"
                  />
                ),
              })
            )
          }
          hasItemInCart={controller.hasItemInCart()}
          handleCloseModal={controller.handleCloseModal}
        />
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default observer(ProductDetailsModal);

interface ProductHeaderProps {
  name: string;
}
const HeaderDetails = ({ name }: ProductHeaderProps) => (
  <Center>
    <Heading mb={2} mt={2}>
      {name}
    </Heading>
  </Center>
);

interface BodyDetailsProps {
  description: string;
}
const BodyDetails = ({ description }: BodyDetailsProps) => (
  <Actionsheet.Item>
    <Text>{description}</Text>
  </Actionsheet.Item>
);

interface ActionDetailsProps {
  handleAddToCart: () => void;
  handleCloseModal: () => void;
  hasItemInCart: boolean;
}
const ActionDetails = ({
  handleAddToCart,
  handleCloseModal,
  hasItemInCart,
}: ActionDetailsProps) => (
  <Actionsheet.Item>
    <HStack>
      <Button bgColor="red.500" rounded="xl" onPress={handleCloseModal}>
        <AntDesign name="close" size={18} color="white" />
      </Button>
      <Button
        colorScheme="gray"
        bgColor="green.500"
        px={8}
        ml={5}
        testID="button-add"
        // opacity={hasItemInCart ? 0.6 : 1}
        rounded="xl"
        width="80%"
        onPress={handleAddToCart}
      >
        {hasItemInCart ? <GoToCart /> : "Adicionar no carrinho"}
      </Button>
    </HStack>
  </Actionsheet.Item>
);

const GoToCart = () => {
  return (
    <HStack justifyContent="center" alignItems="center">
      <Text mr={6} color="white">
        Ir para o carrinho
      </Text>
      <AntDesign name="arrowright" size={20} color="white" />
    </HStack>
  );
};
