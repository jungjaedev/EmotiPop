import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
// import EmotiHome from './EmotiHome';
import TutorialHome from './TutorialHome';
import SignIn from './SignIn';
import SignUp from './SignUp';
import TutorialPage5 from './TutorialPage5';

export default function TutorialStack() {
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
        name="TutorialHome"
        component={TutorialHome}
        // options={{
        //   headerShown: false,
        // }}
      />
      <Stack.Screen
        name="TutorialPage5"
        component={TutorialPage5}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
