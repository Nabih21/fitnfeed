import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';

const HomeScreen = () => {

    const nav = useNavigation();
  return (
    <>    
    <Header />
    <SafeAreaView style={styles.layout}>
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
    </SafeAreaView>
    </>
    
  );
}

export default HomeScreen

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 70,
      },
})