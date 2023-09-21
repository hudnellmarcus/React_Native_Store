import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon  from 'react-native-vector-icons/FontAwesome';

export default function GoBackButton() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="angle-left" size={40} />
        </TouchableOpacity>
    );
}