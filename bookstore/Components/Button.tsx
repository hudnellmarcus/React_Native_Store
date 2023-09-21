import React from 'react';
import { StyleSheet, Pressable, Text, StyleProp, ViewStyle } from 'react-native';

interface ButtonProps {
  title: string;
  backgroundColor?: string; 
  titleColor?: string;
  titleSize?: number;
  onPress?: () => void; 
  width?: string | number;
  height?: string | number;
  containerStyle?: StyleProp<ViewStyle>;
  style?: ViewStyle; 
  color?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  backgroundColor = '#000',
  titleColor = '#fff',
  titleSize = 18,
  onPress,
  width = '100%',
  containerStyle
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => {
        const baseStyle = {
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 75,
          borderRadius: 50,
          paddingHorizontal: 12,
          opacity: pressed ? 0.5 : 1,
          backgroundColor,
          width: typeof width === 'number' ? width : width,
        };
        return [baseStyle, containerStyle] as StyleProp<ViewStyle>[];
      }}
    >
      <Text style={[styles.text, 
        { color: titleColor, 
        fontSize: titleSize, 
        }]}>
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
    minHeight: 75,
    borderRadius: 50,
    paddingHorizontal: 12
  }
});

export default Button;
