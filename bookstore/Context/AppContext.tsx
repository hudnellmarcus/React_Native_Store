import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Define the state
interface AppState {
  cart: CartItem[];
  // may need others
}

type AppAction =
  // based on item ids
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_CART"; payload: CartItem[] };

export interface CartItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  photo: string;
  quantityInStock: number;
}

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

        if (itemToUpdate.quantityInStock > 0) {
          itemToUpdate.quantity += 1;
          itemToUpdate.quantityInStock -= 1;
        }

        return { ...state, cart: updatedCart };
      } else {
        // if it doesn't exist, add it to the cart and decreasing quantity in stock
        const newItem = { ...action.payload, quantity: 1 };
        newItem.quantityInStock -= 1;

        return { ...state, cart: [...state.cart, action.payload] };
      }

    case "REMOVE_FROM_CART":
      // remove the item from the cart by filtering it out
      const updatedCart = state.cart.filter(
        (item) => item._id !== action.payload
      );
      return { ...state, cart: updatedCart };


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
    // may need user state here eventually as well as others
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
