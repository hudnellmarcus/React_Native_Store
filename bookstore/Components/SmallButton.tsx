import React from 'react';
import { StyleSheet, Pressable, Text, StyleProp, ViewStyle, TextStyle, DimensionValue } from 'react-native'; 

interface SmallButtonProps {
  title: string;
  backgroundColor?: string;
  titleColor?: string;
  titleSize?: number;
  titleStyle?: StyleProp<TextStyle> & {
    titleColor?: string;
    titleSize?: number;
  };
  onPress: () => void;
  width?: DimensionValue | undefined;
  containerStyle?: StyleProp<ViewStyle>;
  height?: number;
  borderColor?: string; 
  borderWidth?: number;
}

const SmallButton:React.FC<SmallButtonProps> = ({
    title,
    backgroundColor = '#f5f3f3',
    titleColor = 'black',
    titleSize = 14,
    titleStyle,
    onPress,
    width = '50%',
    containerStyle
  }) => {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => {
          const buttonStyle: StyleProp<ViewStyle>[] = [
            styles.base,
            {
              opacity: pressed ? 0.5 : 1, 
              backgroundColor,
              width,
            },
              containerStyle,
          ];
          return buttonStyle;
        }}
      >
        <Text style={[styles.text, { color: titleColor, fontSize: titleSize }, titleStyle]}>
          {title}
        </Text>
      </Pressable>
    );
  };
  
  const styles = StyleSheet.create({
    text: {
      fontWeight: '600'
    },
    base: {
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 50,
      borderRadius: 50,
      paddingHorizontal: 12,
      marginVertical: 5
    }
  });
  
  export default SmallButton;
