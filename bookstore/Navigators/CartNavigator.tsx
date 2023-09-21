import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAppContext } from "../Context/AppContext";
import ProductContainer from "../screens/Products/ProductContainer";
import Cart from "../screens/Cart/Cart";

const Stack = createStackNavigator();

const CartNavigator = () => {
  return <Stack.Navigator>
            <Stack.Screen
              name={'CartNavigator'}
              component={Cart}
              options={{
                  title: 'Cart'
              }}
           />

           
        </Stack.Navigator>;
};

export default CartNavigator;
