import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './client/src/navigation/StackNavigator';
import AuthProvider from './server/src/AuthProvider';

export default function App() {
  return (
   <AuthProvider>
    <StackNavigator/>
   </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
