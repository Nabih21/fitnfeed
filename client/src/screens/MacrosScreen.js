import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, StatusBar, ScrollView, FlatList, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';





const Body = () => {
    const [macros, setMacros] = useState({
        protein: 0,
        carbohydrates: 0,
        fats: 0,
    });

    const handleInputChange = (e) => {
        const name  = e.target;
        const value = e.target;
        setMacros((prevMacros) => ({
            ...prevMacros,
            [name]: value,
        }));
    };

    return (
        <View>
            <Text>Macro Tracking</Text>
            <View>
                <Text>Protein:</Text>
                <TextInput
                    keyboardType="numeric"
                    name="protein"
                    value={macros.protein}
                    onChangeText={handleInputChange}
                />
            </View>
            <View>
                <Text>Carbohydrates:</Text>
                <TextInput
                    keyboardType="numeric"
                    name="carbohydrates"
                    value={macros.carbohydrates}
                    onChangeText={handleInputChange}
                />
            </View>
            <View>
                <Text>Fats:</Text>
                <TextInput
                    keyboardType="numeric"
                    name="fats"
                    value={macros.fats}
                    onChangeText={handleInputChange}
                />
            </View>
            <Text>Current Macros:</Text>
            <Text>Protein: {macros.protein}</Text>
            <Text>Carbohydrates: {macros.carbohydrates}</Text>
            <Text>Fats: {macros.fats}</Text>
        </View>
    );
};

const MacrosScreen =() => {

    return (
        <View>
            <Header title="Macros" />
            <Body />
        </View>
    );
}

export default MacrosScreen;