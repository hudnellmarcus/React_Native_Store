
import { SafeAreaView, StatusBar } from "react-native";
import styled from "styled-components";

// this component sets a flex container for both ios and andriod and should be used as the root container for most screen creations -cm

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`}`;