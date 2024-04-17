import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';

const MacroProgressBars = ({ macros }) => {
  // calculate the width based on the ratio of current to goal
  const getProgressBarWidth = (current, goal) => (current / goal) * 100 + '%';
  const macroColors = {
    Carbs: '#c274ff',
    Protein: '#ff748d',
    Fat: '#fbe738',
  };

  return (
    <View style={styles.progressBarContainer}>
      {Object.entries(macros).map(([key, { current, goal }]) => (
        <View key={key} style={styles.progressSubBarContainer}>
          <Text style={styles.macroLabel}>{key}</Text>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: getProgressBarWidth(current, goal), backgroundColor: macroColors[key] }]} />
          </View>
          <Text style={styles.macroValues}>{`${current}/${goal}g`}</Text>

          
        </View>
      ))}
    </View>
  );
};

const OverallCaloriesChart = ({ consumed, goal }) => {
  // Calculate the fill percentage
  const fillPercentage = (consumed / goal) * 100;
  const calLeft = goal - consumed;

  return (
    <CircularProgress
      size={150}
      width={10}
      fill={fillPercentage}
      tintColor="#FD783D"
      backgroundColor="gray">
      {() => (<>
        <Text style={styles.calories}>
          {calLeft}
        </Text>
        <Text style={styles.caloriesText} > calories left </Text>
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
    margin: 10,
    width: 327,
  },
  progessBarSubContainer: {
    //padding: 10,
    //margin: 5,
    alignItems: 'center',
  },
  macroLabel: {
    fontSize: 16,
    color: '#fff',
    //alignContent: 'center',
    alignSelf: 'center',
    // Other styles...
  },
  progressBarBackground: {
    height: 10,
    //flex: 1,
    backgroundColor: 'gray',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    width: 75,
    // Other styles...
  },
  progressBarFill: {
    height: 10,
    backgroundColor: '#FF8E72', // use your macro color
    borderRadius: 10,
  },
  macroValues: {
    fontSize: 16,
    color: '#fff',
    alignSelf: 'center',
    //alignItems: 'center',
    //alignContent : 'center',
    // ther styles...
  },
  calories: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    // tyling for the text inside the circular progress...
  },
  caloriesText: {
    fontSize: 16, 
    color: '#ffff'
  },
  // ... dd other styles like for macroValues, etc.
});

export { MacroProgressBars, OverallCaloriesChart };