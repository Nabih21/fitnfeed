// BottomTabNavigator.js
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import { StyleSheet } from 'react-native';
import { Entypo, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import MacrosScreen from '../screens/MacrosScreen';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
        initialRouteName="Home"
        activeColor="white"
        inactiveColor="black"
        barStyle={styles.tabBar}
  >
      <Tab.Screen name="Home" component={HomeScreen}  options={{ headerShown: false ,
    tabBarIcon: (color) => (<Entypo name="home" size={24} color="black" />)
    
    }}  />
      <Tab.Screen name="Workout" component={WorkoutScreen}  options={{ headerShown: false ,
        tabBarIcon: (color) => (<FontAwesome6 name="dumbbell" size={24} color="black" />)    }}  />

      <Tab.Screen name="Macros" component={MacrosScreen} options={{ headerShown: false ,
        tabBarIcon: (color) => (<MaterialCommunityIcons name="food-apple" size={24} color="black" />)    }}  />
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
        shadowOpacity: 0.2,
        shadowRadius: 4,
        // Android
        elevation: 5,
    }
})