import { type Product } from "@src/services/productService";
import productStore from "@src/store/productStore";
import { formatToBRL } from "@src/utils/formatters";

export class ItemController {
  // eslint-disable-next-line no-unused-vars
  public constructor(private readonly product: Product) {}

  public handleSetSelectProduct = () => {
    productStore.setSelectedProduct(this.product);
    productStore.setModalVisibility(true);
  };

  public get formattedPrice() {
    return formatToBRL(Number(this.product.price));
  }
}
