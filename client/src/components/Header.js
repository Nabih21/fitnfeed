import { Pressable, StyleSheet, Text, View, StatusBar, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../../../assets/images/logo_3.png';
import logoTitle from '../../../assets/images/title.png';


const Header = ({title}) => {
    return (
        <SafeAreaView style={styles.header}>
                
               

                <Image 
                    source={logoTitle}
                    style={styles.image}
                    resizeMode='contain'
                />
               
                 

             {/* {typeof title === 'string' ? <Text style={styles.headerText}>{title}</Text> 
             : title} */}
            </SafeAreaView>
    );
};

export default Header

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 130,
   
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
      imageContainer:{ 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        // Slightly lighter than card background
        borderRadius: 10,
        padding: 8,
        marginVertical: 4,
        width: 327   
    },
        image: {
            width: '100%', //
            height: '70%', // 
            maxWidth: 300, // 
            maxHeight: 100,
        },


});