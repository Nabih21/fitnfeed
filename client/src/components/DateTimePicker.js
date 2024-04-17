import React, { useState } from 'react';
import { View, Text, Button, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';

const DatePickerComponent = ({date, onDateChange, onAdjustDate }) => {
//const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false); // Missing state for show
  const [mode, setMode] = useState('date'); // Missing state for mode

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    onDateChange(currentDate);
     // Adjust visibility based on platform and user action
    //setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };


  return (
    <View style={styles.dateContainer}>

      <TouchableOpacity onPress={() => onAdjustDate(-1)}>
        <FontAwesome name="chevron-left" size={24} color="#008877"/>
      </TouchableOpacity>

        <View style={styles.datePickerContainer} >
      {Platform.OS === 'android' && (
        <Button onPress={() => showMode('date')} title="Choose Date" />
      )}
      {/* Display the selected date */}
      {/* <Text>{date.toDateString()}</Text> */}

      {Platform.OS === 'ios' && (<DateTimePicker
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
          style={styles.picker}
          themeVariant="dark"
        />
      )}
      </View>

      <TouchableOpacity onPress={() => onAdjustDate(1)}> 
        <FontAwesome name="chevron-right" size={24} color="#008877" />
      </TouchableOpacity>
      
    </View>
  );
};

export default DatePickerComponent;

const styles = StyleSheet.create({
     dateContainer: {
        flexDirection: 'row',
         alignItems: 'center', 
         justifyContent: 'space-between',
         //alignSelf: 'center',
         width: 300, 
         backgroundColor: '#17352b',
         marginBottom: 10,
    },

    datePickerContainer: {
        flex: 'row' , 
       // alignSelf: 'center',
      // backgroundColor: '#ccc',
       margin: 0,
       paddingRight: 10,
    },
    picker: {
     color: 'white',
     size: 0,
    },

});