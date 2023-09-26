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
    console.log(`existing cart item: ${existingCartItem?.title} quantity in stock: ${existingCartItem?.quantityInStock}`)
    // check if the product is in stock
    if (product.quantityInStock < 1) {
      return;
    }

    // is product already in the cart?
    if (existingCartItem) {
      // check to see if adding item exceeds quantity in stock
      if (existingCartItem.quantity + 1 > state.quantityInStock[existingCartItem._id]) {
        console.log(`quantity available in stock: ${state.quantityInStock[existingCartItem._id]}`)
        return;
      }

    /* dispatch({ type: "ADD_TO_CART", payload: { ...existingCartItem, quantity: existingCartItem.quantity + 1 } }); */
   

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

      dispatch({ type: "ADD_TO_CART", payload: cartItem, });
      
      
                  console.log(cartItem)
      // subtract from quantity in stock 
      const updatedQuantityInStock = state.quantityInStock[product._id] - 1; 
      dispatch({ type: "UPDATE_QUANTITY_IN_STOCK", payload: { productId: product._id, quantity: updatedQuantityInStock}})
    
    }

  /*  const updatedProduct = {
      ...product,
      quantityInStock: product.quantityInStock - 1,
    };
*/
    //dispatch({ type: "UPDATE_PRODUCT", payload: updatedProduct });
};
return {
  addToCart,
  };
};
