
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity, Pressable, TextInput } from 'react-native';
import { firestore } from '../../../firebase'; // Your Firebase config file
import { collection, getDocs } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const ExercisesScreen = ({onAddExercise}) => {
 

    const [exercises, setExercises] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const nav = useNavigation();

    const filteredExercises = exercises.filter(exercise =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const handleAddExercise = (exercise) => {
        onAddExercise(exercise);
      };
    
    useEffect(() => {
        const fetchExercises = async () => {
        const exercisesCollection = collection(firestore, 'exercises');
        const exercisesSnapshot = await getDocs(exercisesCollection);
        const exercisesList = exercisesSnapshot.docs.map(doc => doc.data());
        setExercises(exercisesList);
        };
    
        fetchExercises();
    }, []);
    
    const renderItem = ({ item }) => (
        <View 
        style={styles.listItem} >
            <Text style={styles.itemText}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleAddExercise(item)} >
            <AntDesign name="pluscircle" style={styles.addButton} />
            </TouchableOpacity>
        </View>
    );
    
    return (
        <View style={styles.container}>
            <View style={styles.modalHandle} />
            <View style={styles.searchContainer}>
            <FontAwesome5 name="search" size={24} color="#ccc" padding={5}/>
            <TextInput
                placeholder="Search exercises..."
                placeholderTextColor={'#4B6059'}
                
                onChangeText={text => setSearchQuery(text)}
                value={searchQuery}
                style={styles.searchInput}
                
            />
            </View>
        <FlatList
            data={filteredExercises}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={styles.listBox}
            
        />
        {/* <TouchableOpacity style={styles.closeButton} onPress={()=> nav.goBack()} >
            <Text style={styles.closeButtonText}> Go back </Text>
        </TouchableOpacity> */}
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0, // This can be adjusted based on status bar height
    backgroundColor:'#17352b',
  },
  modalHandle: {
    width: 40, 
    height: 6, 
    borderRadius: 3, 
    backgroundColor: '#ccc',
    alignSelf: 'center', // Center the notch horizontally
    marginTop: 8, 
    marginBottom: 8, 
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#17352b', 
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchInput: {
    backgroundColor: '#ccc',
    borderColor: '#313131',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    fontSize: 18,
    height: 40,
    width: '90%',
    color: '#17352b',
  },

  closeButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginBottom: 0,
    height: 80
  },
  closeButtonText: {
    fontWeight: "bold",
  },
  listBox:{
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    
  },
  listItem: {
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#cccccc",
    width: '100%',
    flexDirection: 'row',
    gap: 10, 
    justifyContent: 'space-between',
    
   
  },
  itemText: {
    fontSize: 18,
    color: '#ccc',
  },
  addButton: {
    fontSize: 24,
    color: '#a0eec0',
    borderRadius: 14.857142448425293,
    
    //boxShadow: '0px 4px 4px rgba(0,0,0,0.25)',
  },
});

export default ExercisesScreen;
