import { Pressable, StyleSheet, Text, View, StatusBar, ScrollView, FlatList, TextInput, TouchableOpacity, Modal, Alert,Image, ImageBackground } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import logo from '../../../assets/images/logo_1.png';
import { MacroProgressBars, OverallCaloriesChart } from '../components/Charts';
import { MacroProgressBarsHome, OverallCaloriesChartHome } from '../components/HomeCharts';
import gym from '../../../assets/images/gym.jpeg';
import { FontAwesome } from '@expo/vector-icons';


const Body = () => {
  const nav = useNavigation();

  const dates = [ "M","T", "W", "T", "F", "S", "S"]; 
  const dateNumbers = [ 16, 17, 18, 19, 20, 21, 22]; 

  const [macrosData, setMacrosData] = useState({
    Carbs: { current: 146, goal: 376 },
    Protein: { current: 144, goal: 150 },
    Fat: { current: 62, goal: 100 },
  });
  const [caloriesData, setCaloriesData] = useState({
    consumed: 1717,
    goal: 3004,
  });
  return (
    <>
          <ScrollView
          contentContainerStyle={styles.layout} style={styles.scrollView}
          >
           <View style={styles.card}>
            <Text style={styles.cardTitle} >Week days </Text>
           <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                style={styles.horizontalScroll}
            >
              <View style={styles.setRow}>
               
                {dates.map((day, index) => (
          <TouchableOpacity key={index} style={[styles.dates,
            index === 3 ? styles.specialDate : null
          ]}>
            <Text style={[styles.itemText,
            index === 3 ? styles.specialText : null]}>{day}</Text>
            <Text style={[styles.itemText,
            index === 3 ? styles.specialText : null]}>{dateNumbers[index]}</Text>
          </TouchableOpacity>
        ))}
                
              </View>
            </ScrollView>
             </View>

             <TouchableOpacity style={[styles.card, styles.bigCard]}> 
             
                <ImageBackground
                 source={gym} 
                 style={styles.imageContainer} 
                 resizeMode='cover'

                >
                  <View style={styles.imageOverlay} />
                  <View style={styles.imageText} >
                <Text  style={styles.cardTitle}>Start your routine </Text>
                <FontAwesome name="play" size={24} color="white" />
                
                </View>
                
                </ImageBackground>
                
             </TouchableOpacity>

             <View style={styles.card} > 
                <TouchableOpacity style={[styles.setRow, styles.macros]}> 
                  <MacroProgressBarsHome  macros={macrosData}/> 
                  <OverallCaloriesChartHome consumed={caloriesData.consumed} goal={caloriesData.goal} />

                </TouchableOpacity>

             </View>


           
  

        {/* <View> 
                    <Pressable
                        onPress={() => nav.navigate("Welcome")}
                        >
                        <Text> go back to login </Text>
                    </Pressable>
                   
        </View> */}
    </ScrollView>
    </> 

  );
};


const HomeScreen = () => {

  
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

  card: {
        
    width: 327,
    
    backgroundColor: '#17352b',
    borderRadius: 24,
    padding: 8,
    margin: 8, 
   
  },
  bigCard: {
    backgroundColor: '#008877',
    height:250,
     shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    padding: 0,
    margin: 8, 
    
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 24,
    //fontFamily: 'Source Sans Pro',
    fontWeight: 'bold',
    lineHeight: 26,
    marginLeft: 8,
    marginBottom: 5,
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    //backgroundColor: '#17352b', // Slightly lighter than card background
    borderRadius: 10,
    padding: 8,
    gap: 15 ,
    marginVertical: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  macros: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    margin: 0,
    width: 300,
    gap: 35
  },
  dates: {

    width: 41,
    height: 64,
    backgroundColor: '#008877',
    borderRadius: 24,
    alignItems:'center',
    padding: 10
  },
  itemText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600'

  },
  specialDate: {
    backgroundColor: '#a0eec0'
  },
  specialText: {
    color: '#17352b',
  },
  headerImage: {
    width: '100%', 
    height: '100%',
    // maxWidth: 400, 
    //maxHeight: 200,
  },
  imageContainer: {
    borderRadius: 24,
    overflow: 'hidden', 
    padding: 0,
    width: '100%', 
    height: '100%',
    justifyContent: 'flex-end'
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
  },
  imageText: {
   
    margin: 20,
    padding: 20,
    paddingTop: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',


  },
})