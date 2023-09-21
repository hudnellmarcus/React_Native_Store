import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProductContainer from "../screens/Products/ProductContainer";
import SingleBook from "../screens/Products/SingleBook";
import { Product } from "../screens/Products/ProductContainer";

const Stack = createStackNavigator()

const  HomeNavigator = () => {
    
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name={'HomeNavigator'}
                component={ProductContainer}
                options={{
                   title: 'Shop'
                }}
            />
            <Stack.Screen
                name={'BookDetail'}
                component={SingleBook as React.FC<{}>}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )    
}

export default HomeNavigator; 