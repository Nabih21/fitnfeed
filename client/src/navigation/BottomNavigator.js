// BottomTabNavigator.js
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity, Pressable, TextInput } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import { Entypo, FontAwesome6, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import MacrosScreen from '../screens/foodScreens/MacrosScreen';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
        initialRouteName="Home"
        activeColor="#a0eec0"
        inactiveColor="black"
        shifting={true}
        sceneAnimationEnabled={false}
        barStyle={styles.tabBar}
        activeIndicatorStyle={{backgroundColor: '#a0eec0'}}
  >
      <Tab.Screen name="Home" component={HomeScreen}  options={{ headerShown: false ,
    tabBarIcon: (focused, color) => (
    
      <Entypo name="home" size={24} color='#17352b' />
    ),
   
    
    }}  />
      <Tab.Screen name="Workout" component={WorkoutScreen}  options={{ headerShown: false ,
        tabBarIcon: (color) => (<FontAwesome6 name="dumbbell" size={24} color="#17352b" />)    }}  />

      <Tab.Screen name="Macros" component={MacrosScreen} options={{ headerShown: false ,
        tabBarIcon: (color) => (<MaterialCommunityIcons name="food-apple" size={24} color="#17352b" />)    }}  />

      <Tab.Screen name="Profile" component={MacrosScreen} options={{ headerShown: false ,
        tabBarIcon: (color) => (<Ionicons name="person" size={24} color="#17352b" />)    }}  />
        
        
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#008877',
        // iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        // Android
        elevation: 5,
    },
   
})