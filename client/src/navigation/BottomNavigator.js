// BottomTabNavigator.js
import React, {useEffect, useState} from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity, Pressable, TextInput, Dimensions } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import { useNavigation } from '@react-navigation/native';
import WorkoutScreen from '../screens/WorkoutScreen';
import { Entypo, FontAwesome6, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import MacrosScreen from '../screens/foodScreens/MacrosScreen';

const Tab = createMaterialBottomTabNavigator();


function CustomTab({  setModalVisible }){
  const nav = useNavigation();
  useEffect(() => {
    const unsubscribe = nav.addListener('tabPress', (e) => {
      // Prevent default behavior
      e.preventDefault();
      setModalVisible(true);
    // alert('Default behavior prevented');
      

      // Do something manually
      // ...
    });
     

    return unsubscribe;
    
  }, [nav, setModalVisible]);

 return null;
  
}

const windowWidth = Dimensions.get('window').width;
const tabBarHeight = 60; // Adjust based on your tab bar's height
const tabCount = 4; // Total number of tabs
const tabWidth = windowWidth / tabCount;

const BottomTabNavigator = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState(0);

  const togglePopover = (index) => {
    setPopoverPosition(tabWidth * index + tabWidth / 2); // Position it over the middle of the tab
    setPopoverVisible(!popoverVisible);
  };

  return (
    <>
    <Tab.Navigator
        initialRouteName="Home"
        activeColor="#a0eec0"
        inactiveColor="black"
        shifting={true}
        sceneAnimationEnabled={false}
        barStyle={styles.tabBar}
        activeIndicatorStyle={{backgroundColor: '#a0eec0'}}
  >

      <Tab.Screen name="Workout" children={() => <CustomTab setModalVisible={setPopoverVisible} />} options={{ headerShown: false ,
        tabBarIcon: (color) => (<FontAwesome6 name="dumbbell" size={24} color="#17352b" />)    }}  />

      <Tab.Screen name="Macros" component={MacrosScreen} options={{ headerShown: false ,
        tabBarIcon: (color) => (<MaterialCommunityIcons name="food-apple" size={24} color="#17352b" />)    }}  />

      <Tab.Screen name="Home" component={HomeScreen}  options={{ headerShown: false ,
          tabBarIcon: (focused, color) => (
              <Entypo name="home" size={24} color='#17352b' />)
              ,}}  />

      <Tab.Screen name="Profile" component={MacrosScreen} options={{ headerShown: false ,
        tabBarIcon: (color) => (<Ionicons name="person" size={24} color="#17352b" />)    }}  />
        
      
    </Tab.Navigator>
    {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => { setModalVisible(false) }}
    
        >
          <View  style={[styles.popoverView, { left: popoverPosition + 10, bottom: tabBarHeight +20 }]}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>

      
      </Modal> */}
          {popoverVisible && (
        <View style={styles.overlay} onPress={() => setPopoverVisible(false)}> 
          <View style={[styles.popoverView, { left: popoverPosition + 10, bottom: tabBarHeight +15  }]}>
            <View style={styles.modalView}>
              <Text>Hello World!</Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => setPopoverVisible(false)}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
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

    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },

    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
      justifyContent: 'center',
      alignItems: 'center',
    },
    popoverView: {
      position: 'absolute',
      // width: 100, // Width of the popover
      // height: 100, // Height of the popover
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 10,
      elevation: 5,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 15,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    
   
})