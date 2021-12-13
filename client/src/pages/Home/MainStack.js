import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ChartContainer from '../chart/ChartContainer';
import MainHome from '../Home/MainHome';
import MyPage from '../User/MyPage';
import Nav from './Nav';
import ChartTest from '../chart/ChartTest';
import NegThrow from '../Main/Components/NegThrow';
import PosThrow from '../Main/Components/PosThrow';
import ShowContentModal from '../Main/ShowContentModal';

import NegPop from '../Main/Components/NegPop';
import BothPop from '../Main/Components/BothPop';
import PosPop from '../Main/Components/PosPop';
import CalendarContainer from '../Calendar/CalendarContainer';
import ListOfMyNegativeBeans from '../Beans/ListOfMyNegativeBeans';
import ListOfMyPositiveBeans from '../Beans/ListOfMyPositiveBeans';
import BeansContent from '../Beans/BeansContent';
import ChooseRoom from '../Beans/ChooseRoom';

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
        name="MainHome"
        component={MainHome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChartContainer"
        component={ChartContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyPage"
        component={MyPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Nav"
        component={Nav}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChartTest"
        component={ChartTest}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NegThrow"
        component={NegThrow}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PosThrow"
        component={PosThrow}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ShowContentModal"
        component={ShowContentModal}
        options={{
         headerShown: false,
        }}
      />
      <Stack.Screen
        name="NegPop"
        component={NegPop}
        options={{
          headerShown: false,
          }}
      />
      <Stack.Screen
        name="PosPop"
        component={PosPop}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BothPop"
        component={BothPop}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CalendarContainer"
        component={CalendarContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChooseRoom"
        component={ChooseRoom}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ListOfMyPositiveBeans"
        component={ListOfMyPositiveBeans}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ListOfMyNegativeBeans"
        component={ListOfMyNegativeBeans}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BeansContent"
        component={BeansContent}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}