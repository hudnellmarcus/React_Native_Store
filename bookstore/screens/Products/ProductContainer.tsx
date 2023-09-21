import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator, FlatList  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import ProductList from './ProductList'; 
import data from '../../assets/data.json';
import { SafeArea } from "../../safe-area-component";

export interface Product {
    _id: string; 
    title: string;
    author: string;
    genre: string;
    price: number;
    photo: string;
    quantityInStock: number;
}

const ProductContainer: React.FC = () => {
    const [ products, setProducts ] = useState<Product[]>([]);
    const navigation = useNavigation(); 

    useEffect(() => {
        setProducts(data);
       // console.log(data)

        return () => {
            setProducts([])
        }
    }, [])
    
    return (
    <SafeArea>
    <View style={styles.container}>
    <View style={{marginTop: 80}}>
        <FlatList 
            numColumns={2}
            data={products}
            renderItem={({ item }: { item: Product }) => 
            <ProductList
            navigation={navigation}
            key={item._id}
            item={item} 
            />}
            keyExtractor={(item) => item.author}  
        />
    </View>
    </View>
    </SafeArea>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default ProductContainer; 