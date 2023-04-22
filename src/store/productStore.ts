import productService, { type Product } from "@src/services/productService";
import { makeAutoObservable, runInAction } from "mobx";

export interface CartList extends Product {
  cartQuantity: number;
}

export class ProductStore {
  public products: Product[] = [];
  public cartList: CartList[] = [];
  public isModalVisible = false;
  public selectedProduct: Product | undefined = undefined;
  public isLoading = false;
  public search = "";

  public constructor() {
    makeAutoObservable(this);
  }

  public addToCart = (product: Product) => {
    const previousSumItems = this.getCartQuantity();

    const updatedCardList = this.cartList.find(
      (item) => item.id === product.id
    );
    if (updatedCardList) {
      this.cartList = this.cartList.map((item) =>
        item.id === product.id
          ? { ...item, cartQuantity: item.cartQuantity + 1 }
          : item
      );
    } else this.cartList.push({ ...product, cartQuantity: 1 });

    const updatedSumItems = this.getCartQuantity();

    const isFirstItemInCard = previousSumItems === 0 && updatedSumItems === 1;
    if (isFirstItemInCard) {
      this.setModalVisibility(true);
    }
  };

  public removeFromCart = (id: string) => {
    this.cartList = this.cartList.filter((item) =>
      item.id === id ? (item.cartQuantity > 1 ? item.cartQuantity-- : 0) : item
    );
  };

  public getCartQuantity = () =>
    this.cartList.reduce((prev, cur) => prev + cur.cartQuantity, 0);

  public listProducts = async () => {
    runInAction(() => (this.isLoading = true));

    const productList = await productService.listProducts();
    this.setProducts(productList);

    runInAction(() => (this.isLoading = false));
  };

  public setModalVisibility = (bool: boolean) => {
    this.isModalVisible = bool;
  };

  public setSelectedProduct = (product: Product) => {
    this.selectedProduct = product;
  };

  public setSearch = (str: string) => {
    this.search = str;
  };

  public get filteredProducts() {
    const isSearching = this.search.length > 0;

    return isSearching
      ? this.products.filter((product) =>
          product.name.toLowerCase().includes(this.search.toLowerCase())
        )
      : this.products;
  }

  private readonly setProducts = (productsList: Product[]) => {
    this.products = productsList;
  };
}

const productStore = new ProductStore();
export default productStore;
