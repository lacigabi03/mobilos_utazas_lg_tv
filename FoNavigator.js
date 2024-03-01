import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import MasodikHomeScreen from './MasodikHomeScreen';



const Stack = createStackNavigator();

const FoNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
            name="Root"
            component={HomeScreen}
            options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MasodikHomeScreen"
          component={MasodikHomeScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default FoNavigator;