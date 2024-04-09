// BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import WorkoutScreen from '../screens/WorkoutScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}  />
      <Tab.Screen name="Workout" component={WorkoutScreen}  options={{ headerShown: false }}  />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
