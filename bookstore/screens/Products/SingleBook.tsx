import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import Button from "../../Components/Button";
import { Product } from "./ProductContainer";
import { useCart } from "../../Hooks/useCart";

interface SingleBookProps {
  route: {
    params: {
      item: Product;
    };
  };
}

const SingleBook: React.FC<SingleBookProps> = (props) => {
  const [book, setBook] = useState<Product>(props.route.params.item);
  const [availability, setAvailability] = useState<null>(null);
  const { addToCart } = useCart(); 

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View>
          <Image
            source={{ uri: book.photo }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentHeader}>{book.title}</Text>
          <Text style={styles.contentText}> {book.author}</Text>
        <Text style={styles.price}>${book.price}</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Button 
             onPress={() => {addToCart(book)}}
             backgroundColor='#f57c00'
             title='Add to Cart'
             titleSize={20}
             width={200}
             containerStyle={{
               marginBottom: 24,
               marginTop: 24,
               marginLeft: 100
             }}/>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100
  },
  imageContainer: {
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    position: "absolute",
   alignContent: 'center',
   marginTop: 500,
   justifyContent: 'center'
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: "red",
  },
});

export default SingleBook;
