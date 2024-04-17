import { Pressable, StyleSheet, Text, View, StatusBar, ScrollView, FlatList, TextInput, TouchableOpacity, Modal, Alert,Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import logo from '../../../assets/images/logo_1.png';



const Body = () => {

  return (
    <>
          <ScrollView
          contentContainerStyle={styles.layout} style={styles.scrollView}
          >
            <View> 
                
            </View>

           
        <Text>HomeScreen</Text>

        <View> 
                    <Pressable
                        onPress={() => nav.navigate("Login")}
                        >
                        <Text> go back to login </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => nav.navigate("Workout")}
                        >
                        <Text> Start a Workout </Text>
                    </Pressable>
        </View>
    </ScrollView>
    </> 

  );
};


const HomeScreen = () => {

    const nav = useNavigation();
  return (
    <>    
    <Header title="Fit&Feed" />
      <Body />
    </>
    
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#17352b', // This will change the color behind the scrollable content
  },
layout: {
    flexGrow: 1,
    backgroundColor: '#17352b',
    alignItems: 'center', // Add this to center vertically
    paddingVertical: 20,
    //justifyContent: 'center',
  },
})