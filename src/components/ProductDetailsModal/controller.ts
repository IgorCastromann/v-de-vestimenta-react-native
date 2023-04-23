/* eslint-disable no-unused-vars */
import { type NavigationRoutes } from "@src/routes/types";
import { type Product } from "@src/services/productService";
import productStore from "@src/store/productStore";

export class ProductDetailsModalController {
  public constructor(
    private readonly product: Product,
    private readonly navigation: NavigationRoutes
  ) {}

  public handleMoveToCart = (callback: () => void) => {
    if (!this.hasItemInCart()) {
      productStore.addToCart(this.product);
      callback();
      return;
    }
    this.navigation.navigate("Cart");
    productStore.setModalVisibility(false);
  };

  public handleCloseModal = () => {
    productStore.setModalVisibility(false);
  };

  public hasItemInCart = () =>
    productStore.getQuantityByProductId(this.product.id) > 0;
}
