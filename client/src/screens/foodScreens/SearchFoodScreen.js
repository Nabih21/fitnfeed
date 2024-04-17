
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity, Pressable, TextInput, ActivityIndicator } from 'react-native';
import { firestore } from '../../../../firebase'; // Your Firebase config file
import { collection, getDocs } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Header from '../../components/Header';


const SearchFoodScreen = ({onAddFoodItem, currentMeal}) => {

 

    const [food, setFood] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const nav = useNavigation();

    const filteredFood = food.filter(food =>
        food.Food.toLowerCase().includes(searchQuery.toLowerCase())

      );

      const handleAddFoodItem = (selectedFood) => {
        if (!currentMeal) {
            console.error('No current meal is set');
            return;
          }
        onAddFoodItem(currentMeal, selectedFood);
      };
    
    useEffect(() => {
      
        const fetchFood = async () => {
           
        const foodCollection = collection(firestore, 'Food');
        const foodSnap = await getDocs(foodCollection);
        const foodList = foodSnap.docs.map(doc => doc.data());
        setFood(foodList);
      
        };
    //setIsLoading(false);
    fetchFood();
    }, []);
    
    const renderItem = ({ item }) => (
        <View 
        style={styles.card} >
            <Text style={styles.cardTitle}>{item.Food}</Text>
            <View style={styles.setRow}> 
                <View> 
                <Text style={styles.setText} > 
                {item.Grams}g   -  {item.Calories} cal
                </Text>
                <Text style={styles.setSubText} > 
                Protein: {item.Protein!= 't' ? item.Protein : '0'  }g - Carbs: {item.Carbs!= 't' ? item.Carbs : '0' }g - Fat: { item.Fat!= 't' ? item.Fat : '0' }g

                    </Text>
                    </View>
                    <TouchableOpacity onPress={() => handleAddFoodItem(item)} >
                    <AntDesign name="pluscircle" style={styles.addButton} />
                    </TouchableOpacity>
                </View>
           
        </View>
    );
    
    return (
        <>
      {/* <Header title="Search Food" /> */}
        <SafeAreaView style={styles.container}>
            <View style={styles.modalHandle} />
            <View style={styles.searchContainer}>
            <FontAwesome5 name="search" size={24} color="#ccc" padding={5}/>
            <TextInput
                placeholder="Search for food..."
                placeholderTextColor={'#4B6059'}
                onChangeText={text => setSearchQuery(text)}
                value={searchQuery}
                style={styles.searchInput}
                
            />
            
            </View>

       
        
       <FlatList
            data={filteredFood}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={styles.listBox}
            
        />
        {/* <TouchableOpacity style={styles.closeButton} onPress={()=> nav.goBack()} >
            <Text style={styles.closeButtonText}> Go back </Text>
        </TouchableOpacity> */}
        </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  card: {
        
    width: 337,
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
    backgroundColor: '#17352b', // Slightly darker than card background
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
    fontWeight: '600' 
  },
  setSubText: {
    color: '#ccc',
    fontSize: 14,
  
  },
  addButton: {
    fontSize: 24,
    color: '#a0eec0',
    borderRadius: 14.857142448425293,
    
    //boxShadow: '0px 4px 4px rgba(0,0,0,0.25)',
  },
});

export default SearchFoodScreen;
