// cartLogic.ts
import React, { useContext } from "react";
import { useAppContext } from "../Context/AppContext";
import { Product } from "../screens/Products/ProductContainer";

export const useCart = () => {
  const { state, dispatch } = useAppContext();

  const addToCart = (product: Product) => {
    const existingCartItem = state.cart.find(
      (item) => item._id === product._id
    );
    // check if the product is in stock
    if (product.quantityInStock < 1) {
      return;
    }

    // is product already in the cart?
    if (existingCartItem) {
      // check to see if adding item exceeds quantity in stock
      if (existingCartItem.quantity + 1 > product.quantityInStock) {
        return;
      }

      const updatedCart = state.cart.map((item) =>
        item._id === existingCartItem._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      dispatch({ type: "UPDATE_CART", payload: updatedCart });
    } else {
      // add it to the cart
      const cartItem = {
        _id: product._id,
        title: product.title,
        price: product.price,
        quantity: 1,
        photo: product.photo,
        quantityInStock: product.quantityInStock,
      };

      dispatch({ type: "ADD_TO_CART", payload: cartItem });
      //console.log(cartItem)
    }

    const updatedProduct = {
      ...product,
      quantityInStock: product.quantityInStock - 1,
    };

    //dispatch({ type: "UPDATE_PRODUCT", payload: updatedProduct });
};
return {
  addToCart,
  };
};
