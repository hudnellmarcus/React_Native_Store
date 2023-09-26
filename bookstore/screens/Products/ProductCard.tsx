import React, { useState } from "react";
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



interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { title, author, price, photo, quantityInStock } = product;
  const { addToCart } = useCart(); 
  const { state } = useAppContext(); 
  
  return (

    <View style={styles.container}>
      
      <Image style={
             {resizeMode: 'contain', height: 125, width: 100, marginTop: 40}
      } source={{ uri: photo }} />
      <Text style={styles.title}>
        {title.length > 15 ? title.substring(0, 15 - 3) + "..." : title}
      </Text>
      <Text style={styles.price}>${price}</Text>
    {
        state.quantityInStock[product._id] > 0 ? (
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
    flex: 1,
  //  width: width / 2 - 20,
   height: 300,
  //  padding: 25,
   // marginTop: -10,
    //marginBottom: -10,
  //x cvc  marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    backgroundColor: "white",
   // borderColor: "black",
   // borderWidth: 3
  },
  imageContainer: {

  },

  image: {
    backgroundColor: "transparent",
    position: "absolute",  
  },
  card: {
    marginTop: -100, 
    marginBottom: 0,
    height: '50%',
    backgroundColor: "transparent",
    padding: 30,
    borderColor: "black",
   borderWidth: 2
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    padding: 10
  },
  price: {
    fontSize: 20,
    color: "black",
    marginTop: 10,
  },
});

export default ProductCard;
