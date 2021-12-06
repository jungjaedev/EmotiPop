import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import EmotiHome from './EmotiHome'
import SignIn from '../User/SignIn';
import SignUp from '../User/SignUp';
import ChooseRoom from '../Beans/ChooseRoom'
import ListOfMyPositiveBeans from '../Beans/ListOfMyPositiveBeans'
import ChartContainer from '../chart/ChartContainer'

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
      options={{ headersShown: false }}
    >
      <Stack.Screen 
        name='EmotiHome' 
        component={EmotiHome}
        // options={{
        //   headerShown: false,
        // }}
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
      <Stack.Screen 
        name='ChooseRoom' 
        component={ChooseRoom}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name='ListOfMyPositiveBeans' 
        component={ListOfMyPositiveBeans}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name='ChartContainer' 
        component={ChartContainer}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}