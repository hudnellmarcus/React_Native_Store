import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import Button from "../../Components/Button";
import { SafeArea } from "../../safe-area-component";
import { useAppContext } from "../../Context/AppContext";

const Cart = () => {
  const { state, dispatch } = useAppContext();

  // total quantity of items in cart
  const totalQuantity = state.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // subtotal of cart
  const subtotal = state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const onDecrement = (itemId: string) => {
    const cartItem = state.cart.find((item) => item._id === itemId);

    if (cartItem && cartItem.quantity > 1) {
      dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
    }
  };

  const onIncrememt = (itemId: string) => {
    const cartItem = state.cart.find((item) => item._id === itemId);

    if (cartItem)
      dispatch({
        type: "ADD_TO_CART",
        payload: { ...cartItem, quantity: cartItem.quantity + 1 },
      });
  };

  return (
    <SafeArea>
      <View style={styles.container}>
        <Text>Your Cart</Text>
        {state.cart.length < 1 ? (
          <Text>Your cart is empty.</Text>
        ) : (
          <FlatList
            data={state.cart}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.container}>
                <View style={styles.cartItem}>
                  <View style={styles.itemContainer}>
                    <Image source={{ uri: item.photo }} />
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemPrice}>${item.price}</Text>
                    <Text style={styles.itemQuantity}>
                      Quantity: {item.quantity}
                    </Text>
                    <TouchableOpacity onPress={() => onDecrement(item._id)}>
                      <Text style={styles.decrementButton}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onIncrememt(item._id)}>
                      <Text style={styles.incrementButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        )}
        <View style={styles.totalContainer}>
          <View style={styles.row}>
            <Text style={styles.itemTitle}>Total Items:</Text>
            <Text style={styles.itemQuantity}>{totalQuantity}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.itemTitle}>Subtotal:</Text>
            <Text style={styles.itemQuantity}>${subtotal.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    height: "100%",
  },
  itemTitle: {
    flex: 2,
    fontSize: 12,
  },
  itemPrice: {
    flex: 1,
    fontSize: 12,
  },
  itemQuantity: {
    flex: 1,
    fontSize: 12,
    color: "gray",
    textAlign: "right",
  },
  bottomContainer: {
    flex: 1,
    marginTop: 25,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
    margin: 5,
  },
  cartItem: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  totalContainer: {
    backgroundColor: "#FFF",
    padding: 10,
    margin: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  button: {
    fontSize: 30,
    fontWeight: "500",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  decrementButton: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 12,
  },

  incrementButton: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 12,
  },
});

export default Cart;
