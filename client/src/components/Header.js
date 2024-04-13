import { Pressable, StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';


const Header = ({title}) => {
    return (
        <SafeAreaView style={styles.header}>
            <Text style={styles.headerText}> 
            {title}
                </Text>
            </SafeAreaView>
    );
};

export default Header

const styles = StyleSheet.create({
    header: {
        width: '100%',
   
    backgroundColor: '#008877',
    alignItems: 'center',
    justifyContent: 'center',
    //  iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    zIndex: 10, 
    //  Android
    elevation: 4,


      },
      headerText: {
        fontWeight: '600',
        fontSize: 24,
        color: 'white',
      },

});