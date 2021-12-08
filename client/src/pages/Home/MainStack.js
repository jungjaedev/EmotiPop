import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ChartContainer from '../chart/ChartContainer';
import MainHome from '../Home/MainHome';
import MyPage from '../User/MyPage'
import Nav from './Nav'
import ChartTest from '../chart/ChartTest'


export default function MainStack() {
  const Stack = createStackNavigator(); 

  return (
    <Stack.Navigator
      screenOptions={{
      //   headerStyle: { backgroundColor: '#f4511e' },
      //   headerTintColor: 'black',
      //   headerTitleStyle: {
      //       fontWeight: 'bold',
      //   },
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name='MainHome' 
        component={MainHome}
        // options={{
        //   headerShown: false,
        // }}
      />
      <Stack.Screen 
        name='ChartContainer' 
        component={ChartContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name='MyPage'
        component={MyPage}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name='Nav' 
        component={Nav}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name='ChartTest' 
        component={ChartTest}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}