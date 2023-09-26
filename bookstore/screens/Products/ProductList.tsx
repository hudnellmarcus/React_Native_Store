import React from "react";
import { TouchableOpacity, View, Dimensions, StyleSheet } from "react-native";
import { Product } from "./ProductContainer";
import ProductCard from "./ProductCard";


interface ProductListProps {
  item: Product;
  navigation: any;
}

const ProductList: React.FC<ProductListProps> = ({ item, navigation }) => {
  return (
    <View style={styles.container}>
        <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("BookDetail", { item: item });
        }}
      >
        <ProductCard  product={item} />
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        padding: 5
    },
    card: {
        flex: 1,
        height: '25%'
    },
    cardContainer: {
        flex: 1,
        maxHeight: '50%'
    },

    button: {
        width: 50,
        height: 50, 
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10, 
      },
});

export default ProductList;
