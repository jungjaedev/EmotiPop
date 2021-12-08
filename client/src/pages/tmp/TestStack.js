import React, {useState} from 'react';
import { Text, View, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Btn from '../User/Button'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'; 
// import { Update } from "expo-updates";
import * as Update from "expo-updates";
import ChartContainer from '../chart/ChartContainer';
import axios from 'axios';



function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>한 소녀와 두 종류의 박이 있습니다.</Text>
    </View>
  );
}
function MyPage() {
  const dispatch = useDispatch() 
  // const getToken = async() => {
  //   const token = await AsyncStorage.getItem('AccessToken');
  //   console.log(token)
  // }
  // getToken()
  // const getBeans = async () => {
  //   const res = await axios('http://10.0.2.2:80/')
  // }
  const logOutHandler = async () => {
    // console.log('ads')
    AsyncStorage.clear()
    const res = await AsyncStorage.getAllKeys()
    // location.reload()
    Update.reloadAsync()
    // console.log(res)
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>MyPage!</Text>
      <Btn name='LogOut' onPress={logOutHandler}/>
      {/* <Btn name='Chart' onPress={() => navigation.navigate('ChartContainer')}/> */}
    </View>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#e91e63"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarLabel: 'MyPage',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}