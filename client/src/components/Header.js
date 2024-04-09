import { Pressable, StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';


const Header = () => {
    return (
        <SafeAreaView style={styles.header}>
            <Text style={styles.textTitle}>WorkoutScreen</Text>
            </SafeAreaView>
    );
};

export default Header

const styles = StyleSheet.create({
    header: {
        // top: 0,
        // left: 0,
        // width: 400,
        // height: 64,
        height: 60, // Adjust the height as needed
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#008877',

      }
});