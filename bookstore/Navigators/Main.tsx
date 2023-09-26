import React from 'react';
import { createBottomTabNavigator, BottomTabNavigationProp, BottomTabScreenProps, BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { RootStackParamsList } from '../types/types';
import CartNavigator from './CartNavigator';
import HomeNavigator from './HomeNavigator';



const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

type TabNavigationProps = BottomTabNavigationProp<RootStackParamsList>; 

// TAB_ICON and following function allow for dynamic changing of the bottom navigation bar. Search through https://icons.expo.fyi/ and filter by 'Ionicons' to find the name of the corresponding icon to use 
/* I always leave this note in so that I can remember where to search for the icons */
const TAB_ICON: { [key: string]: string} = {
    Home: "home",
    Cart: "cart",
  //  User: "person"
};

type HomeStackScreenRouteProp = RouteProp<RootStackParamsList, 'Home'>;
type CartStackScreenRouteProp = RouteProp<RootStackParamsList, 'Cart'>;
/*type UserStackScreenRouteProp = RouteProp<RootStackParamsList, 'User'>; */


const createScreenOptions = ({ route }: BottomTabScreenProps<any>) => {
    const iconName = TAB_ICON[route.name];
    return {
        tabBarIcon: ({ size, color }: { size: number; color: string }) => (
            <Ionicons name={iconName} size={size} color={color} />
        ),
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
    };
};


export default function Main() {

    return (
        <Tab.Navigator screenOptions={createScreenOptions}>
            <Tab.Screen name="Home" component={HomeNavigator}/>
            <Tab.Screen name="Cart" component={CartNavigator}/>
        {  /*  <Tab.Screen name="User" component={HomeNavigator}/> */}
        </Tab.Navigator>
    );
};


