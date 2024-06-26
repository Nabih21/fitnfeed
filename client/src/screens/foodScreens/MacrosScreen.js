import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, StatusBar, ScrollView, FlatList, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import SearchFoodScreen from './SearchFoodScreen';
import { OverallCaloriesChart, MacroProgressBars } from '../../components/Charts';
import DatePickerComponent from '../../components/DateTimePicker';
import { MaterialIcons } from '@expo/vector-icons';




const Body = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    // Additional actions based on the new date
  };
  const adjustDate = (days) => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    });
  };

  const [macrosData, setMacrosData] = useState({
    Carbs: { current: 0, goal: 346 },
    Protein: { current: 0, goal: 200 },
    Fat: { current: 0, goal: 104 },
  });

  const [caloriesData, setCaloriesData] = useState({
    consumed: 0,
    goal: 2658,
  });

  //hookstates for the different meals
  const [currentMeal, setCurrentMeal] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [currentMealFoods, setCurrentMealFoods] = useState([]);




  const [breakfast, setBreakfast] = useState(['Breakfast',[], 0]);
  const [lunch, setLunch] = useState(['Lunch',[], 0]);
  const [dinner, setDinner] = useState(['Dinner',[], 0]);
  const [snacks, setSnacks] = useState(['Snacks', [], 0]);
  const cards = [breakfast, lunch, dinner, snacks];




  const addFoodItemToMeal = (mealName, foodItem) => {
    //convert calories to number
    //console.log('Before conversion:', foodItem.Calories, typeof foodItem.Calories);
    const foodCalories = Number(foodItem.Calories);
   // console.log('After conversion:', foodCalories, typeof foodCalories);
    // depending on the mealName, update the respective state
    switch(mealName) {
      case 'Breakfast':
        setBreakfast([mealName, [...breakfast[1], foodItem], 
          breakfast[2] + (isNaN(foodCalories) ? 0 : foodCalories)
        ]);
        
        break;
      case 'Lunch':
        setLunch([mealName, [...lunch[1], foodItem], 
          lunch[2] + (isNaN(foodCalories) ? 0 : foodCalories)
        ]);
        
        break;
      case 'Dinner':
        setDinner([mealName, [...dinner[1], foodItem], 
          dinner[2] + (isNaN(foodCalories) ? 0 : foodCalories)
        ]);
        
        break;
      case 'Snacks':
        setSnacks([mealName, [...snacks[1], foodItem], 
         snacks[2] + (isNaN(foodCalories) ? 0 : foodCalories)
        ]);
        
        break;
      default:
        console.error('Invalid meal name:', mealName);
    }
    
    setModalVisible(false);
    calculateMacros();
  };

  const calculateMacros = () => {
    const allMeals = [breakfast[1], lunch[1], dinner[1], snacks[1]];

    const totalProtein = allMeals.flat().reduce((acc, food) => acc + (food.Protein === 't' ? 0 : Number(food.Protein)), 0 );
    const totalCarbs = allMeals.flat().reduce((acc, food) => acc + (food.Carbs === 't' ? 0 : Number(food.Carbs)), 0 );
    const totalFat = allMeals.flat().reduce((acc, food) => acc + (food.Fat === 't' ? 0 : Number(food.Fat)), 0 );
    const totalCalories = breakfast[2] + lunch[2] + dinner[2] + snacks[2];
    setMacrosData({
      Carbs: { current: totalCarbs, goal: 346 },
      Protein: { current: totalProtein, goal: 200 },
      Fat: { current: totalFat, goal: 104 },
    });
    setCaloriesData({
      consumed: totalCalories, 
      goal: 2658,
    })
  };


  const [modalVisible, setModalVisible] = useState(false);
  const nav = useNavigation();
  useEffect(() => {
    calculateMacros();
  }, [breakfast, lunch, dinner, snacks]);  
  

  


  const removeFoodItem = (mealName, index) => {
    const updatedMealFoods = [...currentMealFoods];
    updatedMealFoods.splice(index, 1); // Remove the food item at the given index
  
    // Update the respective meal's state based on mealName
    const updatedCalories = updatedMealFoods.reduce((acc, item) => acc + (isNaN(Number(item.Calories)) ? 0 : Number(item.Calories)), 0);
    switch(mealName) {
      case 'Breakfast':
        setBreakfast(['Breakfast', updatedMealFoods, updatedCalories]);
        break;
      case 'Lunch':
        setLunch(['Lunch', updatedMealFoods, updatedCalories]);
        break;
      case 'Dinner':
        setDinner(['Dinner', updatedMealFoods, updatedCalories]);
        break;
      case 'Snacks':
        setSnacks(['Snacks', updatedMealFoods, updatedCalories]);
        break;
    }
    setCurrentMealFoods(updatedMealFoods); // Update the foods displayed in the modal
  };
  
  
  // const renderRemoveItemsModal = () => {
  //   return (
      
  //   );
  // };
  

  const renderCard = () => {

    return (
      <>
    
            {cards.map((card, index) => (
              <TouchableOpacity key={index} style={styles.card} 
                onLongPress={() => {
                  setCurrentMeal(card);
                  setCurrentMealFoods(card[1]);
                  setRemoveModalVisible(true);
                }}
              >
                <Text style={styles.cardTitle}> {card[0]} </Text>
                <View style={styles.setRow}>
                  <View>
                   
                    { card[1].length > 0 ? card[1].map((food,index) => 
                    (   <Text key={index} style={styles.setText}> {food.Food} </Text>))
                    
                    : (<Text style={styles.setText} > No food yet </Text> )}
                  
                  </View>
                  <TouchableOpacity 
                    style={styles.buttonContainer}
                    onPress={() => {
                      setCurrentMeal(card[0]);
                      setModalVisible(true);                    
                    }} 
                  >
                    <AntDesign name="pluscircle" style={styles.addButton} />
                  </TouchableOpacity>
                </View>
                <View style={ [styles.setRow ,{ flexDirection:'column'}]}>
                  <Text style={styles.setCal}> 
                    {card[2]} calories
                  </Text> 
                </View>
              </TouchableOpacity>
            ))}
      


      </>
    );
  }
    return (
        <>
            <ScrollView contentContainerStyle={styles.layout} style={styles.scrollView} >
                
              <DatePickerComponent
                date={selectedDate}
                onDateChange={handleDateChange}
                onAdjustDate={adjustDate}
              />
                {/* <Text style={styles.textTitle} > My Macros </Text> */}

                <View style={styles.circular} >
                <OverallCaloriesChart consumed={caloriesData.consumed} goal={caloriesData.goal} />
                   </View>
                
                <MacroProgressBars macros={macrosData} />

                {renderCard()}

            <Modal
            animationType='slide'
            presentationStyle='pageSheet'
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            > 
              <SearchFoodScreen
                onAddFoodItem={addFoodItemToMeal}
                currentMeal={currentMeal}
              />
            </Modal>
            <Modal
        visible={removeModalVisible}
        onRequestClose={() => setRemoveModalVisible(false)}
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={true}
      >
        <View style={styles.overlay} >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Edit {currentMeal && currentMeal[0]} Items</Text>
          {currentMealFoods.map((food, index) => (
            <View key={index} style={styles.foodItemContainer}>
              <Text style={styles.foodName}>{food.Food}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFoodItem(currentMeal[0], index)}
              >
                <MaterialIcons name="delete" size={26} color="#E08080" />
                {/* <Text style={styles.removeButtonText}>Remove</Text> */}
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setRemoveModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
        </View>
      </Modal>
            

                </ScrollView>
        </>
    );
};

const MacrosScreen =() => {

    return (
        <>
        <Header title='FitnFeed' />
            {/* <Header>
              <DatePickerComponent />
              </Header> */}
            <Body />
        </>
    );
}

export default MacrosScreen;

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
      textTitle: {
        color: 'white',
        fontSize: 24,
        //fontFamily: 'Source Sans Pro',
        fontWeight: 600,
        lineHeight: 28,
        marginTop: 8,
      },
      circular: {
        margin: 10,
      },
      card: {
        
        width: 327,
        
        backgroundColor: '#008877',
        borderRadius: 24,
        padding: 16,
        margin: 8, 
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
      },
      cardTitle: {
        color: '#ffffff',
        fontSize: 18,
        //fontFamily: 'Source Sans Pro',
        fontWeight: 'bold',
        lineHeight: 21,
        
      },
      setRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#17352b', // Slightly lighter than card background
        borderRadius: 10,
        padding: 8,
        marginVertical: 4,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    
      },
      setInput: {
        backgroundColor: '#919090', 
        borderRadius: 8,
        color: '#ffffff',
        marginLeft: 14,
        paddingHorizontal: 8,
        width: 50, // Adjust as needed
      },
      setText: {
        color: '#ffffff',
        fontSize: 16,
        width: 210,
        
      },
      setCal: {
        color: '#ffffff',
        fontSize: 16,
      },
      button: {
        alignItems: 'center',
        backgroundColor: '#a0eec0',
        borderRadius: 8,
        padding: 6,
        width: 100,
        margin: 5,
        marginBottom: 0,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,

      },
      buttonContainer: {
        margin: 8,
      },
      addButton: {
        fontSize: 24,
        color: '#a0eec0',
        borderRadius: 14.857142448425293,
        
      },
      buttonText: {
        color: '#17352b',
        fontWeight: 'bold',
      },
      discardButton: {
        backgroundColor: 'red',
        width: 152.5,
      },
      endButton: {
        backgroundColor: '#a0eec0',
        width: 152.5,
      },
      modalTitle: {

        color: '#ffffff',
        fontSize: 24,
        paddingLeft: 0,
        fontWeight: 'bold',
        margin: 10
      },

      
      modalView: {
        marginTop: '50%', // Adjusts the modal to be vertically centered
        alignSelf: 'center', // Centers the modal horizontally in the view
        backgroundColor: '#008877',
        borderRadius: 20,
        padding: 20,
        width: '80%', // Sets a specific width to make it look like a card
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        transform: [{ translateY: -100 }], // This moves the modal up by half of its own height to center it
      },
      foodItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
        backgroundColor: '#17352b',
        borderRadius: 10,
        padding: 8,
        marginVertical: 4,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
      },
      foodName: {
        fontSize: 16,
        color: 'white'
      },
      removeButton: {
        //backgroundColor: 'red',
        padding: 10,
        borderRadius: 5
      },
      removeButtonText: {
        color: 'white',
        fontSize: 16
      },
      closeButton: {
        marginTop: 20,
        backgroundColor: '#a0eec0',
        padding: 10,
        borderRadius: 8,
        padding: 6,
        width: 100,
        margin: 5,
        marginBottom: 0,
        shadowColor: '#000',
        alignSelf: 'center',
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
      },
      closeButtonText: {
        color: '#17352b',
        fontSize: 16,
        alignSelf: 'center',

      },
      overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent black background
        justifyContent: 'center',
        alignItems: 'center',
      },
      
});