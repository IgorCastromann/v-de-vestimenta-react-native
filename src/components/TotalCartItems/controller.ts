import productStore from "@src/store/productStore";

export class TotalCartItemsController {
  public get cartItemsQuantity() {
    const cartQuantity = productStore.getCartQuantity();
    return cartQuantity > 9 ? "9+" : cartQuantity;
  }
}
