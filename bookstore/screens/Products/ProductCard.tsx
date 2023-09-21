import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Button,
  Text
} from "react-native";
import { Product } from "./ProductContainer";
import { CartItem } from "../../Context/AppContext";
import { useAppContext } from "../../Context/AppContext";
import { useCart } from "../../Hooks/useCart";
import { SafeArea } from "../../safe-area-component";

var { width } = Dimensions.get("window");

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { title, author, price, photo, quantityInStock } = product;
  const { addToCart } = useCart(); 
    
 
  return (

    <View style={styles.container}>
      <View style={styles.card} />
      <Image style={styles.image} source={{ uri: photo }} />
      <Text style={styles.title}>
        {title.length > 15 ? title.substring(0, 15 - 3) + "..." : title}
      </Text>
      <Text style={styles.price}>${price}</Text>
    {
        quantityInStock > 0 ? (
            <View style={{ marginBottom: 60 }}>
                <Button 
                onPress={() => {addToCart(product)}}
                title={'Add to Cart'} 
                color='green'
                 />
            </View>)
            :
            <Text style={{ marginTop: 20, color: 'red'}}>Out of Stock</Text>
    }
    </View>
  )
}; 

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: 300,
    padding: 25,
    marginTop: 55,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    backgroundColor: "white",
  },
  image: {
    width: width / 2 - 20 - 10,
    height: width / 2 - 20 - 30,
    backgroundColor: "transparent",
    position: "absolute",
    top: -60,
    
  },
  card: {
    marginBottom: 10,
    height: '50%',
    backgroundColor: "transparent",
    width: width / 2 - 20 - 10,
    padding: 50
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    color: "black",
    marginTop: 10,
  },
});

export default ProductCard;
