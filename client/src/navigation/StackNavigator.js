import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import { BottomNavigation } from 'react-native-paper';
import BottomNavigator from './BottomNavigator';
import ExercisesScreen from '../screens/ExercisesScreen';

const StackNavigator = () => {

    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                
                <Stack.Screen 
                name='Welcome'
                component={WelcomeScreen}
                options={{ headerShown: false }}
                />

                <Stack.Screen 
                name="Login" 
                component={LoginScreen} 
                //options={{ headerShown: false }} 
                />

                <Stack.Screen name="Register" 
                component={RegisterScreen} 
                //options={{ headerShown: false }}
                />

                <Stack.Screen name="MainApp" 
                component={BottomNavigator} 
                options={{ headerShown: false }} /> 

                <Stack.Screen name='ExercisesModal'
                component={ExercisesScreen}
                options={{ 
                    presentation: 'modal',
                    headerShown: false}} />

              


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})