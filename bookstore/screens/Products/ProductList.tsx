import React from "react";
import { TouchableOpacity, View, Dimensions, StyleSheet } from "react-native";
import { Product } from "./ProductContainer";
import ProductCard from "./ProductCard";
var { width } = Dimensions.get("window");

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
        flexDirection: "row"
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
        width: 50, // Set your desired width here
        height: 50, // Set your desired height here
        backgroundColor: 'blue', // Customize the button color
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10, // Adjust spacing between buttons
      },
});

export default ProductList;
