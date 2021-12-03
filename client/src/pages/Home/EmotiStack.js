import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EmotiHome from './EmotiHome'
import SignIn from '../User/SignIn';
import SignUp from '../User/SignUp';

export default function EmotiStack() {
  const Stack = createStackNavigator(); 

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#f4511e' },
        headerTintColor: 'black',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name='EmotiHOME' 
        component={EmotiHome}
      />
      <Stack.Screen 
        name='SignIn' 
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name='SignUp' 
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}