import React, { createContext, useContext, useReducer, ReactNode } from "react";
import data from '../assets/data.json'; 



// Define the state
interface AppState {
  cart: CartItem[];
  quantityInStock: Record<string, number>
  // may need others
}

type AppAction =
  // based on item ids
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_CART"; payload: CartItem[] }
  | { type: "DECREMENT_CART_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY_IN_STOCK"; payload: { productId: string; quantity: number} }

export interface CartItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  photo: string;
  quantityInStock: number;
}

// initial quantityInStock state 
const initialQuantityInStock: Record<string, number> = data.reduce((acc, product) => {
  acc[product._id] = product.quantityInStock; 
  return acc; 
}, {} as Record<string, number>)


// context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}
const AppContext = createContext<AppContextType | undefined>(undefined);

// useAppContext hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  // could also return a null value to prevent crashes
  return context;
};



// reducer function
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "ADD_TO_CART":
      // check if the item is already in the cart
      const existingItemIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (existingItemIndex !== -1) {
        // if it exists, update the quantity
        const updatedCart = [...state.cart];
        const itemToUpdate = updatedCart[existingItemIndex];

        console.log(`item to update: ${itemToUpdate}`); 
        
        if (state.quantityInStock[itemToUpdate._id] > 0) {
          itemToUpdate.quantity += 1;
        //  itemToUpdate.quantityInStock -= 1;
          state.quantityInStock[itemToUpdate._id] -= 1; 
        }

        return { ...state, cart: updatedCart };
      } else {
        // if it doesn't exist, add it to the cart and decreasing quantity in stock
        const newItem = { ...action.payload, quantity: 1 };
        state.quantityInStock[newItem._id] -= 1; 

        return { ...state, cart: [...state.cart, action.payload] };
      }

    case "REMOVE_FROM_CART":
      // remove the item from the cart by filtering it out
      const updatedCart = state.cart.filter(
        (item) => item._id !== action.payload
      );

      const itemToIncrement = state.cart.find(
        (item) => item._id === action.payload
      );
      if (itemToIncrement) {
        state.quantityInStock[itemToIncrement._id] += itemToIncrement.quantity
      }
      return { ...state, cart: updatedCart };

    case "DECREMENT_CART_ITEM":
      const itemToDecrement = state.cart.find(
        (item) => item._id === action.payload
      );

      if (itemToDecrement && itemToDecrement.quantity > 1) {
        const updatedCart = state.cart.map((item) =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        return { ...state, cart: updatedCart };
        // if the item quantity equals 1 then remove the item from the cart. 
      } else if (itemToDecrement && itemToDecrement.quantity === 1) {
        const updatedCart = state.cart.filter(
          (item) => item._id !== action.payload
        );
        return { ...state, cart: updatedCart };
      }
      return state;
    
    case "UPDATE_QUANTITY_IN_STOCK": 
      return {
        ...state,
        quantityInStock: {
          ...state.quantityInStock,
          [action.payload.productId]: action.payload.quantity,
        }
      };

    default:
      return state;
  }
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {

  const [state, dispatch] = useReducer(appReducer, {
    cart: [],
    quantityInStock: initialQuantityInStock
    // may need user state here eventually as well as others
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
