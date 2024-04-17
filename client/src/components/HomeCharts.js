import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';

const MacroProgressBarsHome = ({ macros }) => {
  // Calculate the width based on the ratio of current to goal
  const getProgressBarWidth = (current, goal) => (current / goal) * 100 + '%';

  const macroColors = {
    Carbs: '#c274ff',
    Protein: '#ff748d',
    Fat: '#fbe738',
  };

  return (
    <View>
      {Object.entries(macros).map(([key, { current, goal }]) => (
        <View>
        <View key={key} style={styles.progressBarContainer}>
          <Text style={styles.macroLabel}>{key}</Text>
          <Text style={styles.macroValues}>{`${current}/${goal}`}</Text>
         
        </View>
        <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: getProgressBarWidth(current, goal), backgroundColor: macroColors[key] }]} />
          </View>
         </View>
      ))}
    </View>
  );
};


const OverallCaloriesChartHome = ({ consumed, goal }) => {
  // Calculate the fill percentage
  const fillPercentage = (consumed / goal) * 100;

  return (
    <CircularProgress
      size={120}
      width={15}
      fill={fillPercentage}
      tintColor="#FD783D"
      backgroundColor="#3d5875"
      
      >
      {() => (
        <>
        <Text style={styles.caloriesText}>
          {`${consumed}`}
        </Text>
        <Text style={styles.caloriesText}>
            {`/ ${goal}`}</Text> 
        </>
      )}
    </CircularProgress>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: 150, 
  },
  macroLabel: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600'
    // Other styles...
  },
  progressBarBackground: {
    height: 5,
    //flex: 1,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginHorizontal: 0,
    marginBottom: 12,
    width: 150, 
    // Other styles...
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'blue', // Use your macro color
    borderRadius: 10,
  },
  macroValues: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600'
    // Other styles...
  },
  caloriesText: {
    color: 'white',
    fontSize: 18, 
    fontWeight: '600'
   
    // Styling for the text inside the circular progress...
  },
  // ... Add other styles like for macroValues, etc.
});

export { MacroProgressBarsHome, OverallCaloriesChartHome };