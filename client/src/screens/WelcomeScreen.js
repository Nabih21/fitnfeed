import { StyleSheet, Text, View, Image, Button, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import logo from '../../../assets/images/logo_1.png'
import { useNavigation } from '@react-navigation/native'

const WelcomeScreen = () => {
  
  const nav = useNavigation();

  return (
    <SafeAreaView style={styles.layout}>
        {/* <View  >
        <Text style={styles.title}>Welcome Screen</Text>
        </View> */}

        <View style={styles.containerImage} >
            <Image 
            source={logo}
            style={styles.image}
             /> 
        </View>
        <View style={styles.buttonContainer}>
        <Pressable
            onPress={() => nav.navigate("Register")}
            style={styles.button}
            >
              
            <Text style={styles.buttonText}> Register </Text>
                      </Pressable>
        
          <Pressable
            onPress={() => nav.navigate("Login")}
            style={[styles.button, {backgroundColor: 'white', borderWidth: 1, borderColor: 'green'}]}
            >

            <Text style={[styles.buttonText, { color: '#008877'}]}> Sign in</Text>
                      </Pressable>
                      <Pressable
            onPress={() => nav.navigate("MainApp")}
            style={[styles.button, {backgroundColor: 'white', borderWidth: 1, borderColor: 'green'}]}
            >

            <Text style={[styles.buttonText, { color: '#008877'}]}> Home</Text>
                      </Pressable>
         </View>
    </SafeAreaView>    
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({

    layout: {
        flex: 1,
        backgroundColor: '#17352b',
        alignItems: 'center',
        paddingTop: 30,
        // padding: 24
      },
      title: {
        margin: 10,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
      }, 
      containerImage: {
        justifyContent: 'center',
        alignItems: 'center',
        // shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 4,
        // },
        // shadowOpacity: 0.3,
        // shadowRadius: 5,
        // backgroundColor: '#17352b', // Shadow needs a color to stand out
        // Add padding to prevent the shadow from being clipped, kinda opitonal
        paddingRight: 10,
        borderRadius:12,
        margin: 10,
      },
      image: {
        width: 300,
        height: 400,
        borderWidth: 0,
        borderRadius: 12,
        //borderColor: '#E7E3EB',
        
      },

      buttonContainer : {
        padding: 16, 
        margin: 20,
     
      },
      button: {
        padding: 10,
        borderWidth:0,
        margin: 12, 
        width: 300,
        height: 45,
        backgroundColor: '#008877',
        borderRadius: 8,


      },
      buttonText: {
        textAlign: 'center',
        color: 'white',
        //fontFamily: 'calibri',
        fontSize: 18,
        fontWeight:'600',
        
      },
      
      
})