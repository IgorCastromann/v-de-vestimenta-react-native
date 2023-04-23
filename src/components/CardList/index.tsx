import { FlatList } from "native-base";
import { type Product } from "@src/services/productService";
import { observer } from "mobx-react-lite";
import Item from "@src/components/Item";

const COLUMNS = 2;
interface CardListProps {
  products: Product[];
}
const CardList = ({ products }: CardListProps) => {
  return (
    <FlatList
      data={products}
      numColumns={COLUMNS}
      keyExtractor={(item) => item.id}
      columnWrapperStyle={{
        flex: 1,
        justifyContent: "space-between",
        marginLeft: 24,
        marginRight: 24,
      }}
      flexShrink={1}
      testID="cardlist"
      renderItem={({ item }) => <Item product={item} />}
    />
  );
};

export default observer(CardList);
