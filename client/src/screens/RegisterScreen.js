import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../../firebase';
import { registerUser } from '../../../server/src/auth';
import parseFirebaseError from '../components/parseFirebaseError';
import logo_1 from '../../../assets/images/logo_1.png';

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    


    const handleRegister = async () => {
        setIsLoading(true);
        try {
            await registerUser(email, password);
            setIsLoading(false);
            //console.log("Registration successful!");
            Alert.alert("Registration successful!");
            navigation.navigate('Login');
          } catch (error) {
            setIsLoading(false);
            Alert.alert(parseFirebaseError(error));
          }
        // const user = {
        //     email: email,
        //     password: password,
        // };
            
        // // for debugging console.log('register user:', user );
        // //send a post request to backend
        // axios.post("http://localhost:3001/auth/register", user).then((res) => {
            
        //     setIsLoading(false);
        //     Alert.alert('registration successctful', 'bravo');
        //     setEmail('');
        //     setPassword('');
            

        // }).catch((err) => {
        //     setIsLoading(false);
        //     if  (err.response) {
        //         Alert.alert('Registration failed', err.response.data.message);
        //     }
        //     else {
        //         console.log('Error message:', err.message);
        //         //console.log('Error stack:', err.stack);
        //         Alert.alert("registrtion failed", 'error occurred');
        //     }
        // });
    };

    return (
        <SafeAreaView style={styles.layout}>
            <ScrollView>
            <View style={styles.containerImage} >
                <Image 
                source={logo_1}
                style={styles.image}
                />
            </View>


            <View style={{ marginTop: 0 }}>
                <Text style={styles.title}>Register here </Text>
            </View>
            <KeyboardAvoidingView>
                <View>
                    <View style={styles.textInputView}>
                        <MaterialIcons name="email" size={24} color="#4B6059" style={{ marginLeft: 8 }} />
                        <TextInput
                            placeholder='Enter your email'
                            placeholderTextColor={'#4B6059'}
                            style={styles.textInput}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                </View>
                <View>
                    <View style={styles.textInputView}>
                        <AntDesign name="lock1" size={24} color="#4B6059" style={{ marginLeft: 8 }} />
                        <TextInput
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholder='Enter your Password'
                            placeholderTextColor={'#4B6059'}
                            style={styles.textInput} 
                            />
                    </View>
                </View>


                
            </KeyboardAvoidingView>
            <View style={ styles.buttonContainer }>
                    { isLoading ? 
                    <ActivityIndicator  size="large" color="white"/> 
            
                    :
                    <TouchableOpacity
                        onPress={handleRegister}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText} > Register </Text>
                    </TouchableOpacity>}
                </View>
                <View style={{ marginTop: 50 }}>

                    <Text style={styles.regularText}> Already have an account? </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={styles.hyperLinkText}> Sign in to your account </Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
        </SafeAreaView>
    )
}

export default RegisterScreen;

const styles = StyleSheet.create({

    layout: {
        flex: 1,
        backgroundColor: '#17352b',
        alignItems: 'center',
    },
    title: {
        margin: 24,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    textInputView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 20,
        paddingVertical: 5,
        backgroundColor: '#D0D0D0',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,

    },
    textInput: {
        color: 'black',
        marginVertical: 10,
        width: 300,
        fontSize: 16,

    },

    //buttons style
    buttonContainer : {
        padding: 10, 
        margin: 8,
     
      },
    button: {
        padding: 10,
        borderWidth:0,
        margin: 12, 
        width: 300,
        height: 45,
        backgroundColor: '#008877',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,


      },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        //fontFamily: 'calibri',
        fontSize: 18,
        fontWeight:'600',
        
      },
    regularText: {
        fontSize: 18,
        color: 'white',
        fontWeight: '500',
        textAlign: 'center',
    },

    hyperLinkText: {
        fontSize: 18,
        color: '#008877',
        fontWeight: '500',
        textDecorationLine: 'underline',
        textAlign: 'center',

    },
    image: {
        width: 300,
        height: 240,
        borderWidth: 0,
        borderRadius: 12,
        //borderColor: '#E7E3EB',
        
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
        margin: 0,
      },
});