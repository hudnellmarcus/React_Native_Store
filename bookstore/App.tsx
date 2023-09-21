import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { AppProvider } from "./Context/AppContext";
import { PaperProvider, DefaultTheme } from 'react-native-paper'; 

// Navigators
import Main from "./Navigators/Main";

// Screens
import ProductContainer from "./screens/Products/ProductContainer";
import { NavigationContainer } from "@react-navigation/native";


export default function App() {
  return (
    <AppProvider>
      <PaperProvider theme={DefaultTheme}>
    <NavigationContainer>
        <Main />
    </NavigationContainer>
    </PaperProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
