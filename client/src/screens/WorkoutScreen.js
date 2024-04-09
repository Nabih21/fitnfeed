import { Pressable, StyleSheet, Text, View, StatusBar, ScrollView, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native'
import React, {useState} from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from './HomeScreen';
import Header from '../components/Header';
import { MaterialIcons } from '@expo/vector-icons';
import ExercisesScreen from './ExercisesScreen';
//import { FlatList } from 'react-native-gesture-handler';




const Body = () => {
    const navigation = useNavigation();

    const [selectedExercises, setSelectedExercises] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const addExercise = (newExercise) => {
      setSelectedExercises(currentExercises => [...currentExercises, newExercise]);
      setIsModalVisible(false); 
    };

    const removeExercise = (index) => {
      setSelectedExercises(currentExercises => currentExercises.filter((_, i) => i !== index));
    };
     
    const addSet = (exerciseIndex) => {
      setSelectedExercises(currentExercises => currentExercises.map((exercise, index) => {
        if (index === exerciseIndex) {
          const newSetId = String(exercise.sets.length + 1);
          const newSet = { id: newSetId, weight: '', reps: '' };
          return { ...exercise, sets: [...exercise.sets, newSet] };
        }
        return exercise;
      }));
    };
    
    const renderExerciseCard = ({ item: exercise, index }) => {
      // A function to render each set item
      const renderSetItem = ({ item: set, index: setIndex }) => (
        <View style={styles.setRow} key={set.id}>
          <Text style={styles.setText}>{setIndex + 1}</Text>
          <TextInput 
            style={styles.setInput} 
            keyboardType="numeric" 
            onChangeText={(text) => handleSetChange(text, index, setIndex, 'weight')} 
            value={set.weight} 
          />
          <Text style={styles.setText}>lbs</Text>
          <TextInput 
            style={styles.setInput} 
            keyboardType="numeric" 
            onChangeText={(text) => handleSetChange(text, index, setIndex, 'reps')} 
            value={set.reps} 
          />
          <Text style={styles.setText}>reps</Text>
          <TouchableOpacity onPress={() => removeSet(index, setIndex)}>
            <MaterialIcons name="delete" size={26} color="red" />
          </TouchableOpacity>
        </View>
      );
    
      // Function to handle changes in the set inputs
      const handleSetChange = (text, exerciseIndex, setIndex, field) => {
        const updatedExercises = [...selectedExercises];
        const updatedSet = { ...updatedExercises[exerciseIndex].sets[setIndex], [field]: text };
        updatedExercises[exerciseIndex].sets[setIndex] = updatedSet;
        setSelectedExercises(updatedExercises);
      };
    
      // Function to remove a set
      const removeSet = (exerciseIndex, setIndex) => {
        const updatedExercises = [...selectedExercises];
        updatedExercises[exerciseIndex].sets.splice(setIndex, 1);
        setSelectedExercises(updatedExercises);
      };
    
      return (
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}> 
            <Text style={styles.cardTitle}>{exercise.name}</Text>
            <TouchableOpacity onPress={() => removeExercise(index)}>
              <MaterialIcons name="close" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={exercise.sets}
            renderItem={renderSetItem}
            keyExtractor={(set, setIndex) => setIndex.toString()}
          />
          <TouchableOpacity style={styles.button} onPress={() => addSet(index)}>
            <Text style={styles.buttonText}>Add Set</Text>
          </TouchableOpacity>
        </View>
      );
    };
    
 
    
    

    return (
        <> 
        
       
        <ScrollView contentContainerStyle={styles.layout} style={styles.scrollView}
        >
            <Text style={styles.textTitle}>Workout Screen</Text>

            <FlatList 
              data={selectedExercises}
              renderItem={renderExerciseCard}
              keyExtractor={(item, index) => String(index)}
            />
            <Pressable

              onPress={() => setIsModalVisible(true)}>
              <Text style={styles.textTitle}> Add exercise </Text>

            </Pressable>

            <Modal
            animationType='slide'
            presentationStyle='pageSheet'
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
            > 
              <ExercisesScreen onAddExercise={addExercise} />
            </Modal>

         </ScrollView>


        </>
    );
};
const WorkoutScreen = () => {
  return (
    <>
    <Header />
    <Body />
    </>
  )
}

export default WorkoutScreen

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
      card: {
        
        width: 327,
        height: 132,
        backgroundColor: '#2c2f34',
        borderRadius: 24,
        padding: 16,
        margin: 8, 
        
      },
      cardTitle: {
        color: '#ffffff',
        fontSize: 18,
        //fontFamily: 'Source Sans Pro',
        fontWeight: 600,
        lineHeight: 21,
      },
      setRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#414141', // Slightly lighter than card background
        borderRadius: 10,
        padding: 8,
        marginVertical: 4,
      },
      setInput: {
        backgroundColor: '#515151', // Even lighter for the input
        borderRadius: 8,
        color: '#ffffff',
        marginRight: 4,
        paddingHorizontal: 8,
        width: 50, // Adjust as needed
      },
      setText: {
        color: '#ffffff',
        fontSize: 16,
      },
      button: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 6,
        width: 100,

        // Style your button
      },
      buttonText: {
        // Style your button text
      },
})